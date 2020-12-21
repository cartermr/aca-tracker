const startTrack = () => {
    window.setInterval(tracker, 1000)
}

const tracker = () => {
    let mainElement = document.getElementById('main')
    mainElement.innerHTML = ''

    let fetchOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    fetch('http://cartermr.ddns.net/locations', fetchOptions)
        .then( (res) => {
           return res.json()
        })
        .then( (data) => {
            console.log(data)
            for (let i = 0; i < data.length; i++) {
                let dataDisplay = `Name: ${data[i].name} | lat: ${data[i].lat} | long: ${data[i].long} | Address: ${data[i].location}`
                let div = document.createElement('div')
                div.innerText = dataDisplay
                mainElement.appendChild(div)
            }
        })
}