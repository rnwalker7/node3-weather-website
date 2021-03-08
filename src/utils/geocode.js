import request from 'postman-request';

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoicm53YWxrZXI3IiwiYSI6ImNrazl1ZWRzdTA3MGYydm52M285YTVucmsifQ.xv3J_Xm9b2Wt10K-jf6ZgQ&limit=1';

    request({ url, json: true }, (error, { body }) => {
        if(error) {
            callback("Could not connect to location service!", undefined);
        } else if(body.features === undefined) {
            callback("Unable to find location. Try another search. ", undefined);
        } else {
            try {
                const {center, place_name} = body.features[0];
                callback(undefined, {
                    latitude: center[1],
                    longitude: center[0],
                    location: place_name
                });
            } catch(e) {
                callback(undefined, {
                    latitude: 0,
                    longitude: 0,
                    location: undefined
                })
            }
        }
    });
};

export default geocode;