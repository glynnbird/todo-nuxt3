#!/bin/bash

echo "Build Functions code"
cd code
./build.sh
cd ..

echo "Build Nuxt app"
npm run build
