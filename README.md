# Weather-App
A weather app built with HTML, CSS &amp; JavaScript
# 🌤 Skycast — Weather App

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![OpenWeatherMap](https://img.shields.io/badge/API-OpenWeatherMap-orange?style=flat)
![License](https://img.shields.io/badge/License-MIT-green?style=flat)

> A sleek, real-time weather app built with pure HTML, CSS, and JavaScript.  
> Search any city in the world and get live atmospheric conditions instantly.

---

## 🖼️ Preview

```
┌──────────────────────────────────┐
│  SKYCΑST     // atmospheric      │
├──────────────────────────────────┤
│  🔍 [ Enter city name…  ] [FETCH]│
├──────────────────────────────────┤
│  London                  ⛅      │
│  GB · 14:32         Partly Cloudy│
│                                  │
│     14°C                         │
│         feels 11° · ↑17° ↓9°    │
│                                  │
│  💧 78%   💨 19.4km/h  👁 8.0km │
│  🌡 1012   🌅 06:48    🌇 17:55 │
└──────────────────────────────────┘
```

---

## ✨ Features

- 🔍 **Search any city** worldwide by name
- 🌡️ **Live temperature** with feels-like and daily high/low
- 💧 Humidity, 💨 Wind Speed, 👁 Visibility, 🌡 Pressure
- 🌅 Sunrise & 🌇 Sunset times (local to the city)
- 🌌 **Animated star-field canvas** background that changes theme with the weather
- 📱 **Fully responsive** — works on mobile, tablet, and desktop
- ⚡ **Sample data mode** — works without an API key for preview/demo
- 🎨 Dark editorial gold theme with smooth animations

---

## 📁 Project Structure

```
skycast-weather-app/
│
├── index.html      ← Page structure & weather card layout
├── style.css       ← Dark luxury theme, animations, responsive grid
├── app.js          ← API logic, DOM updates, canvas background
└── README.md       ← You are here!
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR-USERNAME/skycast-weather-app.git
cd skycast-weather-app
```

### 2. Get a Free API Key

1. Go to [openweathermap.org](https://openweathermap.org/api)
2. Sign up for a **free account**
3. Copy your **API key** from the dashboard

### 3. Add Your API Key

Open `app.js` and replace the placeholder on line 8:

```javascript
// Before
const API_KEY = 'YOUR_API_KEY_HERE';

// After
const API_KEY = 'abc123yourrealkeyhere';
```

### 4. Open in Browser

Simply open `index.html` in any modern browser — no server required!

```bash
# On macOS
open index.html

# On Linux
xdg-open index.html

# On Windows
start index.html
```

---

## 🌐 Live Demo

🔗 **[View Live on GitHub Pages](https://YOUR-USERNAME.github.io/skycast-weather-app/)**

> To enable GitHub Pages:
> 1. Go to your repo → **Settings** → **Pages**
> 2. Set branch to `main` → **Save**
> 3. Your app will be live in 1–2 minutes!

---

## 🛠️ Built With

| Technology | Purpose |
|------------|---------|
| **HTML5** | Page structure and semantic layout |
| **CSS3** | Styling, animations, responsive design |
| **JavaScript (ES6+)** | API calls, DOM manipulation, canvas |
| **Canvas API** | Animated star-field sky background |
| **OpenWeatherMap API** | Real-time weather data |
| **Google Fonts** | Playfair Display + IBM Plex Mono |

---

## 📡 API Reference

This app uses the **OpenWeatherMap Current Weather API**:

```
GET https://api.openweathermap.org/data/2.5/weather
    ?q={city name}
    &appid={API key}
    &units=metric
```

**Free tier includes:** 1,000 calls/day · 60 calls/minute

---

## 🎨 Canvas Themes

The animated background dynamically changes based on weather conditions:

| Weather | Canvas Theme |
|---------|-------------|
| ☀️ Clear Day | Blue sky with soft particles |
| 🌙 Clear Night | Deep space dark with bright stars |
| ⛅ Cloudy | Muted grey-blue tones |
| ⛈ Thunderstorm | Dark stormy fast-moving particles |
| ❄️ Snow | Cool blue-white soft particles |

---

## 📱 Responsive Breakpoints

| Screen | Layout |
|--------|--------|
| > 420px | 3-column stats grid |
| ≤ 420px | 2-column stats grid, stacked card header |

---

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/add-forecast`)
3. Commit your changes (`git commit -m 'Add 5-day forecast'`)
4. Push to the branch (`git push origin feature/add-forecast`)
5. Open a Pull Request

---

## 💡 Future Improvements

- [ ] 5-day weather forecast
- [ ] Geolocation (auto-detect user's city)
- [ ] Toggle °C / °F units
- [ ] Weather alerts and warnings
- [ ] Dark/light theme toggle
- [ ] City search autocomplete

---

## 📄 License

This project is licensed under the **MIT License** — feel free to use, modify, and distribute.

---

## 🙏 Acknowledgements

- Weather data by [OpenWeatherMap](https://openweathermap.org)
- Fonts by [Google Fonts](https://fonts.google.com)
- Built with ❤️ using vanilla HTML, CSS & JavaScript

---

<p align="center">
  Made with ☁️ by <strong>YOUR-NAME</strong> · 2026
</p>
