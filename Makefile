DEFAULT:

install: init start

start: build deploy

init:
	yarn run pxt target microbit
	yarn run pxt install

build:
	yarn run pxt build

deploy:
	yarn run pxt deploy

test:
	yarn run pxt test
