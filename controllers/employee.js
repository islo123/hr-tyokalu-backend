const Employee = require("../models/employee")

const getAllEmployees = async function (req, res){
    const user_id = req.user.userId
    try{
        // Query
        const employees = await Employee.find({user_id}).sort({firstDay: 'desc'})
        res.status(200).json({employees})
    }catch(error){
        res.status(500).json({msg: error})
    }
}

const newEmployee = async  (req, res) => {
    const {name, team, firstDay, lastDay, birth} = req.body;
    try{
        const user_id = req.user.userId
        const employee = await Employee.create({name, team, firstDay, lastDay, user_id, birth})
        res.status(201).json({employee}) // jos status 201 näyttää json 
    }catch(error){
        res.status(500).json({msg: error})
    }
}

const deleteEmployee = async function (req,res){
    try{
        const {id: employeeID} = req.params
        const employee= await Employee.findOneAndDelete({_id: employeeID})
        if(!employee){
            return res.status(404).json({msg: `no Task with id ${employeeID}`})
        }
        res.status(200).json({employee})
    }catch(error){
        res.status(500).json({msg: error})
    }
}

const deleteAllEmployees = async (req, res) => {
    try{
        const user_id = req.user.userId
        const employees = await Employee.deleteMany({user_id})
        res.status(200).json({employees})
    }catch(error){
        res.status(500).json({msg: error})
    }
}


const updateEmployee = async function (req,res){
    try{
        const {id: employeeID} = req.params
        const employee = await Employee.findOneAndUpdate({_id: employeeID}, req.body,{
            new: true,
            runValidators: true
        }) // Find id ja uptdate body. new return new item. runValidators make validatoring work esim. required
        if(!employee){
            return res.status(404).json({msg: `no task with id ${employeeID}`})
        }
        res.status(200).json({employee})
    }catch(error){
        res.status(500).json({msg: error})
    }
}

module.exports = {newEmployee, getAllEmployees, updateEmployee, deleteEmployee, deleteAllEmployees};