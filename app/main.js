const express = require('express')
app = express()

let lastClientId = 0
let clients = []

app.use(express.json())

app.get('/', (req, res) => {
    res.json("Hello from express 2")
})

app.get('/clients', (req, res) => {
    res.json(clients)
})

app.post('/clients', (req, res) => {
    let newName = req.body
    lastClientId = lastClientId + 1

    let newClient = {
        name: newName.name,
        clientId: lastClientId,
        lat: "",
        long: "",
        location: ""
    }

    clients.push(newClient)

    res.json(newClient)
})

app.listen(3000, () => {
    console.log('server running on port 3000')
})