# Release via tags

Date: 2018-12-03

## Status

Proposed

## Context

eLife has some projects that are published as packages, e.g. for Python projects on pypi.

Specific details may vary from project to project. For example one project may just pushed to pypi, another to Docker Hub, or even both. Some artefacts may just be pushed for releases, others on commit.

For any publicly available artifact it's important to specify a version that can be traced back to the source control repository.

## Decision

A new release will be indicated by a new Git tag.

Jenkins will trigger on a new tag to, beyond building and running tests, also push the release out as needed (e.g. pypi, Docker Hub).

## Consequences

Version numbers cannot be specified in source code, as the tag is the source of truth for them.

Jenkins should not create tags automatically but wait for a human to push one as a build trigger.
