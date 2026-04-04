#pragma once
#include "OrderBook.hpp"
#include <deque>

class Matcher {
public:
    const uint64_t LATENCY_NS = 50000; // 50 microseconds
    std::deque<Order> pending_orders;

    void queue_order(double p, int64_t q, bool side, uint64_t ts) {
        pending_orders.push_back({p, q, side, ts + LATENCY_NS});
    }

    void process(uint64_t current_ts, OrderBook& book, double& pnl, int64_t& inv) {
        while (!pending_orders.empty() && pending_orders.front().timestamp <= current_ts) {
            Order o = pending_orders.front();
            pending_orders.pop_front();

            if (o.is_buy) {
                if (!book.asks.empty() && o.price >= book.asks.begin()->first) {
                    double fill_p = book.asks.begin()->first;
                    inv += o.qty;
                    pnl -= (o.qty * fill_p);
                }
            } else {
                if (!book.bids.empty() && o.price <= book.bids.begin()->first) {
                    double fill_p = book.bids.begin()->first;
                    inv -= o.qty;
                    pnl += (o.qty * fill_p);
                }
            }
        }
    }
};