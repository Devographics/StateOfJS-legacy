.DEFAULT_GOAL := help

DOCKER_COMPOSE := docker-compose \
    -f docker-compose.yml

########################################################################################################################
#
# HELP
#
########################################################################################################################

# COLORS
RED    := $(shell tput -Txterm setaf 1)
GREEN  := $(shell tput -Txterm setaf 2)
WHITE  := $(shell tput -Txterm setaf 7)
YELLOW := $(shell tput -Txterm setaf 3)
RESET  := $(shell tput -Txterm sgr0)

# Add the following 'help' target to your Makefile
# And add help text after each target name starting with '\#\#'
# A category can be added with @category
HELP_HELPER = \
    %help; \
    while(<>) { push @{$$help{$$2 // 'options'}}, [$$1, $$3] if /^([a-zA-Z\-\%]+)\s*:.*\#\#(?:@([a-zA-Z\-\%]+))?\s(.*)$$/ }; \
    print "usage: make [target]\n\n"; \
    for (sort keys %help) { \
    print "${WHITE}$$_:${RESET}\n"; \
    for (@{$$help{$$_}}) { \
    $$sep = " " x (32 - length $$_->[0]); \
    print "  ${YELLOW}$$_->[0]${RESET}$$sep${GREEN}$$_->[1]${RESET}\n"; \
    }; \
    print "\n"; }

help: ##prints help
	@perl -e '$(HELP_HELPER)' $(MAKEFILE_LIST)

########################################################################################################################
#
# CONTROL
#
########################################################################################################################

setup: ##@control Installs & starts elasticsearch
	@make install

	@${DOCKER_COMPOSE} up -d
	@make wait-for-elastic

run: ##@control Starts elastic, init index & load survey data
	@make setup
	@make collector-fetch
	@make collector-reports

start: ##@control Starts docker-compose
	@${DOCKER_COMPOSE} start

stop: ##@control Stops docker-compose
	@${DOCKER_COMPOSE} stop

clean: ##@control Cleanup
	@echo "${YELLOW}Stopping and removing docker-compose${RESET}"
	@${DOCKER_COMPOSE} stop -t 0
	@${DOCKER_COMPOSE} rm -f
	@-rm -rf esdata

log: ##@control Print stdout of all services
	@${DOCKER_COMPOSE} logs -f --tail=$${TAIL_LENGTH:-50}

########################################################################################################################
#
# COLLECTOR
#
########################################################################################################################

collector-fetch: ##@collector Fetch responses from type form
	@echo "${YELLOW}Fetching responses${RESET}"
	@./collector fetch
	@echo ""

collector-reports: ##@collector Build reports
	@echo "${YELLOW}Building reports${RESET}"
	@./collector report all
	@echo ""

########################################################################################################################
#
# UTILS
#
########################################################################################################################

install: ##@utils Install all dependencies
	@echo "${YELLOW}Installing collector dependencies${RESET}"
	@yarn install

wait-for-elastic: ##@utils Ensure elastic is running and reachable
	@echo "${YELLOW}Waiting for elastic${RESET}"
	@${DOCKER_COMPOSE} exec -T elastic /bin/bash -c \
	"while ! curl http://0.0.0.0:9200/ > /dev/null 2> /dev/null; do \
      	echo \"${YELLOW}Waiting for elastic to accept connections…${RESET}\"; \
      	sleep 3; \
    done;"
	@echo "${GREEN}elastic is ready${RESET}"
	@echo ""
