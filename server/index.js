const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const UserModel = require('./models/user.model.js')
const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/employee")

app.post('/register', (req, res) => {
    EmployeeModel.create(req.body)
        .then(employee => res.status(201).json(employee)) // Status code 201 for resource creation
        .catch(err => res.status(400).json({ error: err.message })); // Status code 400 for bad request
});

app.post('/login', (req, res) => {
    const {email, password} = req.body
    EmployeeModel.findOne({email: email})
    .then(user => {
        if(user) {
            if(user.password === password) {
                res.json("Success")
            } else {
                res.json("the password is incorrect")
            }
        } else {
            res.json("User not found")
        }
    })
})


app.listen(3001, () => {
    console.log("Server is running")
})