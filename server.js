// Loads the express module
const express = require("express");
const hbs = require("hbs");

const bodyParser = require("body-parser");

const path = require("path");

//Creates our express server
const app = express();
const port = 3000;

//Serves static files (we need it to import a css file)
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "hbs");
app.use(bodyParser.urlencoded({ extended: true }));

//Sets a basic route

// Render the initial page with the number input form
app.get("/", (req, res) => {
  res.render("index");
});

// Create express route binder for draw.hbs and get the data from the url as parameters
// that came from index.hbs
app.post("/draw", (req, res) => {
  const { name, gender, guests } = req.body;
  const guestList = guests.split(",").map(g => g.trim()).filter(g => g !== "");

  const birthdaySong = [
      "Happy birthday to you!",
      "Happy birthday to you!",
      `Happy birthday dear ${name}!`,
      "Happy birthday to you!"
  ];

  const pronoun = gender === "male" ? "he" : "she";
  const jollySong = [
      `For ${name}’s a jolly good fellow!`,
      `For ${name}’s a jolly good fellow!`,
      `For ${name}’s a jolly good fellow, which nobody can deny!`
  ];

  let assignedLyrics = [];
  let guestsCount = guestList.length;

  birthdaySong.forEach(line => {
      let words = line.split(" ");
      let wordAssignments = words.map((word, index) => ({
          word,
          guest: guestList[index % guestsCount] || "Someone"
      }));
      assignedLyrics.push(wordAssignments);
  });

  res.render("draw", { name, birthdaySong, jollySong, assignedLyrics, guestList });
});


//Makes the app listen to port 3000
app.listen(port, () => console.log(`App listening to port ${port}`));
