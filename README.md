# 📖 Al-Qur'an Random Ayah Generator (React App)

A logic-focused React web application that generates random Quran verses (ayah) with flexible display options, controlled randomness, and clean state management.

This project emphasizes **data handling, state control, and algorithmic logic**, rather than heavy UI frameworks.

---

## ✨ Features

- 🎲 Generate random ayah from selected surah
- 🔁 Toggle **repeat / no-repeat** mode (no duplicate ayah until exhausted)
- 🎯 Custom ayah range selection
- 🌐 Real Quran data from public API

### 🖥️ Display Options
- Arabic text
- Latin transliteration
- English/Indonesian translation

### ⚙️ UI
- Dynamic UI updates based on user interaction

---

## 🛠️ Tech Stack

### Frontend
- **React (Functional Components)**
- JSX
- CSS (custom, no framework)

### JavaScript & Logic
- ES6+
- `useState`, `useEffect`, `useRef`, `useMemo`
- Fetch API
- Manual state management
- Controlled rendering

### API
- **equran.id Public API**

---

## 🧠 Key Technical Highlights

- Logic-first React implementation
- Manual state management (without Redux / Zustand)
- No-repeat random algorithm to prevent duplicate number
- Clean separation of concerns:
  - Data fetching
  - State handling
  - Rendering logic
  - Utility helpers
- Graceful error handling & UX feedback
- React-ready mindset (scalable architecture)

---

## 📂 Project Structure

src/
├── components/
├── assets/
├── styles/
├── data/
├── utils/
└── App.jsx

*(structure may evolve as the project scales)*

---

## 📦 API Reference

- Get all surah (English) 
  `GET https://equran.id/api/en/surah`

- Get all surah (Indonesia) 
  `GET https://equran.id/api/v2/surat`

- Get surah detail (English) 
  `https://equran.id/api/en/surah/{chosen_surah}`

- Get surah detail (Indonesia) 
  `https://equran.id/api/v2/surat/{chosen_surah}`

---

## 🧩 Possible Improvements

- Split logic into custom hooks
- Add bookmark / favorite ayah feature
- Add ayah audio play options
- Persist user preferences with `localStorage`
- Improve accessibility (ARIA labels)
- Migrate styling to CSS Modules or styled-components
- Add unit tests for logic functions

---

## 👤 Author

**Teguh Rachmadi**  
Frontend Developer — Logic & Data-Oriented  

- 🌍 Location: Indonesia  
- 💼 Availability: Freelance / Remote  
- 🧠 Focus: React, logic-heavy UI, data-driven apps  

GitHub: https://github.com/teguhrachmadi1206-png

---

## 📄 License

This project is intended for **educational and portfolio purposes**.
