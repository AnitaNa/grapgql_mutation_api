const Recipes = require('../models/Recipe');

module.exports = {
    Query: {
        async recipe(_, {ID}) {
            return await Recipes.findById(ID);
        },
        async getRecipes(_, amount) {
            return await Recipes.find().sort({ createdAt: -1}).limit(amount)
        }
    },
    Mutation: {
        async createRecipe(_, {recipeInput: {name, description}}) {
            const createdRecipe = new Recipes({
                name,
                description,
                createdAt: new Date().toISOString(),
                thumpsUp: 0,
                thumosDown: 0
            });

            const res = await createdRecipe.save(); // saving data in MangoDB database
            return {
                id: res.id,
                ...res._doc
            }
        },
        async deleteRecipe(_,{ID} ) {
           const wasDeleted = await Recipes.deleteOne({_id: ID}).deletedCount;
           return wasDeleted
        },
        async editRecipe(_, {ID, recipeInput: {name, description}}) {
            const updatedRecipe = await Recipes.updateOne({_id: ID}, {name, description}).modifiedCount;
            return updatedRecipe;
        }
    }
}