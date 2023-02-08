const User = require("../models/User")

const deleteUser = async function (req,res){
    try{
        const {id: userID} = req.params
        const user = await User.findOneAndDelete({_id: userID})
        if(!user){
            return res.status(404).json({msg: `no user with id ${userID}`})
        }
        res.status(200).json({user})
    }catch(error){
        res.status(500).json({msg: error})
    }
}

module.exports = {deleteUser}