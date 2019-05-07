########################################################################################################################
##
## HELP
##
########################################################################################################################

# COLORS
YELLOW = $(shell printf "\33[33m")
GREEN  = $(shell printf "\33[32m")
RED    = $(shell printf "\33[31m")
WHITE  = $(shell printf "\33[37m")
RESET  = $(shell printf "\33[0m")

# Add the following 'help' target to your Makefile
# And add help text after each target name starting with '\#\#'
# A category can be added with @category
HELP_HELPER = \
    %help; \
    while(<>) { push @{$$help{$$2 // 'options'}}, [$$1, $$3] if /^([a-zA-Z\-_\%]+)\s*:.*\#\#(?:@([a-zA-Z\-\%]+))?\s(.*)$$/ }; \
    print "usage: make [target]\n\n"; \
    for (sort keys %help) { \
    print "${WHITE}$$_:${RESET}\n"; \
    for (@{$$help{$$_}}) { \
    $$sep = " " x (32 - length $$_->[0]); \
    print "  ${YELLOW}$$_->[0]${RESET}$$sep${GREEN}$$_->[1]${RESET}\n"; \
    }; \
    print "\n"; }

help: ##@help prints help
	@perl -e '$(HELP_HELPER)' $(MAKEFILE_LIST)

.DEFAULT_GOAL := help

########################################################################################################################
##
## GLOBAL
##
########################################################################################################################

install: ##@global install ALL dependencies
	@echo "${YELLOW}Installing all project dependencies${RESET}"
	@yarn install
	@${MAKE} home_install
	@${MAKE} survey_install_2016
	@${MAKE} survey_install_2017
	@${MAKE} survey_install_2018

build: ##@global build all
	@echo "${YELLOW}Building the whole project${RESET}"
	@${MAKE} home_build
#	@${MAKE} survey_build_2016
	@${MAKE} survey_build_2017
#	@${MAKE} survey_build_2018

fmt: ##@global format code using prettier (js, css, md)
	@echo "${YELLOW}Formatting code${RESET}"
	@./node_modules/.bin/prettier --color --write \
		"surveys/*/website/**/*.js" \
		"surveys/*/website/**/*.scss" \
		"surveys/*/README.md" \
		"cli/**/*.js"

fmt_check: ##@global check if files were all formatted using prettier
	@echo "${YELLOW}Checking formatting${RESET}"
	@./node_modules/.bin/prettier --color --list-different \
		"surveys/*/website/**/*.js" \
		"surveys/*/website/**/*.scss" \
		"surveys/*/README.md" \
		"cli/**/*.js"

lint: ##@global run eslint on the whole project
	@echo "${YELLOW}Running eslint on the whole project${RESET}"
	@yarn run eslint "./surveys/*/website/src/**/*.js"

########################################################################################################################
##
## HOME
##
########################################################################################################################

home_install: ##@home install dependencies for the homepage
	@echo "${YELLOW}Installing ${WHITE}home${YELLOW} dependencies${RESET}"
	@cd home && yarn install

home_dev: ##@home start homepage for development
	@echo "${YELLOW}Starting ${WHITE}home${YELLOW} development server${RESET}"
	@cd home && yarn dev

home_build: ##@home build homepage
	@echo "${YELLOW}Building ${WHITE}home${RESET}"
	@cd home && yarn run build

########################################################################################################################
##
## SURVEYS
##
########################################################################################################################

survey_install_%: ##@surveys install dependencies for a specific survey or folder, ex: survey_install_2018
	@echo "${YELLOW}Installing dependencies for ${WHITE}${*}${YELLOW} survey${RESET}"
	@cd surveys/${*}/website && yarn install

survey_dev_%: ##@surveys start survey website for development, ex: survey_dev_2018
	@echo "${YELLOW}Staring ${WHITE}${*}${YELLOW} survey website in dev mode${RESET}"
	@cd surveys/${*}/website && yarn run dev

survey_build_%: ##@surveys build a specific survey website, ex: survey_build_2018
	@echo "${YELLOW}Building ${WHITE}${*}${YELLOW} survey website${RESET}"
	@cd surveys/${*}/website && yarn run build

survey_capture_%: ##@surveys take screenshots of the survey's results, ex: survey_capture_2018
	@./cli/cli capture ${*}