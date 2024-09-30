const express = require("express");
const cors = require("cors")

const mainRouter = require("./routes/index")
const JWT_SECRET = require("./utils/config")

const app = express()

app.use(cors())
app.use(express.json())   // for post request, to parse the body

app.use("/api/v1", mainRouter)

app.listen(3000)

