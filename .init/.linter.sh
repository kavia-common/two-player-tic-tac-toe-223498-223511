#!/bin/bash
cd /home/kavia/workspace/code-generation/two-player-tic-tac-toe-223498-223511/frontend_react_js
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

