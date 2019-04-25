# Release Process

Date: 2018-12-03

## Status

Draft

## Context

eLife has some projects that are published as packages, e.g. for Python projects on pypi.

Specific details may vary from project to project. For example one project may just pushed to pypi, another to Docker Hub, or even both. Some artefacts may just be pushed for releases, others on commit.

For any publicly available artifact it's important to specify a version that can be traced back to the source control repository.

## Decision

A new release will be indicated by a new git tag.

Jenkins will trigger on a new tag to, beyond building and running tests, also push the release out (e.g. pypi, Docker Hub, etc.).

## Consequences

TODO
