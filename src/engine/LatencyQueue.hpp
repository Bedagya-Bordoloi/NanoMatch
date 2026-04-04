#pragma once
#include <deque>
#include <vector>
#include "types.hpp"

class LatencyQueue {
public:
    const uint64_t WIRE_LATENCY_NS = 20000; 
    std::deque<Order> queue;

    void add_order(double p, double q, bool side, uint64_t current_ts) {
        // Use explicit initialization to avoid narrowing errors
        Order o;
        o.price = p;
        o.qty = q;
        o.is_buy = side;
        o.timestamp = current_ts + WIRE_LATENCY_NS;
        queue.push_back(o);
    }

    std::vector<Order> get_ready_orders(uint64_t current_ts) {
        std::vector<Order> ready;
        while (!queue.empty() && queue.front().timestamp <= current_ts) {
            ready.push_back(queue.front());
            queue.pop_front();
        }
        return ready;
    }
};