DEFAULT:

init:
	yarn run pxt target microbit
	yarn run pxt install

start: build deploy

build:
	yarn run pxt build

deploy:
	yarn run pxt deploy

test:
	yarn run pxt test
