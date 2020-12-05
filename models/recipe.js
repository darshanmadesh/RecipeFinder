const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const recipeScheme = new Schema({
    name: String,
    image: String,
    instructions: String,
    ingredients: [String],
    cookTime: Number,
    prepTime: Number,
    totalTime: Number,
    review: Number,
    reviewNum: Number,
    type: String,
    yields: String,
    veg: Number,
});

module.exports = mongoose.model("Recipe", recipeScheme);
