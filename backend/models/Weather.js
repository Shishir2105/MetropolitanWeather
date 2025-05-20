import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
mongoose.connect(process.env.MONGODB_CLIENT, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.error('Failed to connect to MongoDB Atlas', err));
const weatherSchema = new mongoose.Schema({
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  summary: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const Weather = mongoose.model('Weather', weatherSchema);

export default Weather;
