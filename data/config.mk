# From http://clarkgrubb.com/makefile-style-guide#prologue
MAKEFLAGS += --warn-undefined-variables
#SHELL := bash
#.SHELLFLAGS := -eu -o pipefail
.DEFAULT_GOAL := all
.DELETE_ON_ERROR:
.SUFFIXES:

# Variables specific to this build
PG_HOST="localhost"
PG_USER="eric"
PG_DB="burning_glass"
PG_PORT="5432"
