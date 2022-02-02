const express = require("express")
const cors = require("cors")
const Products = require("./Products")

const app = express()

app.use(express.json())
app.use(cors())

app.get("/" , (req , res) => {
    res.send("Welcome to the Online Commerce Shop...")
})
app.get("/products" , (req , res) => {
    res.send(Products)
})
const port = process.env.port || 5000
app.listen(port , console.log("Server is listening"))