const request = require('request');

const geocode = (adress, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(adress) + '.json?access_token=pk.eyJ1Ijoibmljb2RhbGxpIiwiYSI6ImNqdWp3d3JpazFxM2czeXBwNmltZ3ByaHQifQ.87dZCz6Z2-57SXkkYpuo9A&limit=1'
    request({ url, json: true}, (error, {body}) => {
        if(error){
            callback('Error de conexion')
        } else if (body.features.length === 0) {
            callback('No hay resultados')
        } else {
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode