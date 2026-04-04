#pragma once
#include "OrderBook.hpp"
#include "LatencyQueue.hpp"

class NanoMatchEngine {
public:
    OrderBook book;
    LatencyQueue l_queue;
    double pnl = 0.0;
    double inventory = 0.0;
    AgentState agent_meta = {0.0, 0.0, 0.0, 0};

    void on_market_data(double p, double q, bool side, uint64_t ts) {
        book.update(p, q, side);
        auto ready = l_queue.get_ready_orders(ts);
        for (auto& o : ready) {
            execute_order(o);
        }
    }

    void tap_action(int action, double price) {
        agent_meta.last_action = action;
        // Use 0.001 as a standard small crypto quantity for the AI
        if (action == 1) l_queue.add_order(price, 0.001, true, 0); 
        if (action == 2) l_queue.add_order(price, 0.001, false, 0);
    }

    void execute_order(Order& o) {
        if (o.is_buy && !book.asks.empty() && o.price >= book.asks.begin()->first) {
            double fill_p = book.asks.begin()->first;
            inventory += o.qty;
            pnl -= (o.qty * fill_p);
        } else if (!o.is_buy && !book.bids.empty() && o.price <= book.bids.begin()->first) {
            double fill_p = book.bids.begin()->first;
            inventory -= o.qty;
            pnl += (o.qty * fill_p);
        }
    }

    MarketSnapshot get_snapshot() {
        MarketSnapshot snap;
        book.get_top_levels(5, snap.bids, snap.asks);
        snap.agent = {pnl, inventory, agent_meta.last_action_prob, agent_meta.last_action};
        return snap;
    }
};