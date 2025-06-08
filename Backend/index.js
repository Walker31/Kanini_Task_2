import express from 'express';
import cors from 'cors';
import contactRoutes from './Routes/contactRoutes.js';
import noteRoutes from './Routes/noteRoutes.js';
import mongoose from 'mongoose';

const PORT = 5000;
const MONGO_URL = 'mongodb://localhost:27017/Kanini';
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(MONGO_URL)
    .then(() => {
        console.log('MongoDB Connected');
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => console.error('MongoDB connection error:', err));



app.use('/contacts', contactRoutes);
app.use('/notes', noteRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'Server Connected Successfully' });
});

export default app;
