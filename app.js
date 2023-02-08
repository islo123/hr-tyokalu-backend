const express = require('express')
const connectDB = require("./db/connection")
const employee = require("./routes/employee")
const authRouter = require('./routes/auth')
const authenticateUser = require('./middleware/authentication')
const user = require("./routes/user")


const app = express()
var cors = require("cors")
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

require('dotenv').config()

app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);

app.use(express.json())
app.use(cors({credentials: true, origin: 'https://employee-information-unique.netlify.app', 'methods': 'GET,PUT,PATCH,POST,DELETE', 'Access-Control-Allow-Headers':'Authorization'})) // Pitä olla security syyistä...frontendin tule error jos ei ole tämä
app.use(helmet())
app.use(xss());

//Routes
app.use('/api/', authRouter)
app.use('/api/', authenticateUser, employee, user )

const port = process.env.PORT || 3001
const start = async function (){
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, function (){
        console.log(`App running port: ${port}`)
        })
    }catch(error){
        console.log(error)
    }
}

start()