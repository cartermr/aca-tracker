// initialize clientid variable
let clientId = 0

// function to create new client, then track location
const track = () => {
    // set data to be sent through http post
    let clientName = {
        "name": document.getElementById('name').value
    }

    // fetch options to send out a post request
    let fetchOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(clientName)
    }

    // fecth call to create new client in database
    fetch('http://localhost/clients', fetchOptions)
        .then( (res) => {
            return res.json()
        })
        .then( (data) => {
            // set the client id for repeated geo location setup
            clientId = data.clientId
            console.log(data)
        })

    // call function to get geo coordinates every 2 seconds
    window.setInterval(addCorrdinates, 2000)    
}

// function to get geo coordinates
const addCorrdinates = () => {
    // built in api to get gps coordinates
    navigator.geolocation.getCurrentPosition( (pos) => {
        // setup new coordinate object to be sent in post request
        let corrdinates = {
            "id": clientId,
            "lat": pos.coords.latitude,
            "long": pos.coords.longitude
        }

        // set post request to sent
        let fetchOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(corrdinates)
        }
    
        // fetch call to add geo coordinates to client in database
        fetch('http://localhost/locations', fetchOptions)
            .then( (res) => {
                return res.json()
            })
            .then( (data) => {
                console.log(data)
            })
    })
}