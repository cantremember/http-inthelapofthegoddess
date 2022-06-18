SHELL = /bin/bash
ROOT = $(shell pwd)

NPM_DIR = $(ROOT)/node_modules
NODE_BIN = $(NPM_DIR)/.bin

HTTP_TARGET = $(ROOT)/docs


.PHONY: \
	gulp  build watch \
	server view

.DEFAULT_GOAL: build


# Build steps

gulp:
	@$(NODE_BIN)/gulp build

build:  gulp


# Watch

watch:  gulp
	@$(NODE_BIN)/gulp watch


# Viewing

# https://github.com/indexzero/http-server
#   `./node_modules/.bin/http-server --help`
#   --silent
#   -o
#
# public
#   `ngrok http 3000`

server:
	@$(NODE_BIN)/http-server $(HTTP_TARGET) -p 3000 --ext html -c-1 --utc

view:
	@open http://localhost:3000/
