#Second-Brain:AI-Powered Platform 🧠

**Second-Brain** is a high-performance MERN stack application designed to solve content overload. It allows users to curate, organize, and instantly summarize digital content from YouTube and Twitter using Generative AI.

---

## 🚀 Technical Highlights
- **AI-Driven Insights**: Integrated **Google Gemini 2.5 Flash** to provide automated 2-sentence summaries of saved content.
- **Smart Search**: Engineered a real-time, client-side filtering engine for **sub-10ms search latency**.
- **Secure Sharing**: Developed a "Capability-URL" system using **20-character unique hashes** for public read-only access.
- **Stateless Auth**: Robust user security implemented via **JWT (JSON Web Tokens)** with custom middleware for route protection.

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React 18, TypeScript, Tailwind CSS, Vite |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (Mongoose ODM) |
| **AI Engine** | Google Generative AI (Gemini SDK) |
| **Language** | TypeScript (Strict Type Safety) |



---

## 📐 System Architecture

### 1. The AI Pipeline
The backend acts as a proxy to the Gemini API, ensuring API Keys remain secure. We use **Gemini 2.5 Flash** for its optimal balance of speed and cost-efficiency for text summarization tasks.



### 2. Search Optimization
Instead of hitting the database for every keystroke, Aurix utilizes **State-Based Filtering**. 
- **Time Complexity**: $O(N)$ client-side lookup.
- **User Experience**: Zero-latency UI updates as the user types.

---

## 📂 Project Structure

```text
Brainly_Project/
├── backend/            # Express API & AI Logic
│   ├── src/
│   │   ├── db.ts       # Mongoose Schemas
│   │   ├── gemini.ts   # AI Integration logic
│   │   └── index.ts    # REST Endpoints
│   └── .env.example    # Env template
├── frontend/           # React + Vite Client
│   ├── src/
│   │   ├── components/ # Reusable UI (Atomic Design)
│   │   └── pages/      # Dashboard & Share Pages
└── README.md           # Professional Documentation

---

## ⚙️ Setup & Installation

### 1. Clone the repository
```bash
git clone https://github.com/ShaikRiazUrRahman05/Second-Brain.git
cd Second-Brain
```


### 2. Configure Backend

```bash
cd backend
npm install

# Create a .env file in the backend folder and add:
```bash
# MONGO_URL=your_mongodb_uri
# JWT_PASSWORD=your_secret
# GEMINI_API_KEY=your_google_ai_key

npm run dev
```

### 3. Configure Frontend

```bash
cd frontend
npm install
npm run dev
```


