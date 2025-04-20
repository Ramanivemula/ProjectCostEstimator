const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');


dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/',(req,res) => {
    res.send('API is running...');
});

const userRoutes = require('./routes/userRoutes');
app.use('/api/users',userRoutes);

const foodRoutes = require('./routes/foodRoutes');
app.use('/api/food',foodRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));