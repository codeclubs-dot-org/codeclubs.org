#!/usr/bin/env python3

import os
import subprocess

# We want to ignore some linting errors reported by standardjs. Lines
# containing any of the below will be filtered out of the standardjs output.
IGNORED_WARNINGS = [
    # https://github.com/sheerun/prettier-standard/issues/109
    "Expected newline between test and consequent of ternary expression.",
    "Expected newline between consequent and alternate of ternary expression.",
    # Not sure how to configure this properly.
    "Definition for rule 'react-hooks/exhaustive-deps' was not found.",
]

def should_heed_warning(warning):
    for ignored_part in IGNORED_WARNINGS:
        if ignored_part in warning:
            return False
    return True

# Run the linter (standardjs), which by default shows the error messages
# in stdout.
process = subprocess.run(
    ['standard'],
    stdout=subprocess.PIPE,
    stderr=subprocess.DEVNULL)

# Errors come out as a big string, but we need to split these up in order to 
# filter them properly against the denylist above.
all_error_messages = process.stdout.decode('UTF-8').split(os.linesep)

# Filter out empty warnings, along with the ones that we want to ignore.
error_messages = list(
    filter(lambda x: len(x) > 0,
    filter(should_heed_warning, 
           all_error_messages)))

if len(error_messages) > 0:
    # If there are error messages, let's be sure to show them so we can
    # help folks format stuff.
    print(os.linesep.join(error_messages))
    assert False  # Return non-zero to trigger presubmit failure.
