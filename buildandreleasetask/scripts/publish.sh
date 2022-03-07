#!/bin/bash

if [ -z "$1" ]; then
  echo "[!] No Personal Access Token supplied, exiting..."
  exit 1
fi 

PAT=$1
SCRIPT_PATH="$( cd -- "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"
ORIGINAL_WORKING_DIRECTORY=$(pwd)

cd "$SCRIPT_PATH" && cd ../..

tfx extension publish --publisher AdrianSoomro --manifests vss-extension.json -t $PAT

rm *.vsix

cd "$ORIGINAL_WORKING_DIRECTORY"