from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware

from ai import generate_signal
from database import init_db
from market import get_market_snapshot
from models import HealthResponse, MarketSnapshot, SignalResponse

app = FastAPI(title="StockAI-Pro", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def startup_event() -> None:
    init_db()


@app.get("/health", response_model=HealthResponse)
def health() -> HealthResponse:
    return HealthResponse(status="ok", service="StockAI-Pro")


@app.get("/market", response_model=MarketSnapshot)
def market() -> MarketSnapshot:
    return get_market_snapshot()


@app.get("/signals", response_model=SignalResponse)
def signals() -> SignalResponse:
    return generate_signal("AAPL")


@app.websocket("/ws/market")
async def websocket_market(websocket: WebSocket) -> None:
    await websocket.accept()
    try:
        while True:
            await websocket.send_json(get_market_snapshot().model_dump())
            await websocket.receive_text()
    except WebSocketDisconnect:
        return


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
