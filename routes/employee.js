const express = require("express")
const router = express.Router()
const {newEmployee, getAllEmployees, updateEmployee, deleteEmployee, deleteAllEmployees} = require("../controllers/employee")


router.route("/employee").get(getAllEmployees).post(newEmployee).delete(deleteAllEmployees)// put ja patch ero on että kun patchin kirjoitetan name : "Nimi" se laita kaiken muun niin kuin oli ja put näyttää vain nimen.
router.route("/employee/:id").patch(updateEmployee).delete(deleteEmployee).put(updateEmployee)

module.exports = router;