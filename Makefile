
all:
	@make test

npm:
	@( npm install )

jshint:
	@( [ -d node_modules ] || make npm )
	@( gulp jshint )

test:
	@( [ -d node_modules ] || make npm )
	@( gulp test )

clean:
	@( gulp clean )

build:
	@( gulp build )

watch:
	@( gulp watch )

less:
	@( gulp less )

docs:
	@( gulp jsdoc )

deploy:
	@( NODE_ENV=production gulp clean )
	@( NODE_ENV=production gulp build )

.PHONY: deploy
.PHONY: less
.PHONY: jshint
.PHONY: npm
.PHONY: test
.PHONY: watch
.PHONY: build
.PHONY: docs
