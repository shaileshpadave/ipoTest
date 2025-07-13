# IPO Full-Stack Application

## 🚀 Quick Start

### 1. Start Backend (Django)
```bash
# Start Django server
python manage.py runserver
```
Backend runs at: **http://localhost:8000**

### 2. Start Frontend (React)
```bash
# Start React development server
npm start
```
Frontend runs at: **http://localhost:3000**

## ✅ What's Connected

✅ **Backend APIs** - All IPO data from PostgreSQL database
✅ **Frontend UI** - Real-time data from backend (no more dummy JSON)
✅ **Search & Filters** - API-powered search and status filtering
✅ **Real-time Stats** - Live IPO counts and statistics
✅ **Error Handling** - Connection errors handled gracefully

## 🎯 Test the Integration

1. **Start both servers** (backend and frontend)
2. **Visit:** http://localhost:3000
3. **Test search** - Search for "Tech" or "Energy"
4. **Test filters** - Filter by status (upcoming, ongoing, listed)
5. **View details** - Click on any IPO card

## 📊 API Endpoints Being Used

- `GET /api/ipo/` - All IPOs with search/filter
- `GET /api/ipo/stats/` - IPO statistics
- `GET /api/ipo/upcoming/` - Upcoming IPOs only
- `GET /api/ipo/ongoing/` - Ongoing IPOs only
- `GET /api/ipo/listed/` - Listed IPOs only

## 🔧 Data Flow

1. **React Frontend** → API calls → **Django Backend** → **PostgreSQL Database**
2. **Real IPO data** from your database displays in the UI
3. **Search & filters** send API requests for instant results
4. **Error handling** shows connection issues if backend is down

## 🎉 Your Full-Stack App is Ready!

No more dummy data - everything is connected to your real backend database!
