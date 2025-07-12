# IPO Web Application - BlueStock

## Features

### Component #1: Upcoming IPO Web Page (Public Interface)
-  **IPO Listings**: Clean card-based layout showing company information
-  **Search & Filter**: Real-time search by company name, filter by status and sector
-  **Responsive Design**: Optimized for mobile, tablet, and desktop
-  **IPO Details**: Detailed modal view with pricing, dates, and documents
-  **Status Indicators**: Visual status badges (Upcoming, Ongoing, Closed, Listed)
-  **Statistics Dashboard**: Overview of IPO distribution by status

## Tech Stack

- **Frontend**: ReactJS 18.2.0
- **Styling**: TailwindCSS 3.1.6
- **Routing**: React Router DOM 6.3.0
- **Icons**: Heroicons (via SVG)
- **Fonts**: Inter (Google Fonts)

## Project Structure

```
src/
├── components/
│   ├── common/          # Reusable UI components
│   │   ├── Button.js
│   │   ├── Card.js
│   │   ├── Header.js
│   │   ├── LoadingSpinner.js
│   │   └── StatusBadge.js
│   └── ipo/            # IPO-specific components
│       ├── IPOCard.js
│       ├── IPODetailModal.js
│       ├── IPOGrid.js
│       ├── IPOStats.js
│       └── SearchFilter.js
├── data/               # Static JSON data
│   └── ipoData.json
├── hooks/              # Custom React hooks
│   └── useIPOData.js
├── pages/              # Main page components
│   └── HomePage.js
├── App.js
├── index.js
└── index.css
```

## Installation & Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm start
   ```

3. **Open Browser**
   Navigate to `http://localhost:3000`

## Available Scripts

- `npm start` - Run development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

## Responsive Breakpoints

- **Mobile**: < 768px (Single column layout)
- **Tablet**: 768px - 1024px (Two column layout)
- **Desktop**: > 1024px (Three column layout)

## Future Enhancements

- Backend API integration
- User authentication
- Real-time data updates
- Advanced filtering options
- IPO application workflow
- Admin dashboard (Component #2)
