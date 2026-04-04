cmake_minimum_required(VERSION 3.18)
project(NANOMATCH)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Find pybind11 (Requires: pip install pybind11)
execute_process(COMMAND python -m pybind11 --cmakedir OUTPUT_VARIABLE pybind11_DIR OUTPUT_STRIP_TRAILING_WHITESPACE)
find_package(pybind11 REQUIRED)

# Build the C++ extension
pybind11_add_module(nanomatch_engine src/bridge/bindings.cpp)

# Include directories
target_include_directories(nanomatch_engine PRIVATE src/engine)