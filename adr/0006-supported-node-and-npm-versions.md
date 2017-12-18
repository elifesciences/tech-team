# Supported Node Versions

Date: 2017-12-15

## Status

Proposed

## Context 

eLife has projects built in Node.
 
eLife has projects that use the Node Package Manager (npm) in at least part of their own build process, even if the main technology of the project is not Node.

In order to provide language version consistency across projects we need to get a consensus on which Node versions we are going to support.

In order to provide dependency management consistency, we need a consensus on which npm versions to support.

Staying up to date with the major and minor versions of Node is important:

- to be able to use new features (nice to have)
- to keep working on a version that receives bug fixes and security updates (must have)            

## Decision

To use the latest Long Term Support (LTS) version.

The 8.x is the current Node LTS line. The current Node LTS version is 8.9.3.

We will use Node 8.9.3.

Node 8.9.3 includes bundled npm version 5.5.1. We will use the npm version bundled with Node.

When upgrading, we will make a concerted effort to upgrade all projects as part of the same piece of work.  


## Consequences

New projects should use Node 8.9.3 and npm 5.5.1.

Existing projects should be upgraded to use 8.9.3 before April 2018 (when Active LTS ends for the 6.x line ends).

  
