const foodData = {
    rice: { calories: 130, protein: 2.7, carbs: 28, fat: 0.3 },
    chapati: { calories: 104, protein: 3, carbs: 15, fat: 3 },
    dal: { calories: 198, protein: 14, carbs: 26, fat: 6 },
    egg: { calories: 78, protein: 6, carbs: 1, fat: 5 }
};

const predictNutrients = (foodText) => {
    const lowerText = foodText.toLowerCase();
    let total = { calories: 0, protein: 0, carbs: 0, fat: 0 };

    Object.keys(foodData).forEach((item) => {
        const regex = new RegExp(`(\\d+)\\s?(?:bowl|plate|pieces?|chapatis?)?\\s?${item}`, 'g');
        let match;
        while ((match = regex.exec(lowerText)) !== null) {
            const quantity = parseInt(match[1]);
            const nutrients = foodData[item];
            total.calories += nutrients.calories * quantity;
            total.protein += nutrients.protein * quantity;
            total.carbs += nutrients.carbs * quantity;
            total.fat += nutrients.fat * quantity;
        }
    });

    // Round off the values
    return {
        calories: Math.round(total.calories),
        protein: Math.round(total.protein),
        carbs: Math.round(total.carbs),
        fat: Math.round(total.fat)
    };
};

module.exports = predictNutrients;
