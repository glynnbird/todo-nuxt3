#!/bin/bash
npm install
#npx rollup -p @rollup/plugin-terser
npx rollup --format=es --file=../functions/add_todo.js -- add_todo.js
npx rollup --format=es --file=../functions/delete_todo.js -- delete_todo.js
npx rollup --format=es --file=../functions/get_todo.js -- get_todo.js
npx rollup --format=es --file=../functions/list_todos.js -- list_todos.js
