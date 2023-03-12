ROOT_DIR:=(shell dirname $(realpath $(firstword $(MAKEFILE_LIST))))
REQUIREMENTS=requirements.txt
# Detects which OS is being used
# Only relevant for virtual environment creation
ifeq ($(OS), Windows_NT)
	SYSTEM_PYTHON=py
else
	SYSTEM_PYTHON=python3
endif

VENV_ROOT=venv
VENV_BIN=$(VENV_ROOT)/bin
VENV_PIP=$(VENV_BIN)/pip3
VENV_PYTHON=$(VENV_BIN)/python

all:  uninstall install

virtualenv:
	@echo "Making virtual environment..."
	@$(SYSTEM_PYTHON) -m venv venv
	@echo "Installing all dependencies..."
	$(VENV_PIP) install --upgrade pip
	$(VENV_PIP) install -r $(REQUIREMENTS)

install: virtualenv
	@echo "Installing zkaptcha in the system"
	@$(VENV_PIP) install -e .
	@echo "Installation was succesful"

uninstall:
	@echo "Uninstalling zkaptcha in the system"
	$(VENV_PIP) uninstall zkaptcha
	@echo "Succesfully uninstalled zkaptcha"

FORCE: ;
