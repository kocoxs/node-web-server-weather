const request = require('request')

const weather = ({lat = '37.8267', long = '-122.4233'}, callback) => {


    const url = `https://api.darksky.net/forecast/a81a5421c2a50a2945ad66cb952c2d26/${lat},${long}?units=si&lang=es`

    request(
        {
            url,
            json: true
        }, 
        (error, response) => {
            if(error){
                callback('Error de conexion')
            }else if(response.body.error ) {
                callback('Error de datos')
            }else{
                const currently = response.body.currently;
                const dia0 = response.body.daily.data[0];
                console.log(currently);
                callback(undefined,{
                    summary: dia0.summary,
                    temperature: currently.temperature,
                    precipProbability: currently.precipProbability,
                    windSpeed: currently.windSpeed
                })
            }
        }
    )

  
}

module.exports = {
    weather
}