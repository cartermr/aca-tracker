// function to start timer and call tracking information
const startTrack = () => {
    window.setInterval(tracker, 1000)
}

// display tracking information
const tracker = () => {
    // get the main area of the html page to display data
    let mainElement = document.getElementById('main')
    // clear the data on a new page call
    mainElement.innerHTML = ''
    
    // fetch call to get the clients and thier location information
    fetch('http://localhost/locations')
        .then( (res) => {
           return res.json()
        })
        .then( (data) => {
            console.log(data)
            // loop through the clients in database
            for (let i = 0; i < data.length; i++) {
                // setup how the text will be displayed
                let dataDisplay = `Name: ${data[i].name} | lat: ${data[i].lat} | long: ${data[i].long} | Address: ${data[i].location}`
                // create div element, append to page to display the data
                let div = document.createElement('div')
                div.innerText = dataDisplay
                mainElement.appendChild(div)
            }
        })
}