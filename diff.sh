#!/bin/sh -x

diff $1/.eslintrc.json $2/.eslintrc.json
diff $1/tasks.json $2/tasks.json
diff $1/tsconfig.json $2/tsconfig.json
diff $1/launch.json $2/launch.json

diff -r $1/.vscode $2/.vscode

