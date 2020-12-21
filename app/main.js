// Setup express
const express = require('express')
let fetch = require('node-fetch')
app = express()

// track the last client id used to help create new client id
let lastClientId = 0

// client database
let clients = []

// json parser for body data from request objects
app.use(express.json())

// serve static html files
app.use(express.static('public'))

// display all clients in database
app.get('/locations', (req, res) => {
    res.json(clients)
})

// add a new client
app.post('/clients', (req, res) => {
    // get json data from request body
    let newName = req.body

    // new client id
    lastClientId = lastClientId + 1

    // create the new client
    let newClient = {
        name: newName.name,
        clientId: lastClientId,
        lat: "",
        long: "",
        location: ""
    }

    // add new client to database
    clients.push(newClient)

    // respond with newly created client
    res.json(newClient)
})

// add address and gps coordinates to client in database
app.post('/locations', (req, res) => {
    // get the gps coordinates from request object
    let newCoordinates = req.body

    // initialize address data
    let address = ""

    // fetch request to api to lookup address from gps coordinates
    fetch(`http://nominatim.openstreetmap.org/reverse?format=json&lat=${newCoordinates.lat}&lon=${newCoordinates.long}&zoom=18&addressdetails=1`, {
        method: 'GET',
        headers: {"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36"}
    })
    .then(res => res.json())
    .then(json => {
        console.log(json)
        // fill in the new address information
        address = `${json.address.house_number} ${json.address.road}, ${json.address.city}, ${json.address.state} ${json.address.postcode}`
        // get the client data was sent to
        let client = clients.find(person => person.clientId == newCoordinates.id)
        // add latitude, longitude, and address to client in database
        client.lat = newCoordinates.lat
        client.long = newCoordinates.long
        client.location = address

        // respond with client data with new location information
        res.json(client)
    })
})

// start server
app.listen(3000, () => {
    console.log('server running on port 3000')
})