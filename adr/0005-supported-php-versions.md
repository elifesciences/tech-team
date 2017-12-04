# Supported PHP Versions

Date: 2017-12-01

## Status

Proposed

## Context 

eLife has several microservices (and larger projects) written in PHP.

In order to provide language version consistency across projects we need to get a consensus on which versions we are going to support. 

There are exceptions such as `crm` not supporting PHP 7 and being stuck on 5.6.

Staying up to date with the major and minor versions of PHP is important to be able to use new features and libraries, and to keep working on a version that receives bug fixes and security updates.

All infrastructure is currently based on:

- Ubuntu 14.04 (doesn't have PHP 7.x by default)
- Ubuntu 16.04 (does have PHP 7.0 by default)
- a popular [PPA](https://launchpad.net/~ondrej/+archive/ubuntu/php) filling in the blanks, supporting 7.0, 7.1, and 7.2.

PHP 7.0 has ceased active support, but has [security support](http://php.net/supported-versions.php) until 2018-12-03.

## Decision

We will use PHP 7.0 on all existing and new PHP projects bar exceptions that do not support it (`crm`).

We will upgrade to PHP 7.1, PHP 7.2 and similar minor versions as a concerted effort on all libraries and projects, before the end of the security support.

We will start requiring PHP 7.1/7.2 in composer.json...when?

## Consequences

No libraries or projects should require PHP >= 7.1 until infrastructure provides it by switching the packages versions.

A single epic should capture all the necessary upgrades when we decide to do the switch to a new minor version.
