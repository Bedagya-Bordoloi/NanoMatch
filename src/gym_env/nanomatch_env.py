import gymnasium as gym
from gymnasium import spaces
import numpy as np
import nanomatch_engine

class NanoMatchEnv(gym.Env):
    def __init__(self, df):
        super(NanoMatchEnv, self).__init__()
        self.engine = nanomatch_engine.Engine()
        self.df = df
        self.current_step = 0
        
        # 0: Hold, 1: Buy, 2: Sell
        self.action_space = spaces.Discrete(3)
        
        # Observation: 10 Bids + 10 Asks + PnL + Inventory = 22
        self.observation_space = spaces.Box(low=-np.inf, high=np.inf, shape=(22,), dtype=np.float32)

    def step(self, action):
        row = self.df.iloc[self.current_step]
        
        # Ensure data types are correct for C++
        p = float(row['price'])
        q = float(row['qty'])
        side = str(row['is_buy']).lower() == 'true'
        ts = int(row['ts'])

        self.engine.on_market_data(p, q, side, ts)
        
        if action > 0:
            self.engine.tap_action(int(action), p)

        snap = self.engine.get_snapshot()
        
        # Padding
        b_pad = snap.bids + [0.0] * (10 - len(snap.bids))
        a_pad = snap.asks + [0.0] * (10 - len(snap.asks))
        
        obs = np.array(b_pad + a_pad + [snap.agent.pnl, float(snap.agent.inventory)], dtype=np.float32)
        
        # Reward: Profit - Risk Penalty
        reward = snap.agent.pnl - (abs(snap.agent.inventory) * 0.01)
        
        self.current_step += 1
        done = self.current_step >= len(self.df) - 1
        return obs, reward, done, False, {}

    def reset(self, seed=None, options=None):
        super().reset(seed=seed)
        self.engine = nanomatch_engine.Engine()
        self.current_step = 0
        return np.zeros(22, dtype=np.float32), {}