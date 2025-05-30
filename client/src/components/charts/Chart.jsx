import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line, CartesianGrid, Legend } from 'recharts';

const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'];

const Chart = ({ type, todayData, mealEntries, entries }) => {
  if (type === 'pie') {
    if (!todayData) return null;

    const pieData = [
      { name: 'Calories', value: todayData.calories || 0 },
      { name: 'Protein', value: todayData.protein || 0 },
      { name: 'Carbs', value: todayData.carbs || 0 },
      { name: 'Fat', value: todayData.fat || 0 },
    ];

    return (
      <PieChart width={300} height={300}>
        <Pie
          data={pieData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label
        >
          {pieData.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    );
  }

  if (type === 'bar') {
    if (!mealEntries || mealEntries.length === 0) return null;

    const barData = mealEntries.map((entry, index) => ({
      name: `Meal ${index + 1}`,
      Calories: entry.predictedNutrients.calories || 0,
      Protein: entry.predictedNutrients.protein || 0,
      Carbs: entry.predictedNutrients.carbs || 0,
      Fat: entry.predictedNutrients.fat || 0,
    }));

    return (
      <BarChart width={400} height={300} data={barData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Calories" fill="#FF6384" />
        <Bar dataKey="Protein" fill="#36A2EB" />
        <Bar dataKey="Carbs" fill="#FFCE56" />
        <Bar dataKey="Fat" fill="#4BC0C0" />
      </BarChart>
    );
  }

  if (type === 'line') {
    if (!entries || entries.length === 0) return null;

    // Group by date and calculate totals
    const grouped = {};
    entries.forEach((entry) => {
      const date = new Date(entry.date).toLocaleDateString();
      if (!grouped[date]) {
        grouped[date] = { calories: 0, protein: 0, carbs: 0, fat: 0 };
      }
      const nutrients = entry.predictedNutrients || {};
      grouped[date].calories += nutrients.calories || 0;
      grouped[date].protein += nutrients.protein || 0;
      grouped[date].carbs += nutrients.carbs || 0;
      grouped[date].fat += nutrients.fat || 0;
    });

    const lineData = Object.keys(grouped).map((date) => ({
      date,
      Calories: grouped[date].calories,
      Protein: grouped[date].protein,
      Carbs: grouped[date].carbs,
      Fat: grouped[date].fat,
    }));

    return (
      <LineChart width={500} height={300} data={lineData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Calories" stroke="#FF6384" />
        <Line type="monotone" dataKey="Protein" stroke="#36A2EB" />
        <Line type="monotone" dataKey="Carbs" stroke="#FFCE56" />
        <Line type="monotone" dataKey="Fat" stroke="#4BC0C0" />
      </LineChart>
    );
  }

  return null;
};

export default Chart;
