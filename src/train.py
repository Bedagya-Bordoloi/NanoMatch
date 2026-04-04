import pandas as pd
import os
from stable_baselines3 import PPO
from gym_env.nanomatch_env import NanoMatchEnv # <--- MATCH THIS

DATA_PATH = "data/binance_btc_usdt.csv"

if not os.path.exists(DATA_PATH):
    print(f"❌ Error: {DATA_PATH} not found!")
    exit()

print("Loading Real Binance Data...")
df = pd.read_csv(DATA_PATH)
df.columns = df.columns.str.strip() # Clean column names
df = df.head(100000) 

env = NanoMatchEnv(df)
print("Starting Training on Real Data...")

model = PPO("MlpPolicy", env, verbose=1, tensorboard_log="./logs/")
model.learn(total_timesteps=50000) 

if not os.path.exists("models"): os.makedirs("models")
model.save("models/nanomatch_ppo")
print("✅ SUCCESS: Model saved to models/nanomatch_ppo.zip")