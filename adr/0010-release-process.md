# Release Process

Date: 2018-12-03

## Status

Draft

## Context

eLife has some projects that are published as packages, e.g. for Python projects on pypi.

Specific details may vary from project to project. For example one project may just pushed to pypi, another to Docker Hub, or even both. Some artefacts may just be pushed for releases, others on commit.

The Build Infrastructure will need to support the release process, including managing the credentials to push the artefact. For that the Build Infrastructure will also need to know when a release should be pushed.

## Decision

Each releasable project will have a mechanism to report on its current version. A release should be pushed, if there isn't currently a tag for the corresponding version (and it's on the master branch). i.e. the version in the develop branch will contain the old version until a new release version should be pushed.

The credentials are provided via ....

## Consequences

TODO
