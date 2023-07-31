const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)

app.use(express.static(__dirname))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const messages = [
    { name: 'Tim', message: 'Hi' },
    { name: 'Jane', message: 'Hello' },
]

app.get('/messages', (req, res) => {
    res.send(messages)
})

app.post('/messages', (req, res) => {
    const newMessage = req.body
    messages.push(newMessage)
    io.emit('message', req.body),
    res
        .status(200)
        .json(newMessage)
})

io.on('connection', socket => console.log('a user connected '))
 
const server = http.listen(
    3000, 
    () => console.log('server is running on port: ', server.address().port),
)