# College Club Event Management Website

A decoupled full-stack event management system with a modern frontend, REST API backend, event management, student registration, and admin dashboard.

## Architecture

- **Backend**: Node.js + Express REST API (using pure JavaScript ES modules).
- **Frontend**: React + Vite SPA (using plain JavaScript/JSX and Tailwind CSS).
- **Database**: SQLite (managed via Prisma).

## Project Structure

- `/backend`: The standalone backend API
- `/frontend`: The standalone React application
- `/docs`: Contains API contracts (API.md)

## Requirements

- Node.js >= 22

## Setup

1. **Install dependencies**
   In the root directory, run:
   ```sh
   npm install
   ```
   This will install dependencies for both the frontend and backend workspaces.

2. **Backend Environment Variables**
   Create a `.env` file in the `/backend` directory:
   ```env
   PORT=5000
   DATABASE_URL="file:./dev.db"
   JWT_SECRET="<YOUR_SECRET_JWT_KEY>"
   ADMIN_EMAIL="<YOUR_ADMIN_EMAIL>"
   ADMIN_PASSWORD="<YOUR_ADMIN_PASSWORD>"
   CORS_ORIGIN="http://localhost:5173"
   ```

3. **Frontend Environment Variables**
   Create a `.env` file in the `/frontend` directory:
   ```env
   VITE_API_URL="http://localhost:5000/api"
   ```

4. **Initialize the Database**
   Run the following commands in the `/backend` directory:
   ```sh
   npm run generate
   npm run db:push
   npm run db:seed
   ```
   This will generate the Prisma client, push the schema to the SQLite database, and seed it with initial event data.

## Running the Application

To run both the backend and frontend concurrently from the root directory:

```sh
npm run dev
```

- The frontend will be available at `http://localhost:5173`
- The backend API will be running on `http://localhost:5000`

## Admin Credentials

- **Email**: Set via `ADMIN_EMAIL` in `.env`
- **Password**: Set via `ADMIN_PASSWORD` in `.env`

> **Note**: For security, no default credentials are provided. You must configure these environment variables before starting the backend.
