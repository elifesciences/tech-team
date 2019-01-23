# Python application building and deployment

Date: 2019-01-22

## Status

Proposed

## Context 

eLife has numerous projects written with the [Python programming language](https://www.python.org/) by many different 
authors. Some of these authors have moved on to different organisations and some only worked at eLife temporarily.

Each author has their own preferred tools used for development. The deployment of this code on to production servers
is the result of using the author's preferred tools in a CI/CD pipeline to create the project's environment, install the 
project's dependencies, pre-test tasks like linting or complexity checking, testing and post-testing tasks like coverage
checks. These tasks are often glued together by the CI runner, or bash scripts or other python code and, recently, Make 
files.

In the case of projects with multiple authors, there are often multiple ways present to achieve the same result that 
suits individual authors best.

Python projects have traditionally left deployment and configuration up to the project formula. The project formula
describes the requirements of the environment the project lives in, for example, does a database or web server need to 
exist? What directories do log files live in and what permissions do they need? These and dozens of other similar cases
are handled by the formula on behalf of the Python project. The project author doesn't necessarily need to know about 
how these cases are solved, the formula is built and maintained by those building and maintaining the systems these
projects run on in production.

Python projects require a Python runtime and Python packages can be installed system-wide or locally using a tool called
'virtualenv', now officially part of Python3. Dependency and runtime management has become complicated in the move from
Python2 to Python3 and the introduction of new language features and dependency management tools; the OS distributions 
used in production use a fixed version of the Python runtime, often with features missing or mutually exclusive with 
other features (Ubuntu + Python3 + pip + venv for example). Attempts to accommodate the latest runtimes has introduced
instability and complexity in the rest of the system.

Containerisation has made describing and building Python applications much easier for a project's author and the line 
between traditional code development and code deployment is less clear. Container descriptions often live within the 
code repository instead of in a separate one. Containers serve a single purpose, running a single process, but are 
composable so that a cluster of containers may be described: one for the application, another for a webserver, another
for a database and so on.

Deploying a container that has the project within perfectly installed and configured is very similar to deploying a fat
application binary: a single discrete artifact with all dependencies accounted for. Deployment consists of dropping the
artifact into the runtime and reloading a service.

Because container descriptions live alongside the codebase and are used during development they suffer the same 
problems as the author-preferred utility scripts/glue code. There are any number of ways to build a container, does 
installation/testing/linting/etc happen within the container or without? Are the build commands invoked in the same way 
across projects? If we insist on containers, then is it the project author's responsibility to now maintain a suite of 
them? Are they the best party to attempt it.

## Decision

Deploy all Python projects within containers.

Testing happens within project containers.

Standardise building of containers.

## Consequences

Testing becomes less hazardous as fewer variables are in play.

Deployment becomes simpler and much of a project's formula can be removed.

Deployment becomes uniform and new projects can benefit from the tooling built for other Python projects.

Adhoc and idiomatic utility scripts are replaced with a single script that encapsulates build and test commands.

Project authors will have a reproducible environment much closer to production and much less unwieldy than a 
Vagrant virtual machine.

Project authors (hopefully) feel more agency over how their code is used in production.

