BIN = ./node_modules/.bin
COMPONENT = $(BIN)/component
SERVE = $(BIN)/component-serve
SOURCE = $(BIN)/component-source
JSHINT = $(BIN)/jshint

COMPONENT_DEV ?= --dev
PORT ?= 3000
SRC = $(SOURCE)


all: build

deps: node_modules components

node_modules: package.json
	npm install

components: component.json node_modules
	$(COMPONENT) install $(COMPONENT_DEV)

build: $(SRC) | node_modules
	$(COMPONENT) build $(COMPONENT_DEV)

server: components
	$(SERVE) --port $(PORT)

lint:
	$(JSHINT)

clean:
	rm -rf build/

clean-all: clean clean-deps

clean-deps:
	rm -rf components/ node_modules/

test: server


.PHONY: all deps lint clean clean-all clean-deps test
