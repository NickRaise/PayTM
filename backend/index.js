const express = require("express");
const cors = require("cors")
require("dotenv").config()

const mainRouter = require("./routes/index")

const app = express()

app.use(cors())
app.use(express.json())   // for post request, to parse the body

app.use("/api/v1", mainRouter)
app.get("/", (req, res) => {
    res.send("Working")
})

app.listen(3000)

