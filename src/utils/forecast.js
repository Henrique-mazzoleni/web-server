const request = require("request");
require("dotenv").config();

function forecast({ longitude, latitude }, callback) {
  const url = `http://api.weatherstack.com/current?access_key=${process.env.WEATHER_API_KEY}&query=${latitude},${longitude}`;

  request({ url, json: true }, (error, { body }) => {
    const { error: returnError } = body;
    const {
      weather_descriptions: forecast,
      temperature,
      feelslike: feelsLike,
    } = body.current;
    if (error) {
      callback("Unable to connect to weather service", undefined);
    } else if (returnError) {
      callback("Weather API unable to find location", undefined);
    } else {
      callback(undefined, {
        forecast: forecast[0],
        temperature,
        feelsLike,
      });
    }
  });
}

module.exports = forecast;
