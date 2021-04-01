# Which target to run by default (when no target is passed to make)
.DEFAULT_GOAL := help

.PHONY: format lint

help: ## Show help
	@echo "\nUsage:\n  make \033[36m<target>\033[0m\n\nTargets:"
	@grep -E '^[a-zA-Z_/%\-\.]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-28s\033[0m %s\n", $$1, $$2}'

format: ## Format code with prettier
	npm run-script format

lint: ## Lint code with eslint
	npm run-script lint

publish: ## Publish package to npm
	npm publish
