# 2023-02-24 EPP Journal content header background image visual regression

## Description

A fix for the author pop-ups in article content headers had the unintended consequence of causing the background image of the content headers to no longer be bound by the content header div (height, width and position).

## Timeline

2023-02-23:

* 16:48: merge PR to pattern-library - position relative removed to fix issue with author pop-ups

2023-02-24:

* 10:32: merge PR to journal
* 10:55: deployed to prod--journal
* 11:30: Daisy Veysey posts in #incident-response with screenshot of MSA page
* 11:35: EPP team begin investigating
* 11:44: Dave Price prepares PR to pattern-library reverting https://github.com/elifesciences/pattern-library/pull/1236
* 11:50: merge PR to patterns-php
* 12:15: merge PR to journal
* 12:37: deployed to prod--journal
* 12:41: wider team informed of fix on #incident-response

## Contributing Factors

* patterns-php auto update pipeline is quite fragile. Failing most of time. Had to re-run.
* banners were `position: absolute` which was not expected

## Stabilization Steps

* reverting the `position: relative` removal in the `content-header` css class.

## Impact

* content header background image was covering most of the screen
* MTTD: 35 mins
* MTTR: 71 mins

## Corrective Actions

* pattern-library agree to visit the pages (all or agreed set) before approving PR for merge
* consider integrating visual regression tool into CI
* investigate reason why patterns-php auto update is failing
* consider reverting to journal directly to reduce time to recovery
