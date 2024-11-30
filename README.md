# Tasmota-Plotter

This is a small Node.js script I wrote to grab data from my Tasmota devices and save it as CSV files. It’s just a personal test project, so don’t expect anything polished or ready for ~~production~~ any use.

## What it Does
- Connects to a bunch of Tasmota devices via their API.
- Pulls data every 20 seconds (or whatever interval you set).
- Saves the data into CSV files (both daily and general logs).

## Current State
- **Test Only**: This is for my own experiments and is far from complete.
- **Data Analysis**: The logs are just stored for now — proper analysis will come later.
