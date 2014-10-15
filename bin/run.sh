#!/bin/sh
# dpw@alameda.local
# 2014.09.11
#

[ -d build ] || {
    make build
}

cd build
http-server -p 3001

