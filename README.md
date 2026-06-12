<h1 align="center">TypeIt — Modern Real-Time Typing Platform</h1>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" />
  <img src="https://img.shields.io/badge/Realtime-Multiplayer-success?style=for-the-badge" />
</p>

<p align="center">
  <b>A modern MonkeyType-inspired typing platform engineered for speed, real-time competition, and clean developer architecture.</b>
</p>

---

# Features

* ⚡ **Ultra-fast real-time typing engine** with 60fps auto-scrolling
* 🌍 **Multiplayer Group Play**: Create or join rooms and race friends in real-time
* 🏆 **Global Leaderboard**: Rank against others using effective WPM (accuracy factored)
* 📊 **Analytics Dashboard**: View historical data and typing performance trends
* 🎯 **Daily typing challenges** & **Code typing mode**
* 🎨 **Dynamic Theme System**: Easily swap color palettes without reloading
* 🔥 **Firebase Authentication**: Secure Google sign-in
* ☁️ **Persistent Typing History**: Scores and stats are safely saved to Firestore
* 👁️ **Focus Mode**: UI elegantly fades out when typing begins for maximum immersion
* 📚 **Long-form Typing Passages**: High-quality, realistic developer-oriented text content
* 💻 **Smart caret movement**: Live feedback for typing accuracy
* 📱 **Responsive modern UI**: Carefully crafted with Tailwind CSS

---

# Tech Stack & Architecture

Built with a scalable, separation-focused structure for maintainability and future expansion.

| Technology    | Purpose                  |
| ------------- | ------------------------ |
| **React 19**      | Frontend UI              |
| **TypeScript**    | Type safety              |
| **Vite**          | Fast development bundler |
| **Tailwind CSS**  | Styling system           |
| **Firebase Auth** | Authentication           |
| **Firestore**     | Database & leaderboard   |
| **Framer Motion** | Fluid animations         |

### 📂 Directory Structure

```bash
src/
├── components/   # Reusable UI components & Multiplayer views
├── hooks/        # Custom React hooks (useCaret, useTest, useRoom)
├── pages/        # Main application views
├── firebase/     # Firebase initialization and services
├── data/         # Mock data and typing passages
├── utils/        # Helper functions
├── types/        # TypeScript interfaces and models
└── styles/       # Global CSS and Tailwind directives
```

---

# 🗄️ Firebase Schema

The application relies on Google Cloud Firestore for data persistence. It utilizes the following main collections:

* `scores`: Individual typing test results.
  - Fields: `uid`, `name`, `photoURL`, `wpm`, `accuracy`, `mistakes`, `createdAt`
* `leaderboardStats`: Aggregated player performance for the global leaderboard.
  - Fields: `bestEffectiveWpm`, `bestWpm`, `avgWpm`, `avgAccuracy`, `wins`, `totalRaces`
* `rooms`: Multiplayer lobby instances.
  - Fields: `roomCode`, `hostId`, `status`, `passage`, `players`
* `raceProgress`: Real-time multiplayer synchronization.
  - Fields: `roomId`, `playerId`, `progress`, `wpm`, `status`

---

# 🚀 Getting Started (Local Development)

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/typeit.git
cd typeit
```

## 2️⃣ Install Dependencies

```bash
npm install
```

## 3️⃣ Environment Variables

Create a `.env` file in the root of the project and populate it with your Firebase project configuration. **Do not commit secret values.**

```env
VITE_FIREBASE_API_KEY="your_api_key_here"
VITE_FIREBASE_AUTH_DOMAIN="your_project_id.firebaseapp.com"
VITE_FIREBASE_PROJECT_ID="your_project_id"
VITE_FIREBASE_STORAGE_BUCKET="your_project_id.appspot.com"
VITE_FIREBASE_MESSAGING_SENDER_ID="your_sender_id"
VITE_FIREBASE_APP_ID="your_app_id"
```

## 4️⃣ Start Development Server

```bash
npm run dev
```

---

# ☁️ Deployment (Vercel)

TypeIt is fully optimized for deployment on Vercel.

1. Push your code to a GitHub repository.
2. Log into [Vercel](https://vercel.com/) and click **Add New Project**.
3. Import your GitHub repository.
4. Expand **Environment Variables** and add your `VITE_FIREBASE_*` keys.
5. Ensure the Build Command is `npm run build` and Output Directory is `dist`.
6. Click **Deploy**. Your typing app will be live globally in seconds!

---

# 🔥 Future Roadmap

* 👥 Friends & profile system
* 🌐 Global multiplayer matchmaking queue
* 📊 Advanced performance graphs and heatmaps
* 🏅 Achievement and badge system
* 📱 Mobile app version (React Native / Capacitor)

---

# 🎯 Vision

TypeIt is designed to become more than just a typing website —
it's a competitive, social, and performance-focused typing ecosystem built with modern engineering principles.

---

# 🤝 Contributing

Contributions, ideas, and feedback are always welcome.

```bash
Fork → Build → Improve → Pull Request 🚀
```

---

# 📜 License

This project is licensed under the MIT License.

---

<p align="center">
  Built by Kowsh with ❤️ (Huge). So wanting for colaborative projects? I'm On....
</p>
