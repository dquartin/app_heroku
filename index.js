const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const config = require('./config.js');
const app = express();

app.use(bodyParser.json());
app.post('/weather', (req, res) => {
	axios.get(`${config.WEATHER_URL}/weather`, {
		params:
		{
			q: req.body.conversation.memory.city.raw,
			id: config.ID,
			APPID: config.WEATHER_KEY,
			units: 'metric'
		}
	})
	.then(result => {
		let weather = convWeather(result.data.weather[0].main);
		return res.json({
			replies: [
				{
			  type: 'text',
			  content: `The weather in ${result.data.name} today is around ${Math.floor(result.data.main.temp)}°C and it's ${weather}.`,
			},
		  ]});
	})
	.catch(err => console.error(err))
})
app.post('/errors', (req, res) => {
	console.error(req.body);
	res.sendStatus(200); 
 });
app.listen(config.PORT, () => console.log(`App started on port ${config.PORT}`));

convWeather = (weather) => {
	switch (weather.toLowerCase()) {
		case 'clouds':
			return 'cloudy';
		case 'sun':
			return 'sunny';
		case 'rain':
			return 'rainy';
		case 'snow':
			return 'snowy';
		case 'fog':
		case 'mist':
			return 'misty';
		case 'thunderstorm':
			return 'thundery';
		case 'drizzle':
			return 'drizzly';
		default:
			return weater.toLowerCase();
	}
}