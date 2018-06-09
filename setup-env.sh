#!/bin/sh -x

cp $1/.eslintrc.json $2/.eslintrc.json
cp $1/tasks.json $2/tasks.json
cp $1/tsconfig.json $2/tsconfig.json
cp $1/launch.json $2/launch.json

cp -r $1/.vscode $2/.vscode

