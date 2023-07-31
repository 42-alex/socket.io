const express = require('express')
const app = express()

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
    res
        .status(200)
        .json(newMessage)
})
 
const server = app.listen(
    3000, 
    () => console.log('server is running on port: ', server.address().port),
)