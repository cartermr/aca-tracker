let clientId = 0

const track = () => {
    let clientName = {
        "name": document.getElementById('name').value
    }

    let fetchOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(clientName)
    }

    fetch('http://cartermr.ddns.net/clients', fetchOptions)
        .then( (res) => {
            return res.json()
        })
        .then( (data) => {
            clientId = data.clientId
            console.log(data)
        })

        // navigator.geolocation.getCurrentPosition( (pos) => {
        //     console.log(pos)
        //     console.log(pos.latitude)
        //     console.log(pos.coords.longitude)
        // })
    window.setInterval(addCorrdinates, 2000)    
    // addCorrdinates()
}

const addCorrdinates = () => {
    navigator.geolocation.getCurrentPosition( (pos) => {
        let corrdinates = {
            "id": clientId,
            "lat": pos.coords.latitude,
            "long": pos.coords.longitude
        }

        let fetchOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(corrdinates)
        }
    
        fetch('http://cartermr.ddns.net/locations', fetchOptions)
            .then( (res) => {
                return res.json()
            })
            .then( (data) => {
                console.log(data)
            })
    })
}