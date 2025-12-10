# Frontend (React)

User Interface for the Marketplace.

## Tech Stack
- React
- Vite
- TypeScript
- MUI


## Environment Setup
1. Configure the variables:
   - `VITE_API_URL`: URL of the Main API (default: `http://localhost:3001`)

## Running
```bash
npm install
npm run dev
```

## Docker
```bash
docker build -t frontend .
docker run -p 5173:5173 frontend
```

## Docker Compose
To run the entire system (Frontend + Main API + Secondary API + DB):
```bash
docker-compose up --build
```

