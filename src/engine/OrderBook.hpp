#pragma once
#include <map>
#include <vector>
#include <functional>
#include "types.hpp"

class OrderBook {
public:
    std::map<double, double, std::greater<double>> bids;
    std::map<double, double> asks;

    void update(double price, double qty, bool is_buy) {
        if (is_buy) {
            if (qty <= 0) bids.erase(price);
            else bids[price] = qty;
        } else {
            if (qty <= 0) asks.erase(price);
            else asks[price] = qty;
        }
    }

    void get_top_levels(int depth, std::vector<double>& b, std::vector<double>& a) {
        int i = 0;
        for (auto const& [p, q] : bids) {
            if (i++ >= depth) break;
            b.push_back(p); 
            b.push_back(q);
        }
        i = 0;
        for (auto const& [p, q] : asks) {
            if (i++ >= depth) break;
            a.push_back(p); 
            a.push_back(q);
        }
    }
};