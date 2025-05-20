# 🌤️ Metropolitan Weather

Metropolitan Weather is a simple and elegant weather application that provides users with real-time weather conditions, a detailed day summary, and a 5-day forecast. With a clean and responsive design, users can easily check the weather of their preferred locations using data from the OpenWeather API.

## ✨ Features

- **Current Weather 🌡️**: Get real-time weather data, including temperature, humidity, and wind speed.
- **Daily Summary 📝**: A concise summary of the current day's weather conditions.
- **5-Day Forecast 📅**: A weather outlook for the next five days.
- **Search by Location 🔍**: Users can enter a city name or use location services to get weather updates.
- **Responsive UI 📱**: Works seamlessly on various screen sizes, ensuring a smooth experience on desktop and mobile devices.

## 🛠️ Tech Stack

- **Frontend**: Vite, React, JSX, CSS 🎨
- **Backend**: Express.js, Node.js 🚀
- **API**: OpenWeather API ☁️
- **Version Control**: Git and GitHub 🗃️
## 🖼️ Sample Images

### 📊 Dashboard
![Screenshot 2025-05-14 202411](https://github.com/user-attachments/assets/31817de5-8403-4379-9269-47b336960581)

### ☀️ Daily Summary
![Screenshot 2025-05-14 202542](https://github.com/user-attachments/assets/282efda2-5951-46da-88b4-a21fb8d8e4fd)
![Screenshot 2025-05-14 202604](https://github.com/user-attachments/assets/6c6435e7-5011-4f37-856e-99a23408259c)

## 📁 Project Structure

```text
MetroWeather/
│
├── frontend/              # Frontend (Vite + React)
│   ├── public/            # Public assets
│   ├── src/               # Source files
│   │   ├── components/    # React components
│   │   ├── pages/         # Main pages for routing
│   │   ├── services/      # API service logic
│   │   ├── App.js         # Main App file
│   │   └── index.js       # Entry point
│   └── package.json       # Frontend dependencies
│
├── backend/               # Backend (Express.js)
│   ├── routes/            # API routes
│   ├── controllers/       # API logic
│   ├── server.js          # Server setup
│   └── package.json       # Backend dependencies
│
└── README.md              # Project documentation


```

## ⚙️ Installation

### 🔹 Frontend Setup (Vite + React)

```bash
# Navigate to the frontend folder
cd frontend

# Install dependencies
npm install

# Create a .env file and add your OpenCage API key
VITE_API_KEY=your-api-key-here

# Start the development server
npm run dev

```
### 🔹 Backend Setup (Express.js)

```bash
# Navigate to the backend folder
cd backend

# Install dependencies
npm install

# Create a .env file and add your OpenWeather API key
API_KEY=your-api-key-here
MONGODB_CLIENT=your-mongodb-connection-string-here

# Start the backend server
npm start
```
## 🌐 API Details
The app uses the OpenWeather API to fetch real-time weather information.
### Example API Call:
```bash 
fetch(`https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}`);
```



