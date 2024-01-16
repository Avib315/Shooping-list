const mongoose = require("mongoose")
const CategorySchema = new mongoose.Schema(
    {
        CategoryName: String,
        CategoryId: String,
        class: String
    },
    {
        collection: "categories" 
    }
);

const CategoryModel = mongoose.model("categories", CategorySchema);
module.exports = CategoryModel