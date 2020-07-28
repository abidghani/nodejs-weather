const request = require('request')

const forecast = (long, lat, callback) => {

const url = 'http://api.weatherstack.com/current?access_key=f8fabca3eb2d637b678251f4039bb6a1&query=' + lat + ',' + long + '&units=m'

request({url, json: true}, (error, {body}) => {
    if (error) {
       callback('unable to connect to services', undefined)
    }
    else if (body.error) {
       callback('location not found, check your location', undefined)
    }
    else {
        callback(undefined, {
               summary: body.current.weather_descriptions[0],
               temperature: body.current.temperature,
               feelslike: body.current.feelslike
        })
    
    }
 })

}


module.exports = forecast
