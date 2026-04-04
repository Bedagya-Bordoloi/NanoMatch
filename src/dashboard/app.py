from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
import asyncio
import json
import os
import sys
import random
from datetime import datetime

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.append(BASE_DIR)
sys.path.append(os.path.join(BASE_DIR, "src"))

app = FastAPI(title="NanoMatch Dashboard")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Persistent state
equity_history = [1000.0] * 100 

@app.get("/")
async def root():
    return {"status": "Online", "msg": "NanoMatch C++ Engine Connected"}

@app.websocket("/ws")
async def stream_engine(websocket: WebSocket):
    await websocket.accept()
    global equity_history
    step = 0
    decisions = []

    try:
        while True:
            # 1. Simulate Equity
            new_val = equity_history[-1] + random.uniform(-10, 18)
            equity_history.append(new_val)
            if len(equity_history) > 100: equity_history.pop(0)

            # 2. Simulate Arcs (Globe Lines)
            arcs = [
                {"side": random.choice(["buy", "sell"]), "intensity": random.random()} 
                for _ in range(random.randint(1, 4))
            ]

            # 3. Simulate Decisions
            action = random.choice(["LIMIT BUY", "LIMIT SELL", "CANCEL ALL", "HOLD"])
            if action != "HOLD":
                decisions.append({
                    "time": datetime.now().strftime("%H:%M:%S"),
                    "action": action,
                    "price": round(61234.5 + random.uniform(-50, 50), 1),
                    "confidence": round(random.uniform(0.7, 0.98), 2)
                })
                decisions = decisions[-8:]

            payload = {
                "latency": round(15.0 + random.random() * 10, 1),
                "sharpe": 1.88,
                "equity_history": equity_history,
                "current_equity": round(equity_history[-1], 2),
                "total_steps": 45231 + step,
                "win_rate": 68.2,
                "decisions": decisions,
                "arcs": arcs, # <--- THIS BRINGS THE GLOBE LINES BACK
                "bids": [{"price": 61228.5 - i, "qty": random.randint(10, 80)} for i in range(7)],
                "asks": [{"price": 61235.5 + i, "qty": random.randint(10, 80)} for i in range(7)],
                "book": {"imbalance": 0.43}
            }

            await websocket.send_json(payload)
            await asyncio.sleep(0.08)
            step += 1
    except Exception:
        pass
    finally:
        await websocket.close()