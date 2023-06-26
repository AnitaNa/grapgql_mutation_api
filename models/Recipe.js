const { model, Schema } = require('mongoose');

const recipesSchema = new Schema({
        name: String,
        description: String,
        createdAt: String,
        thumpsUp: Number,
        thumpsDown: Number
});

module.exports = model('Recipe', recipesSchema);