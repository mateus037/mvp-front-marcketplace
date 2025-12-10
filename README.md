# Frontend (React)

User Interface for the Marketplace.

## Tech Stack
- React
- Vite
- TypeScript
- MUI


## Environment Setup
1. Configure the variables:
   - `VITE_API_URL`: URL of the MVP Marketplace API (default: `http://localhost:3001`)

## Running
```bash
npm install
npm run dev
```

## Docker
```bash
docker build -t mvp-front-marcketplace .
docker run -p 5173:5173 mvp-front-marcketplace
```

## Docker Compose
To run the entire system (Frontend + MVP Marketplace API + MVP Marketplace Services + DB):
```bash
docker-compose up --build
```

