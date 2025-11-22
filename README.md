# News Feed Application

A full-stack application with a React frontend and Node.js/Express backend featuring user authentication, JWT tokens, and news feed functionality.

## Tech Stack

### Frontend
- React 18.2 with Vite 5.0
- Context API for state management
- Runs on port **3010**

### Backend
- Node.js with Express 5.1
- MySQL database
- JWT authentication with refresh tokens
- Bcrypt password hashing
- Runs on port **3000**

## Prerequisites

Before running this application, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **MySQL** (v8.0 or higher) - [Download](https://dev.mysql.com/downloads/mysql/)

## Project Structure

```
task/
├── backend/          # Node.js/Express API server
│   ├── src/
│   ├── index.js
│   ├── package.json
│   └── .env
├── frontend/         # React Vite application
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
└── README.md         # This file
```

## Installation & Setup

### 1. Database Setup

Start your MySQL server and create the database:

```sql
CREATE DATABASE auth_db;
```

The application will automatically create the necessary tables when the backend starts.

### 2. Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Configure environment variables by editing the `.env` file:

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root
DB_NAME=auth_db
JWT_SECRET=your_jwt_secret_key_change_this
JWT_REFRESH_SECRET=your_jwt_refresh_secret_key_change_this
```

**Important**: Change the `JWT_SECRET` and `JWT_REFRESH_SECRET` to secure random strings in production.

### 3. Frontend Setup

Navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

## Running the Application

### Option 1: Run Both Services Separately

**Terminal 1 - Start the Backend:**

```bash
cd backend
npm start
```

For development with auto-reload:

```bash
npm run dev
```

The backend will start on `http://localhost:3000`

**Terminal 2 - Start the Frontend:**

```bash
cd frontend
npm start
```

Or use the dev command:

```bash
npm run dev
```

The frontend will start on `http://localhost:3010`

### Option 2: Quick Start (Using Two Terminals)

From the project root:

**Terminal 1:**
```bash
cd backend && npm start
```

**Terminal 2:**
```bash
cd frontend && npm start
```

## Backend API Endpoints

Once the backend is running, the following endpoints are available:

- `POST /register` - Register a new user
- `POST /login` - Login and receive access/refresh tokens
- `POST /refresh-token` - Get a new access token using refresh token
- `GET /profile` - Get user profile (protected route, requires JWT)
- `GET /` - Health check endpoint

## Environment Variables

### Backend (.env)

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Backend server port | 3000 |
| `DB_HOST` | MySQL host | localhost |
| `DB_USER` | MySQL username | root |
| `DB_PASSWORD` | MySQL password | root |
| `DB_NAME` | Database name | auth_db |
| `JWT_SECRET` | Secret key for access tokens | (must change) |
| `JWT_REFRESH_SECRET` | Secret key for refresh tokens | (must change) |

## Available Scripts

### Backend

- `npm start` - Start the backend server
- `npm run dev` - Start with nodemon (auto-reload on changes)
- `npm test` - Run tests (not yet configured)

### Frontend

- `npm start` - Start development server on port 3010
- `npm run dev` - Start development server (alias)
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Troubleshooting

### Backend won't start

1. Ensure MySQL is running:
   ```bash
   # Windows
   net start MySQL80

   # Mac/Linux
   sudo service mysql start
   ```

2. Verify database credentials in `.env` file
3. Check if port 3000 is already in use

### Frontend won't start

1. Check if port 3010 is already in use
2. Ensure all dependencies are installed: `npm install`
3. Clear node_modules and reinstall:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

### Connection errors

1. Ensure backend is running before starting frontend
2. Check that backend is accessible at `http://localhost:3000`
3. Verify CORS is enabled in backend

## Security Notes

- The `.env` file contains sensitive information and should never be committed to version control
- Change default JWT secrets before deploying to production
- Update MySQL password from default values
- Enable HTTPS in production environments

## Development Workflow

1. Start MySQL server
2. Start backend server (`cd backend && npm run dev`)
3. Start frontend development server (`cd frontend && npm start`)
4. Open browser to `http://localhost:3010`
5. Backend API is available at `http://localhost:3000`

## Production Deployment

### Backend

1. Set environment variables on your hosting platform
2. Ensure MySQL database is accessible
3. Run `npm start` or use a process manager like PM2

### Frontend

1. Build the production bundle:
   ```bash
   cd frontend
   npm run build
   ```

2. Deploy the `dist` folder to your hosting service (Netlify, Vercel, etc.)
3. Configure API endpoint to point to production backend URL

## Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [MySQL Documentation](https://dev.mysql.com/doc/)

## License

MIT
