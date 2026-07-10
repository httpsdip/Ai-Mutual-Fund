from models import SignalResponse


def generate_signal(symbol: str) -> SignalResponse:
    return SignalResponse(
        symbol=symbol,
        signal="Buy",
        confidence=0.87,
    )
