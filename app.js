//Importing all required packages:
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const Recipe = require("./models/recipe");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

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
app.engine("ejs", ejsMate);

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

//routes
app.get("/", (req, res) => {
    res.render("home");
});

//All Recipes
app.get("/recipes", async (req, res) => {
    const recipes = await Recipe.find({});
    res.render("recipes/index", { recipes });
});
//Get Link to add recipe form AND then post the data to db
app.get("/recipes/new", (req, res) => {
    res.render("recipes/new");
});
app.post("/recipes", async (req, res) => {
    const recipe = new Recipe(req.body.recipe);
    await recipe.save();
    res.redirect(`/recipes/${recipe._id}`);
});
//Each Recipe
app.get("/recipes/:id", async (req, res) => {
    const recipe = await Recipe.findById(req.params.id);
    res.render("recipes/show", { recipe });
});
//Edit Recipe: get Edit form and the Update DB
app.get("/recipes/:id/edit", async (req, res) => {
    const recipe = await Recipe.findById(req.params.id);
    res.render("recipes/edit", { recipe });
});
app.put("/recipes/:id", async (req, res) => {
    const { id } = req.params;
    const recipe = await Recipe.findByIdAndUpdate(id, { ...req.body.recipe });
    res.redirect(`/recipes/${recipe._id}`);
});
//Delete Recipe
app.delete("/recipes/:id", async (req, res) => {
    const { id } = req.params;
    await Recipe.findByIdAndDelete(id);
    res.redirect("/recipes");
});
//port and listen
app.listen(3000, () => {
    console.log("serving on Port 3000");
});
