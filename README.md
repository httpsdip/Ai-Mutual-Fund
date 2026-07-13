# StockAI-Pro

A simple AI-powered stock dashboard starter with:

- Frontend pages for home and dashboard
- FastAPI backend service
- Market and AI signal endpoints
- WebSocket market streaming support

## Structure

- frontend/index.html
- frontend/dashboard.html
- frontend/css/style.css
- frontend/js/app.js
- backend/main.py
- backend/database.py
- backend/models.py
- backend/market.py
- backend/ai.py
- backend/websocket.py
- backend/requirements.txt

## Run the backend

```bash
cd backend
pip install -r requirements.txt
python main.py
```

The API will be available at:

- http://localhost:8000/health
- http://localhost:8000/market
- http://localhost:8000/signals

## Open the frontend

Open the files in the frontend folder directly in a browser, or serve them with any static server.
