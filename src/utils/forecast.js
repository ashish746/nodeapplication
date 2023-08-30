const request = require("request")

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=2f2a60c8c19100db240bb8d2b290383e&query=' + latitude + ',' + longitude
    request({url, "json" : true}, (error, {body}) => {
        if(error){
            callback('unable to connect to location services!', undefined)
        }
        else if (body.error) {
            callback('unable to find location. try another search.', undefined)
        }
        else{
            callback(undefined, {
                weather_descriptions: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                feelslike: body.current.feelslike
            })
        }
    })
}


module.exports = forecast