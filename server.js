// requiring
const express = require("express");
const mongoose = require("mongoose");
const PORT = 5001;
const app = express();
const url = process.env.MONGO_URI;
require("dotenv").config();

// connecting database
mongoose.connect(
  url,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
  (err) =>
    err ? console.error(err.message) : console.log("Database is connected")
);

// person schema creation
let personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  favouriteFoods: [
    {
      type: String,
    },
  ],
});

// creating model
const persons = mongoose.model("person", personSchema);

const person = new persons({
  name: "Slim",
  age: 24,
  favouriteFoods: ["makarouna", "escalope", "protein"],
});

person.save((err, data) => (err ? console.log(err) : console.log(data)));

//creating people
const personList = [
  { name: "ali", age: "30", favouriteFoods: ["chocolat", "pizza"] },
  {
    name: "Mariem",
    age: "18",
    favouriteFoods: ["frites", "milkshake", "burrito"],
  },
  { name: "John", age: "36", favouriteFoods: ["waffles", "kosksi", "burrito"] },
];

persons.create(personList);

//searching data by name
persons.find({ name: "Slim" }, (err, data) =>
  err ? console.error(err.message) : console.log(data)
);

// specified search
persons.findOne({ favouriteFoods: "burrito" }, (err, data) =>
  err ? console.error(err.message) : console.log(data)
);

// searching by ID
persons.findById("5ffe1a8685aced167854a0dc", (err, data) =>
  err ? console.error(err.message) : console.log(data)
);

//searching by ID and editing favouritefoods
persons.findById("5ffe1a8685aced167854a0dc", (err, data) => {
  if (err) console.log(err.message);
  else data.favouriteFoods.push("hamburger");
  data.save();
});

// finding and updating age
persons.findOneAndUpdate(
  { name: "Mariem" },
  { age: 20 },
  { new: true },
  (err, data) => (err ? console.error(err.message) : console.log(data))
);

// finding and removing person by ID
persons.findByIdAndRemove("5ffe1a8685aced167854a0de", (err, data) =>
  err ? console.error(err.message) : console.log(data)
);

// deleting data
person.remove({ name: "Ali" }, (err, data) =>
  err ? console.error(err.message) : console.log(date)
);

// searching using query helpers
persons
  .find({ favouriteFoods: "burrito" })
  .sort({ name: 1 })
  .limit(2)
  .select("-age")
  .exec()
  .then((data) => console.log(data))
  .catch((err) => console.error(err.message));

// setting up server connection
app.listen(PORT, (err) =>
  err ? console.error(err.message) : console.log(`server is running on ${PORT}`)
);
