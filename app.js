/* =========================================
   SKYCAST WEATHER APP — app.js
   Sample data included for instant preview.
   Replace API_KEY to enable live fetching.
   ========================================= */

// -------------------------------------------------------
// ⚙️  CONFIGURATION
//     Get a FREE key at: https://openweathermap.org/api
// -------------------------------------------------------
const API_KEY = 'YOUR_API_KEY_HERE';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

// -------------------------------------------------------
// 📦  SAMPLE / MOCK DATA
//     Used when no API key is set — shows London weather
// -------------------------------------------------------
const SAMPLE_DATA = {
  name: 'London',
  sys:  { country: 'GB', sunrise: 1708844880, sunset: 1708883700 },
  main: {
    temp: 14, feels_like: 11,
    temp_max: 17, temp_min: 9,
    humidity: 78, pressure: 1012,
  },
  weather: [{ description: 'Partly Cloudy', icon: '02d' }],
  wind:       { speed: 5.4 },
  visibility: 8000,
  timezone:   0,
};

// -------------------------------------------------------
// 🗺️  WEATHER ICON → EMOJI MAP
// -------------------------------------------------------
const EMOJI_MAP = {
  '01d': '☀️',  '01n': '🌙',
  '02d': '⛅',  '02n': '🌙',
  '03d': '☁️',  '03n': '☁️',
  '04d': '☁️',  '04n': '☁️',
  '09d': '🌧',  '09n': '🌧',
  '10d': '🌦',  '10n': '🌧',
  '11d': '⛈',  '11n': '⛈',
  '13d': '❄️',  '13n': '❄️',
  '50d': '🌫',  '50n': '🌫',
};

// -------------------------------------------------------
// 🔗  DOM REFERENCES
// -------------------------------------------------------
const cityInput   = document.getElementById('cityInput');
const weatherCard = document.getElementById('weatherCard');
const loader      = document.getElementById('loader');
const errorBar    = document.getElementById('errorBar');
const errorText   = document.getElementById('errorText');

// -------------------------------------------------------
// 🛠️  HELPERS
// -------------------------------------------------------

/** Format Unix timestamp + UTC offset → "HH:MM" */
function formatTime(unixSecs, utcOffsetSecs) {
  const d = new Date((unixSecs + utcOffsetSecs) * 1000);
  const h = String(d.getUTCHours()).padStart(2, '0');
  const m = String(d.getUTCMinutes()).padStart(2, '0');
  return `${h}:${m}`;
}

/** Current local clock time for a city's UTC offset */
function getCityLocalTime(utcOffsetSecs) {
  const nowUnix = Math.floor(Date.now() / 1000);
  return formatTime(nowUnix, utcOffsetSecs);
}

function showEl(el)   { el.classList.add('visible');    }
function hideEl(el)   { el.classList.remove('visible'); }
function resetState() {
  hideEl(weatherCard);
  hideEl(loader);
  hideEl(errorBar);
}

// -------------------------------------------------------
// 🌍  POPULATE CARD WITH DATA OBJECT
// -------------------------------------------------------
function populateCard(d) {
  const { name, sys, main, weather, wind, visibility, timezone } = d;

  // Location
  document.getElementById('cityName').textContent    = name;
  document.getElementById('countryName').textContent = sys.country;
  document.getElementById('localTime').textContent   = getCityLocalTime(timezone);

  // Condition
  const icon = weather[0].icon;
  document.getElementById('weatherEmoji').textContent   = EMOJI_MAP[icon] || '🌤';
  document.getElementById('conditionLabel').textContent = weather[0].description;

  // Temperature
  document.getElementById('tempBig').textContent    = Math.round(main.temp);
  document.getElementById('feelsLike').textContent  = `feels ${Math.round(main.feels_like)}°`;
  document.getElementById('tempRange').textContent  =
    `↑${Math.round(main.temp_max)}° ↓${Math.round(main.temp_min)}°`;

  // Stats
  document.getElementById('humidity').textContent   = `${main.humidity}%`;
  document.getElementById('windSpeed').textContent  = `${(wind.speed * 3.6).toFixed(1)} km/h`;
  document.getElementById('visibility').textContent = `${(visibility / 1000).toFixed(1)} km`;
  document.getElementById('pressure').textContent   = `${main.pressure} hPa`;
  document.getElementById('sunrise').textContent    = formatTime(sys.sunrise, timezone);
  document.getElementById('sunset').textContent     = formatTime(sys.sunset, timezone);

  // Update canvas theme to match weather
  updateCanvasTheme(icon);
}

// -------------------------------------------------------
// 🔍  SEARCH WEATHER — real API or sample fallback
// -------------------------------------------------------
async function searchWeather() {
  const city = cityInput.value.trim();
  if (!city) { cityInput.focus(); return; }

  resetState();

  // If no API key is set, show sample data with a note
  if (API_KEY === 'YOUR_API_KEY_HERE') {
    showEl(loader);
    setTimeout(() => {
      hideEl(loader);
      // Swap name to whatever the user typed
      const mock = { ...SAMPLE_DATA, name: city };
      populateCard(mock);
      showEl(weatherCard);
    }, 800); // Simulate network delay
    return;
  }

  // Real API call
  showEl(loader);
  try {
    const url = `${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
    const res = await fetch(url);

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message || 'City not found');
    }

    const data = await res.json();
    hideEl(loader);
    populateCard(data);
    showEl(weatherCard);

  } catch (err) {
    hideEl(loader);
    errorText.textContent = err.message.toLowerCase().includes('not found')
      ? 'City not found. Check spelling and try again.'
      : `Error: ${err.message}`;
    showEl(errorBar);
  }
}

// ---- Press Enter to search ----
cityInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') searchWeather();
});

// -------------------------------------------------------
// 🎨  CANVAS — Animated Star-Field Sky Background
// -------------------------------------------------------
const canvas = document.getElementById('skyCanvas');
const ctx    = canvas.getContext('2d');

let particles    = [];
let currentTheme = 'night';

const THEMES = {
  night:  { bg: ['#080c14', '#0c1528'], dot: 'rgba(255,255,255,',  speed: 0.15 },
  day:    { bg: ['#0d1d3a', '#1a3a5c'], dot: 'rgba(200,225,255,',  speed: 0.20 },
  storm:  { bg: ['#090b0f', '#0c1018'], dot: 'rgba(150,170,195,',  speed: 0.45 },
  cloudy: { bg: ['#10151f', '#161e2e'], dot: 'rgba(175,188,210,',  speed: 0.18 },
  snow:   { bg: ['#0d1520', '#12203a'], dot: 'rgba(220,235,255,',  speed: 0.22 },
};

function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}

function createParticles(count = 180) {
  particles = Array.from({ length: count }, () => ({
    x:     Math.random() * canvas.width,
    y:     Math.random() * canvas.height,
    r:     Math.random() * 1.5 + 0.2,
    alpha: Math.random() * 0.65 + 0.1,
    vx:    (Math.random() - 0.5) * 0.5,
    vy:    (Math.random() - 0.5) * 0.5,
    phase: Math.random() * Math.PI * 2,
  }));
}

function drawFrame() {
  const t = THEMES[currentTheme];

  // Sky gradient
  const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  grad.addColorStop(0, t.bg[0]);
  grad.addColorStop(1, t.bg[1]);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Stars / particles
  particles.forEach(p => {
    p.phase += 0.011;
    const a = p.alpha * (0.65 + 0.35 * Math.sin(p.phase));

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = t.dot + a.toFixed(3) + ')';
    ctx.fill();

    p.x += p.vx * t.speed;
    p.y += p.vy * t.speed;

    // Wrap around edges
    if (p.x < 0)             p.x = canvas.width;
    if (p.x > canvas.width)  p.x = 0;
    if (p.y < 0)             p.y = canvas.height;
    if (p.y > canvas.height) p.y = 0;
  });

  requestAnimationFrame(drawFrame);
}

/** Map OpenWeatherMap icon code → canvas theme */
function updateCanvasTheme(icon) {
  const code  = icon.slice(0, 2);
  const isDay = icon.endsWith('d');
  if      (code === '11')                          currentTheme = 'storm';
  else if (code === '13')                          currentTheme = 'snow';
  else if (['03', '04', '50'].includes(code))      currentTheme = 'cloudy';
  else if (isDay)                                  currentTheme = 'day';
  else                                             currentTheme = 'night';
}

// ---- Boot canvas ----
window.addEventListener('resize', () => {
  resizeCanvas();
  createParticles();
});

resizeCanvas();
createParticles();
drawFrame();
