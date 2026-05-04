# 📱 WhatsApp Web Clone - Full Stack MERN Application

A premium, high-performance WhatsApp Web clone featuring real-time messaging, glassmorphism UI, and seamless user experience. Built with the modern MERN stack and Socket.IO.

![WhatsApp Clone](https://raw.githubusercontent.com/santhoshs2004/whatsapp_clone/main/frontend/public/favicon.ico)

## ✨ Features

- **Real-time Messaging**: Instant message delivery using Socket.IO.
- **Glassmorphism UI**: Stunning, modern design with smooth animations and transitions.
- **User Authentication**: Simple and fast user onboarding.
- **Online Presence**: Real-time tracking of online/offline status.
- **Message Persistence**: All chats are securely stored in MongoDB.
- **Responsive Design**: Fully optimized for various screen sizes.
- **Auto-scroll**: Smart message scrolling for better readability.
- **Search Functionality**: Easily find users to start new conversations.

## 🚀 Tech Stack

### Frontend
- **React 18** (Vite)
- **Vanilla CSS** (Custom Premium Design)
- **Lucide React** (Icons)
- **Socket.io-client**
- **Axios**

### Backend
- **Node.js & Express**
- **MongoDB & Mongoose**
- **Socket.IO**
- **CORS**

## 🛠️ Installation & Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v16+)
- [MongoDB](https://www.mongodb.com/try/download/community) (Local or Atlas)

### 1. Clone the Repository
```bash
git clone https://github.com/santhoshs2004/whatsapp_clone.git
cd whatsapp-web-clone
```

### 2. Backend Configuration
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file from the example:
   ```bash
   cp .env.example .env
   ```
4. Update `.env` with your MongoDB URI:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/whatsapp_clone
   CLIENT_URL=http://localhost:5173
   ```
5. Start the backend server:
   ```bash
   npm run dev
   ```

### 3. Frontend Configuration
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file:
   ```bash
   cp .env.example .env
   ```
4. Verify the backend URLs in `.env`:
   ```env
   VITE_API_URL=http://localhost:5000/api
   VITE_BACKEND_URL=http://localhost:5000
   VITE_SOCKET_URL=http://localhost:5000
   ```
5. Start the frontend development server:
   ```bash
   npm run dev
   ```

## 🔐 Environment Variables

### Backend (`/backend/.env`)
| Variable | Description | Default |
| :--- | :--- | :--- |
| `PORT` | Backend server port | `5000` |
| `MONGODB_URI` | MongoDB Connection String | `mongodb://localhost:27017/whatsapp_clone` |
| `CLIENT_URL` | Frontend URL for CORS | `http://localhost:5173` |

### Frontend (`/frontend/.env`)
| Variable | Description | Value |
| :--- | :--- | :--- |
| `VITE_API_URL` | API endpoint URL | `http://localhost:5000/api` |
| `VITE_BACKEND_URL` | Backend server root | `http://localhost:5000` |
| `VITE_SOCKET_URL` | Socket server URL | `http://localhost:5000` |

## 📁 Project Structure

```txt
whatsapp-web-clone/
├── backend/            # Express server & Socket.IO
│   ├── src/
│   │   ├── config/     # DB connection
│   │   ├── controllers/# Business logic
│   │   ├── models/     # Mongoose schemas
│   │   ├── routes/     # API endpoints
│   │   └── socket/     # Socket event handlers
├── frontend/           # React application
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── context/    # Global state management
│   │   ├── pages/      # View components
│   │   └── socket/     # Socket client setup
└── README.md
```

## 🤝 Contributing
Contributions are welcome! Feel free to open an issue or submit a pull request.

---
Developed by [Santhosh S](https://github.com/santhoshs2004)
