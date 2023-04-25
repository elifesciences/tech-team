# 2023-03-16 Podcast player not displaying on magazine page and most podcast episode pages broken

## Description

As a consequence of the Drupal 9 upgrade of Journal CMS the podcast pages were triggering an error. This also led to the podcast player not being introduced on the magazine page.

## Timeline

2023-03-15:

* 04:59: @nlisgo merge's PR to journal-cms - [Upgrade to Drupal 9 - step 6](https://github.com/elifesciences/journal-cms/pull/807)
* 05:20: deployment to prod
* 09:00-: @nlisgo assessing the success of the update
* 19:53: @nlisgo creates issue to handle a field migration error communicated on Journal CMS status page (https://prod--journal-cms.elifesciences.org/admin/reports/status) unaware that we had an issue reading from this field as it was accessible in Journal CMS UI.

2023-03-16:

* 11:54: @drpeterrodgers reports issue with podcast player on magazine page on slack (https://elifesciences.slack.com/archives/C5LHBSMHS/p1678967694098839)
* 12:27: @QueenKraken acknowledges that fix is being worked on
* 14:30: @nlisgo recreates issue locally
* 14:35: raises PR for interim fix to avoid read from field_chapter_time (https://github.com/elifesciences/journal-cms/pull/838)
* 14:54: merges in above PR
* : Resolves unrelated issue with end2end clean Journal CMS workflow
* 16:04: above fix deployed to prod, pages no longer erroring but chapter times all reading as 0
* 17:09: PR raised to allow us to read from field_chapter_time (https://github.com/elifesciences/journal-cms/pull/840)
* 21:03: Above fix deployed to prod, previous automated deployment failed in "Project tests" for intermittent failure
* : error still shown with field_chapter_time, planned work to create new field and migrate data and switch read

2023-03-17

* Switched to new field, successfully migrating the data and removed old field

## Contributing Factors

* Scheduled release window for Drupal 9, requiring staff to avoid adding/modifying content
* Last minute annual because of teacher strike
* Major update to Drupal

## Stabilization Steps

* avoid reading from problem field
* fix issue with end2end Journal CMS recovery to clear deployment pipeline
* refactor code to successfully read from problem field
* create new field, migrate data and delete problem field

## Impact

* Podcast pages were inaccessible
* MTTD: 30 hours 34 mins
* MTTR: 4 hours 10 mins (unable to jump to chapter) 9 hours 9 mins (complete)

## Corrective Actions

* Possibly should have rescheduled release window
* Focus more attention on integral endpoints rather than application in isolation
* Implement ping strategy on major pages/endpoints to detect health of applications on a regular frequency (ignored for analytics)
