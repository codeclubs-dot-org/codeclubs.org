#!/bin/bash

# Runs all presubmit checks locally. This should be run from the project root.

$(find ./presubmit/ -type f -name '*.py')
