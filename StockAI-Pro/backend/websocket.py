import asyncio
import json

import websockets


async def stream_market_data() -> None:
    async with websockets.connect("ws://localhost:8000/ws/market") as websocket:
        while True:
            payload = await websocket.recv()
            print(json.loads(payload))
            await asyncio.sleep(1)
