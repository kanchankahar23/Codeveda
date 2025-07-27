require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectDB = require("./src/config/db")
const taskRoutes = require('./src/routes/taskRoutes')

const app = express()
const PORT = process.env.PORT || 5000

connectDB()

app.use(cors())
app.use(express.json())

app.use('/api/tasks', taskRoutes)
app.get('/', (req, res) => {
    res.send("API is running")
})

app.listen(PORT, () => {
    console.log(`Server is listening to port ${PORT}`)
})
