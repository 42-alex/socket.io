require('dotenv').config()
const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const mongoose = require('mongoose')

app.use(express.static(__dirname))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const Messages = mongoose.model('Messages', {
    name: String,
    message: String,
})

app.get('/messages', async (req, res) => {
    try {
        const messages = await Messages.find({})
        res.status(200).json(messages)
    } catch (err) {
        res.status(500).json({ success: false, message: err })
    }
})

app.post('/messages', async (req, res) => {
    const message = new Messages(req.body)
    try {
        const savedMessage = await message.save()
        io.emit('message', savedMessage)
        res.status(201).json(savedMessage)
    } catch (err) {
        res.status(500).json({ success: false, message: err })
    }
})

io.on('connection', socket => {
    console.log('a user connected ', socket?.client?.conn?.id)
});


const dbUrl = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@mongoose.o02dyue.mongodb.net/?retryWrites=true&w=majority`;
(async function mongooseConnect() {
    try {
        await mongoose.connect(dbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB successfully!')
    } catch (err) {
        console.error('MongoDB connection error: ', err)
    }
})()

const server = http.listen(
  3000,
  () => console.log('server is running on port: ', server.address().port),
)