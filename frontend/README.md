# News Feed Application

A React-based news feed application with dynamic card views, pagination, and user feedback functionality. Built with **Vite** for fast development and optimized builds.

## Features

- **API Integration**: Fetches posts from JSONPlaceholder API (https://jsonplaceholder.typicode.com/posts)
- **Loading Screen**: Displays a loading screen for 5 seconds on startup
- **Dual View Modes**: Toggle between grid and list card layouts
- **Pagination**: Shows 6 cards per page with navigation controls
- **Card Removal**: Remove cards with automatic refill from next page
- **Direct Page Navigation**: Click on specific page numbers to navigate
- **Feedback Form**: Modal form with validation and reset on submit
- **State Management**: Uses React Context API for application state
- **Responsive Design**: Adapts to different screen sizes
- **Vite Build Tool**: Lightning-fast HMR and optimized production builds

## Tech Stack

- **React 18.2**: Modern React with hooks
- **Vite 5.0**: Next-generation frontend tooling
- **Context API**: Global state management
- **CSS3**: Custom styling with flexbox and grid

## Project Structure

```
frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── Card.jsx
│   │   ├── Card.css
│   │   ├── FeedbackModal.jsx
│   │   ├── FeedbackModal.css
│   │   ├── Loading.jsx
│   │   ├── Loading.css
│   │   ├── Pagination.jsx
│   │   ├── Pagination.css
│   │   ├── Sidebar.jsx
│   │   └── Sidebar.css
│   ├── context/
│   │   └── AppContext.js
│   ├── App.jsx
│   ├── App.css
│   ├── index.jsx
│   └── index.css
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

## Installation

Navigate to the frontend directory and install dependencies:
```bash
cd frontend
npm install
```

## Running the Application

Start the development server on port **3010**:
```bash
npm start
```

Or use the dev command:
```bash
npm run dev
```

The application will open in your browser at `http://localhost:3010`

## Available Scripts

- `npm start` - Start development server on port 3010
- `npm run dev` - Start development server (alias for start)
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## Usage

### View Toggle
- Click the toggle buttons in the sidebar to switch between grid and list views
- Grid view displays cards in a responsive grid layout
- List view displays cards in a vertical list with avatars

### Pagination
- Navigate through pages using the arrow buttons
- Click on specific page numbers to jump to that page
- Only 6 cards are displayed per page

### Removing Cards
- Click the red X button on any card to remove it
- The removed card will be replaced with a card from the next page
- Pagination automatically adjusts when cards are removed

### Feedback Form
- Click "We're Listening!" button to open the feedback modal
- All fields (Name, Email, Message) are required
- Email must be in valid format
- Form resets automatically on successful submission

## Technical Details

### State Management
The application uses React Context API to manage global state:
- Posts data
- Current page
- View mode (grid/list)
- Feedback modal visibility
- Loading state

### Components

**Loading**: Displays a spinner and "Loading..." text for 5 seconds on app startup

**Sidebar**: Contains greeting, view toggle, and feedback button

**Card**: Renders individual post cards in either grid or list format

**Pagination**: Handles page navigation with next/previous and direct page selection

**FeedbackModal**: Modal form for user feedback with validation

**App**: Main component that orchestrates all other components

## API Integration

The app fetches data from:
```
GET https://jsonplaceholder.typicode.com/posts
```

Each post is enhanced with a placeholder image from:
```
https://picsum.photos/400/300?random={index}
```

### Vite Configuration

The app is configured to run on port 3010:
```javascript
// vite.config.js
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3010,
    open: true
  }
})
```

## Build for Production

Create an optimized production build:
```bash
npm run build
```

The `dist` folder will contain the production-ready files.

Preview the production build:
```bash
npm run preview
```

## Performance

Vite provides:
- Instant server start
- Lightning-fast HMR (Hot Module Replacement)
- Optimized production builds with code splitting
- Native ESM support

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive design
- Supports ES6+ features

## License

MIT
