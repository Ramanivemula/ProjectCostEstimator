const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    foodText: {
        type: String,
        required: true
    },
    predictedNutrients: {
        calories: Number,
        protein: Number,
        carbs: Number,
        fat: Number
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Food = mongoose.model('Food', foodSchema);
module.exports = Food;
