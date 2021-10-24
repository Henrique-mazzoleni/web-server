const path = require("path");
const express = require("express");
const hbs = require("hbs");
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

const app = express();

const port = process.env.PORT || 3000;

// Define paths to express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Wetterapp",
    h1: "Weather",
    name: "Henrique",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    h1: "About Me",
    name: "Henrique Mazzoleni",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Hilfe",
    h1: "Help Page",
    name: "Mazzoleni",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.search)
    return res.send({ error: "You must provide a location" });
  geocode(req.query.search, (error, { latitude, longitude, location } = {}) => {
    if (error) return res.send({ error });
    forecast(
      { latitude, longitude },
      (
        error,
        { forecast, temperature, feelsLike, humidity, windSpeed } = {}
      ) => {
        if (error) return res.send({ error });
        res.send({
          forecast: `${forecast}. It is ${temperature} degrees and with a humidity of ${humidity}% and wind speed of ${windSpeed}km/h it feels like ${feelsLike} degrees.`,
          location,
          address: req.query.search,
        });
      }
    );
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    h1: "404",
    message: "Help article not found",
    name: "The Mazz",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    h1: "404",
    message: "Page not found",
    name: "Mazzimo",
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
