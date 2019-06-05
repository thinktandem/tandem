#!/bin/bash

# A nice pink hyperdrive
print_setup() {
  echo -ne "\033[35m"
  cat << "EOF"
      _      _    __                    _              _
 _ __| |__ _| |_ / _|___ _ _ _ __    __| |_    ___ ___| |_ _  _ _ __
| '_ \ / _` |  _|  _/ _ \ '_| '  \ _(_-< ' \  (_-</ -_)  _| || | '_ \
| .__/_\__,_|\__|_| \___/_| |_|_|_(_)__/_||_| /__/\___|\__|\_,_| .__/
|_|                                                            |_|

EOF
  echo -ne "\033[39m"
}

# Echos default green message
status_good() {
  MESSAGE=${1:-done!}
  echo -e "\033[32m$MESSAGE\033[39m"
}

# Echos default yellow message
status_warn() {
  MESSAGE=${1:-done!}
  echo -e "\033[33m$MESSAGE\033[39m"
}

# Echos default red message
status_bad() {
  MESSAGE=${1:-done!}
  echo -e "\033[91m$MESSAGE\033[39m"
}

# Basic error handler
error() {
  MESSAGE=${1:-Something bad happened!}
  CODE=${2:-1}
  status_bad "$MESSAGE"
  echo ""
  exit $CODE
}
