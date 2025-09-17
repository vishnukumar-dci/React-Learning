const express = require('express')
const cors = require('cors')
const userRoutes = require('./routes/userRoute')
const errorHandler = require('./middleware/errorHandler')

const app = express()
const PORT = 8088

app.use(cors())
app.use(express.json())

app.use('/user',userRoutes)
app.use(errorHandler)

app.listen(PORT,() => {
    console.log(`server is running on ${PORT}`)
})
