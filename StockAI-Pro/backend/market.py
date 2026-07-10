from models import MarketSnapshot


def get_market_snapshot() -> MarketSnapshot:
    return MarketSnapshot(
        symbol="AAPL",
        price=195.42,
        change_percent=1.24,
        volume=53200000,
    )
