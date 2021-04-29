# Presubmit checks

This directory contains a bunch of scripts that will run with Github Actions. If
a script returns nonzero, the check will fail.

Generally speaking, all of these checks should be written in Python. Other
languages aren't necessarily forbidden though; you'll have to do a little work
in `./run_locally.sh` and `../.github/workflows/presubmits.yml` to support that
though.

## Running all presubmits locally

To run all presubmits locally, run the `./run_all.sh` script in this directory.

IMPORTANT: `./run_all_locally.sh` should not be added to
`../.github/workflows/presubmits.yml`.  It's a special script that is for
development only.

## Adding another presubmit check

First, add your script to this directory. See existing scripts for ideas on how
this is done. Don't forget to mark it as executable, usually via
`chmod a+x my_new_script.py`.

One you've done that, add another line to the bottom of
`../.github/workflows/presubmits.yml` which references your new presubmit check.
This is a file that is run as a Github Action, so if you forget to add this
line, Github won't try to run it.
