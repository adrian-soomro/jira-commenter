#!/bin/bash

RED_COLOUR='\033[0;31m'
GREEN_COLOUR='\033[0;32m'
NO_COLOUR='\033[0m'

function printWithColour() {
    COLOUR="$1"
    MESSAGE="$2"
    echo -e "$COLOUR$MESSAGE$NO_COLOUR"
}

function printWithGreenColour() {
    MESSAGE="$1"
    printWithColour "$GREEN_COLOUR" "$MESSAGE"
}

function printWithRedColour() {
    MESSAGE="$1"
    printWithColour "$RED_COLOUR" "$MESSAGE"
}

function reportStateOfPreviousCommand() {
    STATUS_CODE=$?
    ON_SUCCESS_MESSAGE=$1
    ON_FAILURE_MESSAGE=$2

    if [[ "$STATUS_CODE" == '0' ]] ; then
        printWithGreenColour "$ON_SUCCESS_MESSAGE"
    else
        printWithRedColour "$ON_FAILURE_MESSAGE"
    fi
}

function cleanUp() {
    echo '[ ] cleaning up previously installed dependencies & built files'
    SCRIPT_PATH="$( cd -- "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"
    cd $SCRIPT_PATH
    rm -rf ../node_modules ../dist
    reportStateOfPreviousCommand "[✓] cleaned up" "[x] error during clean up"
}

cleanUp

echo '[ ] installing dependencies'
export NODE_ENV=production
npm i
reportStateOfPreviousCommand "[✓] installed dependencies" "[x] error installing dependencies"

echo '[ ] building the project'
npm run build
reportStateOfPreviousCommand "[✓] project built" "[x] error during build"
