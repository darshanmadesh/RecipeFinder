const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const Recipe = require("./models/recipe");

//connect DB
mongoose.connect("mongodb://localhost:27017/finalProject", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

//app
const app = express();

//view engine : ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//routes
app.get("/", (req, res) => {
    res.render("home");
});
app.get("/makerecipe", async (req, res) => {
    const recipe = new Recipe({ yields: "some dish" });
    await recipe.save();
    res.send(recipe);
});

//port and listen
app.listen(3000, () => {
    console.log("serving on Port 3000");
});
