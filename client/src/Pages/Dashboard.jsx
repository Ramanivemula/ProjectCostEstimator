import React, { useEffect, useState } from 'react';
import Header from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';
import { FaFire, FaDrumstickBite, FaBreadSlice } from 'react-icons/fa';
import { GiButter } from 'react-icons/gi';
import { FaRegEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { IoClose, IoBarChart } from 'react-icons/io5';

function Dashboard() {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const [foodText, setFoodText] = useState('');
  const [prediction, setPrediction] = useState(null);
  const [entries, setEntries] = useState([]);
  // const [totalSummary, setTotalSummary] = useState(null);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/food/${id}`, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      fetchEntries();
    } catch (error) {
      console.error('Delete Error:', error);
    }
  };

  const handleEdit = (entry) => {
    setFoodText(entry.foodText);
  };

  const fetchEntries = async () => {
    try {
      const { data } = await axios.get('http://localhost:3000/api/food/summary', {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });

      const formattedData = Array.isArray(data) ? data : data.entries || [];
      setEntries(formattedData);
    } catch (error) {
      console.error('Error fetching entries:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        'http://localhost:3000/api/food/add',
        { foodText },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      setPrediction(data.food.predictedNutrients);
      setFoodText('');
      fetchEntries();
    } catch (error) {
      console.error('Prediction Error:', error);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  // Calculate today's totals
  const today = new Date().toISOString().split('T')[0];
  const todayEntries = entries.filter(
    (entry) => new Date(entry.date).toISOString().split('T')[0] === today
  );

  const totalToday = todayEntries.reduce(
    (totals, entry) => {
      return {
        calories: totals.calories + (entry.predictedNutrients.calories || 0),
        protein: totals.protein + (entry.predictedNutrients.protein || 0),
        carbs: totals.carbs + (entry.predictedNutrients.carbs || 0),
        fat: totals.fat + (entry.predictedNutrients.fat || 0),
      };
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  return (
    <>
      <Header />
      <main className="bg-[#d9e2f9] text-blue-950 min-h-screen p-6 md:px-16">
        <h2 className="text-3xl font-bold mb-6">Welcome, {userInfo.name} 👋</h2>

                {/* Today's Total Section */}
                {todayEntries.length > 0 && (
  <div className="bg-[#1e293b] p-6 rounded-xl mb-8 text-white relative shadow-lg">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-xl font-semibold">Your Total for Today</h3>
      <IoBarChart className="text-2xl text-cyan-400" />
    </div>
    <ul className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
      <li className="flex flex-col items-center">
        <span className="bg-red-500 p-3 rounded-full text-white mb-2"><FaFire /></span>
        Calories: {totalToday.calories} kcal
      </li>
      <li className="flex flex-col items-center">
        <span className="bg-yellow-500 p-3 rounded-full text-white mb-2"><FaDrumstickBite /></span>
        Protein: {totalToday.protein} g
      </li>
      <li className="flex flex-col items-center">
        <span className="bg-green-500 p-3 rounded-full text-white mb-2"><FaBreadSlice /></span>
        Carbs: {totalToday.carbs} g
      </li>
      <li className="flex flex-col items-center">
        <span className="bg-purple-500 p-3 rounded-full text-white mb-2"><GiButter /></span>
        Fat: {totalToday.fat} g
      </li>
    </ul>
  </div>
)}

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="mb-6 flex flex-col md:flex-row gap-4 text-blue-950">
          <input
            type="text"
            value={foodText}
            onChange={(e) => setFoodText(e.target.value)}
            placeholder="e.g., 2 roti and dal"
            className="flex-1 px-4 py-2 rounded-xl text-blue-950 bg-slate-100"
            required
          />
          <button
            type="submit"
            className="bg-cyan-500 hover:bg-cyan-600 px-6 py-2 rounded-xl text-white font-semibold"
          >
            Analyze
          </button>
        </form>

        {/* Nutrient Prediction Box */}
        {prediction && (
  <div className="bg-[#1e293b] p-6 rounded-xl mb-8 text-white relative">
    <button
      onClick={() => setPrediction(null)}
      className="absolute top-3 right-3 text-white hover:text-red-500 text-xl"
    >
      <IoClose />
    </button>
    <h3 className="text-xl font-semibold mb-4">Predicted Nutrients</h3>
    <ul className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
      {Object.entries(prediction).map(([key, value]) => (
        <li key={key} className="flex flex-col items-center relative group">
          <button
            className="absolute -top-2 -right-2 text-red-500 hover:text-red-700 bg-white rounded-full p-1 text-sm hidden group-hover:block"
            onClick={() => {
              const newPrediction = { ...prediction };
              delete newPrediction[key];
              setPrediction(newPrediction);
            }}
          >
            <IoClose />
          </button>
          <span className={`p-3 rounded-full text-white mb-2 ${
            key === 'calories' ? 'bg-red-500' :
            key === 'protein' ? 'bg-yellow-500' :
            key === 'carbs' ? 'bg-green-500' :
            'bg-purple-500'
          }`}>
            {key === 'calories' && <FaFire />}
            {key === 'protein' && <FaDrumstickBite />}
            {key === 'carbs' && <FaBreadSlice />}
            {key === 'fat' && <GiButter />}
          </span>
          {key.charAt(0).toUpperCase() + key.slice(1)}: {value} {key === 'calories' ? 'kcal' : 'g'}
        </li>
      ))}
    </ul>
  </div>
)}





        {/* Meal History Section */}
        <section className="mb-10">
          <h3 className="text-2xl font-semibold mb-4">Your Meal History</h3>
          {entries.length === 0 ? (
            <p className="text-gray-500">No entries yet.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {entries.map((entry) => (
                <div
                  key={entry._id}
                  className="bg-[#1e293b] p-4 rounded-xl text-white w-full flex flex-col gap-3"
                >
                  <div className="flex justify-between items-center">
                    <p className="text-cyan-400 font-medium text-lg">{entry.foodText}</p>
                    <div className="flex gap-3 text-white text-lg">
                      <button
                        className="hover:text-yellow-400"
                        onClick={() => handleEdit(entry)}
                      >
                        <FaRegEdit />
                      </button>
                      <button
                        className="hover:text-red-500"
                        onClick={() => handleDelete(entry._id)}
                      >
                        <MdDelete />
                      </button>
                    </div>
                  </div>
                  <ul className="text-sm grid grid-cols-2 md:grid-cols-4 gap-2">
                    <li>Calories: {entry.predictedNutrients.calories}</li>
                    <li>Protein: {entry.predictedNutrients.protein}g</li>
                    <li>Carbs: {entry.predictedNutrients.carbs}g</li>
                    <li>Fat: {entry.predictedNutrients.fat}g</li>
                  </ul>
                  <p className="text-xs text-gray-400">
                    Date: {new Date(entry.date).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Placeholder Chart Section */}
        <div className="bg-[#1e293b] p-6 rounded-xl text-center text-white">
          📊 Nutrient Trends Chart coming soon!
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Dashboard;
