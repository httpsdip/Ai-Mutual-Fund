from pydantic import BaseModel


class HealthResponse(BaseModel):
    status: str
    service: str


class MarketSnapshot(BaseModel):
    symbol: str
    price: float
    change_percent: float
    volume: int


class SignalResponse(BaseModel):
    symbol: str
    signal: str
    confidence: float
