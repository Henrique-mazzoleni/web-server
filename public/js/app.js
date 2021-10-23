console.log("Client side js is loaded");

fetch("/weather?search=Berlin").then((response) => {
  response.json().then((data) => {
    if (data.error) return console.log(error);
    console.log(data.forecast);
    console.log(data.location);
  });
});
