# 1. Use pull requests as the primary development tool

Date: 2017-10-20

## Status

Accepted

## Context

Software is built incrementally as an accumulation of changes.

Pull requests allow:

- visibility of who is changing what.
- discussion and review from other people in the team.
- automated testing and other kind of checks to run, offloading work from humans to machines.

## Decision

We will open pull requests as the primary mean for deploying a change.

## Consequences

Team members can be asked to review a pull request through Github.

Automated tests should run on pull requests, to provide automated feedback.

Committing directly to a mainline branch (`develop` or `master`) should not be frequent.
