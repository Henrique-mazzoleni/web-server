const path = require("path");
const express = require("express");
const hbs = require("hbs");

const app = express();

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
  res.send({
    forecast: "cloudy",
    location: "Berlin",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
