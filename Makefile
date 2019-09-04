.DEFAULT_GOAL := help

clean: ## Clean task
	@rm -rf .gradle/
	@rm -rf build/

run: ## Run the project
	@gradle run --warning-mode=none

test: ## Run tests
	@gradle check --warning-mode=none

.PHONY: help
help: ## show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'