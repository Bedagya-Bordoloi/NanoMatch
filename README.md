This is the **final, highly professional README.md** for **NANOMATCH**. It is designed to match the exact visual state of your dashboard and the technical depth of your high-performance architecture.

***

# ⚡ NANOMATCH
### High-Frequency Reinforcement Learning Trading Sandbox
**NANOMATCH** is an institutional-grade simulation environment built to solve the **Simulation-to-Reality Gap** in algorithmic trading. By combining a deterministic **C++20 matching engine** with **Agentic AI**, NANOMATCH allows for the stress-testing of Reinforcement Learning strategies against real-world market physics, including microsecond-level network latency and queue position variance.

![WhatsApp Image 2026-04-09 at 6 29 01 PM](https://github.com/user-attachments/assets/94388995-ea18-4c8c-8c70-4c687dd3aa13)


---

## 🚀 The "Sim-to-Real" Philosophy
Most trading simulators operate in a vacuum, assuming "perfect physics" (instant fills, zero fees, and priority execution). **NANOMATCH** treats the exchange as a physical system:
*   **The Referee (C++ Engine):** A deterministic, event-driven matcher capable of processing **1.2M+ messages/second**.
*   **The Physics (Latency Queue):** Models the **18µs - 500µs wire latency** using a sliding-window buffer.
*   **The Queue (Variance Logic):** Simulates **FIFO queue position variance**, where high market congestion can lead to "Queue Timeouts" even if the price is touched.
*   **The Brain (RL Agent):** A PPO-based agent trained on **Binance L2 Tick Data** that learns to provide liquidity while managing inventory risk.

---

## ✨ Key Features
*   **High-Performance Core:** C++20 engine with cache-friendly data structures and $O(\log N)$ order-book depth management.
*   **Zero-Copy Bridge:** Integrated with **PyTorch** via **Pybind11**, mapping C++ memory directly to the RL training loop for 95% faster iterations.
*   **Real-time Observability:** A high-concurrency **React 19 dashboard** using **HTML5 Canvas** and **uPlot** to stream engine state at **60 FPS** via WebSockets.
*   **Physics Configurator:** Live sliders to override Network Latency, Fee Rates, and Queue Variance in real-time without restarting the simulation.
*   **Turbo Mode:** A high-speed toggle that bypasses UI-friendly throttling to showcase true backend throughput.

---

## 🛠 Tech Stack
| Layer | Technologies |
| :--- | :--- |
| **Systems Engine** | C++20, CMake, NMake, x64 Native Compiler |
| **AI / Machine Learning** | Python 3.13, PyTorch, Stable-Baselines3 (PPO), Gymnasium |
| **Interoperability** | Pybind11 (Direct Memory Mapping) |
| **Backend API** | FastAPI, Asynchronous WebSockets (Port 8001) |
| **Frontend UI** | React 19, Tailwind CSS, uPlot (Canvas), Framer Motion, Lucide |

---

## 📂 File Directory
```text
NanoMatch/
├── src/
│   ├── bridge/
│   │   └── bindings.cpp        # Pybind11 glue code
│   ├── dashboard/
│   │   └── app.py              # FastAPI WebSocket server & Physics logic
│   ├── engine/
│   │   ├── Engine.hpp          # 1.2M msg/s Simulator Core
│   │   ├── LatencyQueue.hpp    # 20μs Wire Simulation
│   │   ├── Matcher.hpp         # Price-Time matching logic
│   │   ├── OrderBook.hpp       # L2 Limit Order Book
│   │   └── types.hpp           # High-speed data structs
│   ├── gym_env/
│   │   └── nanomatch_env.py    # OpenAI Gym wrapper for C++ Engine
│   └── train.py                # PPO Training script
├── ui/                         # React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── controls/       # Start/Pause/Turbo/Reset
│   │   │   ├── globe/          # WorldGlobe & Latency Arcs
│   │   │   └── panels/         # PriceLadder, EquityCurve, DecisionTable
│   │   ├── hooks/              # useWebSocketSnapshot.ts
│   │   └── App.tsx             # Main Grid Layout
├── data/
│   └── binance_btc_usdt.csv    # Preprocessed Binance L2 data
├── models/
│   └── nanomatch_ppo.zip       # Trained RL model
├── CMakeLists.txt              # C++ Build config
└── requirements.txt            # Python dependencies
```

---

## 📦 Installation & Setup

### 1. Build the C++ Engine
Open the **x64 Native Tools Command Prompt for VS** and run:
```cmd
mkdir build && cd build
cmake .. -G "NMake Makefiles"
nmake
copy nanomatch_engine*.pyd ..\
copy nanomatch_engine*.pyd ..\src\
```

### 2. Setup Python & UI
```bash
# Root directory
pip install -r requirements.txt

# UI directory
cd ui
npm install
npm run dev
```

---

## 🎮 How to Use
1.  **Simulation:** Start the backend from the root: `set PYTHONPATH=. && uvicorn src.dashboard.app:app --host 127.0.0.1 --port 8001`.
2.  **Visualization:** Open `http://localhost:5173` in your browser.
3.  **Stress Test:** 
    *   Set **Queue Position Variance** to 80% to watch the agent's win-rate collapse due to congestion.
    *   Toggle **TURBO** to see the Canvas-based Equity Curve process 300+ data points per second.
    *   Observe the **Latency Arcs** on the globe reacting to the Network Latency slider.

---

## 📈 Future Scope
*   **Market Impact Engine:** Modeling slippage where large agent orders move the L2 price levels.
*   **Live Binance Integration:** Direct production WebSocket integration for real-time paper trading.
*   **Multi-Agent Environments:** Simulating "Agent vs Agent" scenarios within the same C++ Order Book.

---

## 👤 Author
**Bedagya Bordoloi**  
*B.Tech in CSE (AI & ML) | VIT Andhra Pradesh*  
[LinkedIn](https://www.linkedin.com/in/bedagya-bordoloi-68725a2ab/) | [GitHub](https://github.com/Bedagya-Bordoloi)

---
*Note: This project is for research purposes and does not constitute financial advice.*
