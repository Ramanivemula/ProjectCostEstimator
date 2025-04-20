const Food = require('../models/Food');
const predictNutrients = require('../utils/nlpUtils');

const addFoodEntry = async (req, res) => {
    const { foodText } = req.body;
    const userId = req.user.id;

    try {
        const predictedNutrients = predictNutrients(foodText);

        const food = await Food.create({
            user: userId,
            foodText,
            predictedNutrients
        });

        res.status(201).json({
            message: 'Food entry saved',
            food
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getDailySummary = async (req, res) => {
    const userId = req.user.id;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    try {
        const foodEntries = await Food.find({
            user: userId,
            date: { $gte: today }
        }).sort({ date: -1 }); // Optional: latest first

        let total = { calories: 0, protein: 0, carbs: 0, fat: 0 };

        foodEntries.forEach(entry => {
            total.calories += entry.predictedNutrients.calories;
            total.protein += entry.predictedNutrients.protein;
            total.carbs += entry.predictedNutrients.carbs;
            total.fat += entry.predictedNutrients.fat;
        });

        res.status(200).json({
            message: 'Daily nutrient summary',
            total,
            entries: foodEntries  // <--- THIS IS THE KEY PART
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteFoodEntry = async (req, res) => {
    try {
      const food = await Food.findById(req.params.id);
  
      if (!food) {
        return res.status(404).json({ message: 'Entry not found' });
      }
  
      if (food.user.toString() !== req.user.id) {
        return res.status(401).json({ message: 'Not authorized to delete this entry' });
      }
  
      await food.deleteOne(); // Or food.remove() depending on your Mongoose version
      res.status(200).json({ message: 'Entry deleted' });
    } catch (error) {
      console.error('Delete Error:', error); // 🔍 Log the error
      res.status(500).json({ message: error.message });
    }
  };
  
  


module.exports = { addFoodEntry, getDailySummary, deleteFoodEntry };
