# Simple Weather App #

## Asignment ##

Here at Clutch, we have a number of employees who love outdoor activities like hiking, biking, and playing sports. Unfortunately, Atlanta's weather can be a bit sporadic, so it’s always good for us to know what the next few days' weather looks like!

We would like you to use a weather API to build a simple web application that shows us the current weather, as well as the forecast for the next 3 days for multiple locations of our choosing. We want to be able to add a new location (using something like zip code, city name, etc.), toggle between weather information for a selected location, and remove a location from the application.

Our web applications are built around React and Redux. Please use React to complete the exercise. Please provide the application code, as well as some instructions for how to run it, in a code repository (Github, GitLab, etc.) that we can clone and run on our machines.

Bonus: We'd be really excited if the site was responsive for mobile and it would be awesome if the weather locations didn't have to be re-added when we leave and return to the page on our device.

Dark Sky weather API: https://darksky.net/dev
Open Weather API: https://openweathermap.org/api

---

## Features Requested ##

* Shows current weather
* Forecast for the next three days for multiple locations of user's choosing
* Be able to add a new location (using something like zipcode, city name, etc.)
* Toggle between weather information for a selected location
* Remove a location from the application
* Responsive for mobile
* Configuration persists between browser and tab sessions

---

## Notes ##

* The Open Weather API limits free-tier users to using the "One Call API" for multi-day forecasts, which only allows lookup by longitude and latitude. This is why the current-weather functionality accepts a zip code, but the track-location functionality only accepts longitude and latitude.
* Removing tracked locations can be improved by using a hashset rather than an array to track coordinates.

---

## Known Bugs ##

* Multiple identicle locations can be added to the tracking list. Ideally, a location should be added to the tracking list only once.
* Removing tracked locations does not result in automatic virtual DOM updates. In order for changes to show, a manual refresh using `window.location.reload()` is being used.

---

## Quick Start Instructions ##

Begin by cloning the code repository from github: 

```
$ git clone https://github.com/Ghorbanian/simple-weather-app
$ cd simple-weather-app
```

Go to the [Open Weather API](https://openweathermap.org/api) website and sign up for an API key. Create a new file named `.env` in the root of the project directory:
```
$ touch .env
```
 Proceed to past the api key into it as such:

```
echo "REACT_APP_WEATHER_API_KEY=<Your API KEY>" > ./.env
```
Make sure you have [npm](https://docs.npmjs.com/getting-started) installed. Install and start the app using npm: 
```
$ npm install
$ npm start
```
