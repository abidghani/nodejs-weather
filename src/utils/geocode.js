const request = require('request')

const geocode = (address, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibWFuYWJhbmEiLCJhIjoiY2l2azBzazJsMDA2ZDJ5bXE3aWVub2g1MSJ9.TAl-f23EwNgEjKt8qwnTQQ&limit=1'
    
    request({url, json: true}, (error, {body}) => {
          if (error){
             callback('unable to connect to location services', undefined)
          } else if (body.features.length === 0) {
             callback('Couldn\'t find that place dude!', undefined)   
          }
          else {
             callback(undefined, {
                lat: body.features[0].center[1],
                long: body.features[0].center[0],
                location: body.features[0].place_name
             } )
          }
    })
 }

 module.exports = geocode
 