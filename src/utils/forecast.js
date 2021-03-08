import request from 'postman-request';

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=f86b0965b367a12960b8ff9e07b5e745&query=' + lat + ',' + long + '&units=f';

    request({ url, json: true }, (error, response) => {
        const {error:wxError} = response.body;
        if(error) {
            callback("Could not connect to weather service!", undefined);
        } else if(wxError) {
            callback(response.body.error.info, undefined);
        } else {
            const {weather_descriptions:descriptions, temperature, feelslike} = response.body.current;
            callback(undefined, descriptions[0] + ". It is currently " + temperature + " degrees out. It feels like " + feelslike + " degrees.");
        }
    });
};

export default forecast;