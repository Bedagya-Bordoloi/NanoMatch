import pandas as pd
import os

def prepare_binance_data(input_path, output_path):
    print(f"Reading {input_path}...")
    # Binance aggTrades columns: agg_trade_id, price, qty, first_id, last_id, timestamp, is_buyer_maker, is_best_match
    df = pd.read_csv(input_path, names=['id', 'price', 'qty', 'f', 'l', 'ts', 'is_buyer_maker', 'm'])
    
    # We only need: price, qty, is_buy, ts
    # In Binance data, is_buyer_maker=True means it was a SELL order hitting the bid.
    new_df = pd.DataFrame({
        'price': df['price'],
        'qty': df['qty'],
        'is_buy': ~df['is_buyer_maker'], 
        'ts': df['ts']
    })
    
    new_df.to_csv(output_path, index=False)
    print(f"✅ Processed data saved to {output_path}")

if __name__ == "__main__":
    if os.path.exists("data/binance_raw.csv"):
        prepare_binance_data("data/binance_raw.csv", "data/binance_btc_usdt.csv")
    else:
        print("❌ Error: data/binance_raw.csv not found!")