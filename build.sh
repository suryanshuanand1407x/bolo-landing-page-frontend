#!/bin/bash

# Navigate to the frontend directory
cd "$(dirname "$0")"

# Install dependencies
npm install

# Build the project
npm run build