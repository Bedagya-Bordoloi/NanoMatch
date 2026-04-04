#pragma once
#include <vector>
#include <stdint.h>

struct Order {
    double price;
    double qty;
    bool is_buy;
    uint64_t timestamp;
};

struct Trade {
    double price;
    double qty;
    uint64_t timestamp;
    bool side;
};

struct AgentState {
    double pnl;
    double inventory;
    double last_action_prob;
    int last_action;
};

struct MarketSnapshot {
    std::vector<double> bids;
    std::vector<double> asks;
    AgentState agent;
};
// No semicolon missing here.