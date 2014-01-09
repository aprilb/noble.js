BIN = ./node_modules/.bin
COMPONENT = $(BIN)/component
ASSETS = $(BIN)/component-assets
TEST = $(BIN)/component-test
COVERJS = $(BIN)/coverjs
JSHINT = $(BIN)/jshint

TEST_MODE := browser
COMPONENT_DEV ?= --dev

LIB = lib/**/*.js
LIBCOV = lib-cov/**/*.js

PORT ?= 3000
PID := server.pid

SRC = index.js $(wildcard lib/*.js)

all: build

deps: | node_modules components

node_modules: package.json
	npm install

components: component.json | node_modules
	$(COMPONENT) install $(COMPONENT_DEV)

build: $(SRC) | node_modules components
	$(COMPONENT) build $(COMPONENT_DEV)

lib: | node_modules
	$(ASSETS) scripts:index.js,$(strip $(LIB))

lib-cov: $(wildcard $(LIB)) | node_modules
	$(COVERJS) --output $@ --recursive lib/*
	$(ASSETS) scripts:index.js,$(strip $(LIBCOV))

lint:
	$(JSHINT)

clean: clean-build clean-cov

clean-all: clean clean-deps clean-cov

clean-deps:
	rm -rf components/ node_modules/

clean-build:
	rm -rf build/

clean-cov:
	rm -rf lib-cov/

test: deps
	$(TEST) $(TEST_MODE)

.PHONY: all deps lib lib-cov lint clean clean-all clean-deps clean-build test
