#!/bin/bash
npm install
#npx rollup -p @rollup/plugin-terser
npx rollup --format=es --file=../functions/api/add_todo.js -- add_todo.js
npx rollup --format=es --file=../functions/api/delete_todo.js -- delete_todo.js
npx rollup --format=es --file=../functions/api/get_todo.js -- get_todo.js
npx rollup --format=es --file=../functions/api/list_todos.js -- list_todos.js
