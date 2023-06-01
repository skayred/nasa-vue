#!/bin/bash
npm run build
docker build -t nasa-ui:0.0.1 .
