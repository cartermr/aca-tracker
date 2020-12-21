const express = require('express')
let fetch = require('node-fetch')
app = express()

let lastClientId = 0
let clients = []

app.use(express.json())
app.use(express.static)

app.get('/', (req, res) => {
    res.json("Hello from express 2")
})

app.get('/locations', (req, res) => {
    res.json(clients)
})

app.post('/clients', (req, res) => {
    let newName = req.body
    // let newName = {"name": "bob"}

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

app.post('/locations', (req, res) => {
    let newCoordinates = req.body
    // let newCoordinates = {"id": 1, lat: "30.23", long: "-97.7"}
    let address = ""

    fetch(`http://nominatim.openstreetmap.org/reverse?format=json&lat=${newCoordinates.lat}&lon=${newCoordinates.long}&zoom=18&addressdetails=1`, {
        method: 'GET',
        headers: {"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36"}
    })
    .then(res => res.json())
    .then(json => {
        console.log(json)
        address = `${json.address.house_number} ${json.address.road}, ${json.address.city}, ${json.address.state} ${json.address.postcode}`
        let client = clients.find(person => person.clientId == newCoordinates.id)
        client.lat = newCoordinates.lat
        client.long = newCoordinates.long
        client.location = address

        res.json(client)
    })
})

app.listen(3000, () => {
    console.log('server running on port 3000')
})