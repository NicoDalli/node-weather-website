const request = require('request');

const forecast = (latitude,longitude,callback) => {
    url = 'https://api.darksky.net/forecast/1b4f5272ce6c922824fc3f7025fca43a/' + longitude + ',' + latitude + '?units=si&lang=es'
    request({ url, json: true }, (error, {body}) => {
        if(error) {
            callback('No se ha podido conectar');
        } else if (body.error) {
            callback('No se ha encontrado la ubicacion');
        } else {
            console.log(body.currently)
            currently = body.currently
            temp = currently.temperature;
            chance = currently.precipProbability * 100
            humidity = currently.humidity * 100
            callback(undefined, body.daily.data[0].summary + ' Hacen ' + temp + '°C grados. Hay una probabilidad de lluvia de ' + chance + '% y una humedad del ' + humidity + '%');
        }
    })
}

module.exports = forecast