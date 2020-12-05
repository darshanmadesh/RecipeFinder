const mongoose = require("mongoose");
const Recipe = require("../models/recipe");
const RecipeData = require("./datarecipes");

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

const seedDB = async () => {
    await Recipe.deleteMany({});
    for (let i = 0; i < 100; i++) {
        const r = new Recipe({
            name: RecipeData[i].Name,
            image: RecipeData[i].Image,
            instructions: RecipeData[i].Instructions,
            ingredients: RecipeData[i].Ingredients,
            cookTime: RecipeData[i].CookTime,
            preptTime: RecipeData[i].PrepTime,
            totalTime: RecipeData[i].TotalTime,
            review: RecipeData[i].Review,
            reviewNum: RecipeData[i].ReviewNum,
            yields: RecipeData[i].Yields,
            type: RecipeData[i].Type,
            veg: RecipeData[i].Veg,
        });
        await r.save();
    }
};

//console.log(typeof RecipeData[20].Type);

seedDB();
