#!/bin/bash

echo "Running all tests"
python3 -m unittest discover -s core -p '*_test.py'
