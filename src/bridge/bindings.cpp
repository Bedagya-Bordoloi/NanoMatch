#include <pybind11/pybind11.h>
#include <pybind11/stl.h>
#include "../engine/Engine.hpp"

namespace py = pybind11;

PYBIND11_MODULE(nanomatch_engine, m) {
    py::class_<AgentState>(m, "AgentState")
        .def_readwrite("pnl", &AgentState::pnl)
        .def_readwrite("inventory", &AgentState::inventory)
        .def_readwrite("last_action_prob", &AgentState::last_action_prob)
        .def_readwrite("last_action", &AgentState::last_action);

    py::class_<MarketSnapshot>(m, "MarketSnapshot")
        .def_readwrite("bids", &MarketSnapshot::bids)
        .def_readwrite("asks", &MarketSnapshot::asks)
        .def_readwrite("agent", &MarketSnapshot::agent);

    py::class_<NanoMatchEngine>(m, "Engine")
        .def(py::init<>())
        .def("on_market_data", &NanoMatchEngine::on_market_data)
        .def("tap_action", &NanoMatchEngine::tap_action)
        .def("get_snapshot", &NanoMatchEngine::get_snapshot);
}