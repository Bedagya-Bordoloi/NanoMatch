from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
import asyncio
import json
import random
from datetime import datetime

app = FastAPI()

# Wide-open CORS for local development stability
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- GLOBALS ---
PHYSICS_CONFIG = {"latency": 20.0, "variance": 0.15, "fee_rate": 2.0}
SYSTEM_STATE = {"is_running": True, "turbo_mode": False}
equity_history = [1000.0] * 300 

@app.get("/")
async def root():
    return {"status": "NanoMatch Online", "port": 8001}

@app.post("/control")
async def control_engine(command: dict):
    global SYSTEM_STATE, equity_history
    cmd = command.get("cmd")
    if cmd == "start": SYSTEM_STATE["is_running"] = True
    elif cmd == "pause": SYSTEM_STATE["is_running"] = False
    elif cmd == "turbo_on": SYSTEM_STATE["turbo_mode"] = True
    elif cmd == "turbo_off": SYSTEM_STATE["turbo_mode"] = False
    elif cmd == "reset": equity_history = [1000.0] * 300
    return {"status": "ok"}

@app.post("/update_physics")
async def update_physics(config: dict):
    global PHYSICS_CONFIG
    if "variance" in config: PHYSICS_CONFIG["variance"] = float(config["variance"]) / 100.0
    if "latency" in config: PHYSICS_CONFIG["latency"] = float(config["latency"])
    if "fee_rate" in config: PHYSICS_CONFIG["fee_rate"] = float(config["fee_rate"])
    return {"status": "updated"}

@app.websocket("/ws")
async def stream_engine(websocket: WebSocket):
    await websocket.accept()
    print("🚀 DASHBOARD CONNECTED TO WEBSOCKET")
    global equity_history, PHYSICS_CONFIG, SYSTEM_STATE
    step = 0
    decisions = []

    try:
        while True:
            if not SYSTEM_STATE["is_running"]:
                await asyncio.sleep(0.5)
                continue

            try:
                # 1. Trading Simulation logic
                action_type = random.choice(["LIMIT BUY", "LIMIT SELL", "HOLD"])
                if action_type != "HOLD":
                    is_filled = random.random() > PHYSICS_CONFIG["variance"]
                    if is_filled:
                        new_val = equity_history[-1] + random.uniform(-5, 15) - (PHYSICS_CONFIG["fee_rate"] * 0.05)
                        decisions.append({
                            "time": datetime.now().strftime("%H:%M:%S"),
                            "action": action_type,
                            "price": round(61234.5 + random.uniform(-10, 10), 1),
                            "confidence": round(random.uniform(0.7, 0.99), 2)
                        })
                    else:
                        new_val = equity_history[-1]
                        decisions.append({"time": datetime.now().strftime("%H:%M:%S"), "action": "QUEUE TIMEOUT", "price": 61234.5, "confidence": 0.0})
                    
                    equity_history.append(new_val)
                    if len(equity_history) > 300: equity_history.pop(0)
                    decisions = decisions[-12:]

                # 2. Prepare Payload
                payload = {
                    "latency": round(PHYSICS_CONFIG["latency"] + random.uniform(-1, 2), 1),
                    "equity_history": equity_history,
                    "current_equity": round(equity_history[-1], 2),
                    "total_steps": 45231 + step,
                    "win_rate": round(70.0 - (PHYSICS_CONFIG["variance"] * 40), 1),
                    "decisions": decisions,
                    "arcs": [{"side": random.choice(["buy", "sell"]), "intensity": random.random()} for _ in range(2)],
                    "bids": [{"price": 61228.5 - i, "qty": random.randint(10, 80)} for i in range(7)],
                    "asks": [{"price": 61235.5 + i, "qty": random.randint(10, 80)} for i in range(7)],
                    "book": {"imbalance": round(0.43 + random.uniform(-0.05, 0.05), 2)}
                }

                await websocket.send_json(payload)
                
                # Speed control
                sleep_time = 0.01 if SYSTEM_STATE["turbo_mode"] else 0.08
                await asyncio.sleep(sleep_time)
                step += 1

            except Exception as e:
                print(f"Loop error: {e}")
                await asyncio.sleep(0.1)
                
    except WebSocketDisconnect:
        print("❌ Dashboard disconnected")