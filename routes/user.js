const express = require("express")
const router = express.Router()
const { deleteUser } = require("../controllers/user")

router.route("/user/:id").delete(deleteUser)


module.exports = router;