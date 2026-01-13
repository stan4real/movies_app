# 🎬 Movies App

**Movies App** is a modern web application for searching and discovering movies, built with **React**, **TypeScript**, **Vite**, **TailwindCSS**, and **Appwrite**.  
This project demonstrates strong skills in third-party API integration, frontend performance optimization, and backend-driven analytics.

## 🚀 Features

- 🔍 **Movie Search with Debounce**  
  Real-time movie search powered by the **TMDb API**.  
  A debounced input (500ms) is used to reduce unnecessary network requests and improve performance and user experience.

- 📊 **Trending Movies Based on Real User Demand**  
  The app uses **Appwrite** as a custom backend database to store and track how often users search for the same queries.  
  Based on this data, the application dynamically builds a **Top 5 Trending Movies** list, reflecting real user interest rather than static popularity.

- 🎨 **Modern & Responsive UI**  
  Styled with **TailwindCSS**, using `@apply` and `@layer` for clean, maintainable, and scalable styling architecture.

- ⚡ **Modern Tech Stack**
  - **React + TypeScript** — scalable and type-safe UI development  
  - **Vite** — fast development server and optimized build  
  - **Appwrite** — backend-as-a-service for data storage and analytics  
  - **TMDb API** — movie data provider  

## 🧠 Technical Implementation

1. **Debounced Search Logic**  
   User input is debounced before triggering API requests, ensuring efficient data fetching and reduced API load.

2. **Search Analytics with Appwrite**  
   - Each unique search query is stored in the database.
   - If the query already exists, its search count is incremented.
   - If it does not exist, a new record is created with movie metadata.

3. **Trending Movies Algorithm**  
   Movies are sorted by the number of search queries and the top 5 results are displayed as **Trending Movies**, highlighting actual user demand.

## 🛠️ Tech Stack

- React
- TypeScript
- Vite
- TailwindCSS
- Appwrite
- TMDb API

## ▶️ Getting Started

1. Clone the repository:
```bash
git clone https://github.com/stan4real/movies-app.git   
cd movies-app
```

2. Install dependencies:
```bash
npm install 
```

3. Create a .env file and add:

```env
VITE_TMDB_API_KEY=your_tmdb_api_key
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_COLLECTION_ID=your_collection_id
```

4. Run the project:

```bash
npm run dev
```

## 🌟 Outcome

Fast and optimized movie search experience
Real-time trending movies based on user behavior
Clean, scalable, and production-ready codebase
