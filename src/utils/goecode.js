const request = require('request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYWFyb25jb250cmVyYXMxOTkwIiwiYSI6ImNrN3doNWRtMzAyOXIzZXRkaHlydGplbGcifQ.E1UJvVRTlht9yBsYuaab9w&limit=1`
    request({
        url,
        json: true
    },(error, response) => {
        if(error){
            callback('Error de conexion')
        }else if(response.body.features.length === 0 ) {
            callback('Error de datos')
        }else{
            const data = response.body
            callback(undefined,{
                latitude: data.features[0].center[1],
                longitude: data.features[0].center[0],
                place_name: data.features[0].place_name
            })
        }
    })
}

module.exports = {
    geocode
}