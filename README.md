# 🌦️ Mini Weather Dashboard

A simple and responsive Weather Dashboard built with **FastAPI** (Backend) and **React.js** (Frontend). The application allows users to search for any city and view real-time weather information using the OpenWeatherMap API.

---

## 📌 Features

- Search weather by city name
- Real-time weather data
- Temperature display in Celsius
- Weather description
- Humidity information
- Wind speed details
- FastAPI REST API backend
- React frontend UI
- CORS enabled for local development
- No database required

---

## 🛠️ Tech Stack

### Backend
- Python
- FastAPI
- Uvicorn
- Requests
- OpenWeatherMap API

### Frontend
- React.js
- JavaScript
- CSS

---

## 📂 Project Structure

```bash
Mini-Weather-Dashboard/
│
├── backend/
│   ├── main.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   └── App.js
│   ├── public/
│   └── package.json
│
└── README.md
```

---

# 🚀 Backend Setup

## 1. Navigate to Backend Folder

```bash
cd backend
```

## 2. Create Virtual Environment (Recommended)

### Windows

```bash
python -m venv venv
venv\Scripts\activate
```

### Linux / macOS

```bash
python3 -m venv venv
source venv/bin/activate
```

---

## 3. Install Dependencies

```bash
pip install fastapi uvicorn requests
```

Or install from requirements.txt:

```bash
pip install -r requirements.txt
```

---

## 4. Get OpenWeatherMap API Key

Create a free account and generate an API key:

https://openweathermap.org/api

---

## 5. Configure API Key

Open:

```python
backend/main.py
```

Replace:

```python
API_KEY = "YOUR_OPENWEATHERMAP_API_KEY"
```

with:

```python
API_KEY = "your_actual_api_key"
```

---

## 6. Run Backend Server

```bash
uvicorn main:app --reload --port 8000
```

Backend will start on:

```text
http://localhost:8000
```

---

# ⚛️ Frontend Setup

## 1. Navigate to Frontend Folder

```bash
cd frontend
```

---

## 2. Create React App (First Time Only)

```bash
npx create-react-app .
```

---

## 3. Install Dependencies

```bash
npm install
```

---

## 4. Replace App.js

Replace:

```bash
src/App.js
```

with the provided React component.

---

## 5. Start Frontend

```bash
npm start
```

Frontend will run at:

```text
http://localhost:3000
```

---

# 📡 API Endpoint

## Get Weather Data

### Request

```http
GET /weather?city=Mumbai
```

### Example

```http
http://localhost:8000/weather?city=Mumbai
```

### Sample Response

```json
{
  "city": "Mumbai",
  "temperature": 31,
  "description": "Clear Sky",
  "humidity": 72,
  "wind_speed": 5.4
}
```

---

# 🎯 How It Works

1. User enters a city name.
2. React frontend sends a request to FastAPI backend.
3. FastAPI fetches weather data from OpenWeatherMap.
4. Backend processes the response.
5. Weather details are returned to React.
6. React displays the information on the dashboard.

---

# 🔒 CORS Configuration

CORS is enabled for local development:

```python
http://localhost:3000
```

Modify the allowed origins in `main.py` before deploying to production.

---

# 📸 Screenshots

Add screenshots here after running the application.

```markdown
![Weather Dashboard](screenshots/dashboard.png)
```

---

# 🧪 Future Improvements

- 5-Day Weather Forecast
- Weather Icons
- Dark Mode
- Search History
- Geolocation Support
- Temperature Unit Toggle (°C / °F)
- Responsive Mobile UI
- Weather Charts and Analytics

---

# 🐛 Troubleshooting

### Backend Not Starting

Verify dependencies:

```bash
pip install fastapi uvicorn requests
```

---

### API Key Error

Make sure:

- API key is valid
- API key is activated
- API key is correctly placed in `main.py`

---

### CORS Error

Check that:

```python
allow_origins=["http://localhost:3000"]
```

is configured correctly.

---

# 🤝 Contributing

Contributions, issues, and feature requests are welcome.

1. Fork the repository
2. Create a new branch
3. Commit changes
4. Push to your branch
5. Create a Pull Request

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

Developed using **FastAPI**, **React.js**, and **OpenWeatherMap API**.

⭐ If you found this project useful, consider giving it a star.