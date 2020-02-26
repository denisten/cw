#!/bin/sh
# substitute env varbiables and etc.

PROJECT_DIR=$(pwd)
ENV_FILE=.env
ENV_SOURCE_FILE="${ENV_FILE}.example"
if ! test -f "$ENV_FILE"; then
  # shellcheck disable=SC1090
  . "$PROJECT_DIR/$ENV_SOURCE_FILE"

  eval "echo \"$(sed 's/"/\\"/g' $ENV_SOURCE_FILE)\"" > "$PROJECT_DIR/$ENV_FILE"
fi


