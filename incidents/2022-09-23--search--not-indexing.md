# 2022-09-23: search not indexing content

**Incident Leader: Luke Skibinski**

## Description

The Production team reported that they were unable to see published content on the homepage or on category landing pages.

- https://github.com/elifesciences/issues/issues/7728

## Timeline

- 2022-09-21 @ 18:56, Fred posts on Github that search is broken
- 2022-09-22 @ 01:52, acknowledged by Ash
- 2022-09-22 @ 02:44, investigation by Giorgio. Initial suspicion of Gearman job server but conclusion is changes to PHP code in search.
- 2022-09-22 @ 22:53, Nathan notes a change in the search project's formula to the postgresql database, an upgrade from v9 to v11
- 2022-09-23 @ 01:16, an update from Giorgio after a more thorough investigation. Recommends short term improvements to logging, longer term recommendation of replacing Gearman job server.
- 2022-09-23 @ 01:20, Nathan mentions me (Luke)
- 2022-09-23 @ 13:19, I finish replicating the issue on the `continuumtest` instance of `search`. I discover downgrading the installation of postgresql and restarting the instance fixes the problem.
- 2022-09-23 @ 14:19, I discover downgrading the installation of postgresql on `prod` *without* restarting the instance does *not* fix the problem. This means `prod` will need to be restarted (downtime). I restart prod, however problem is not fixed. I discover there is a difference between the read and write indices on prod. More careful reading of Giorgio's investigation would have revealed that earlier. I switch the write index to the read index and re-index content, content is updated. 
- 2022-09-23 @ 14:29, Confident the problem is fixed I trigger a reindex, believing the difference in indices was due to a failed reindex.
- 2022-09-23 @ 15:17, Giorgio confirms he switched the index manually
- 2022-09-23 @ 15:40, Re-index completes successfully, non-CDN version of site is updated with recent content, including the specific content Fred raised.
- 2022-09-23 @ 16:26, CDN version of site is updated, ticket is closed

## Contributing Factor(s)

- postgresql database was upgraded without any sign of any problems
- end2end tests and deployments completed successfully for a week without any sign of any problems

## Stabilization Steps

- read index was switched to a known-good index to prevent the empty re-index from affecting site content

## Impact

- stale content on key pages of the journal for approximately a week

## Corrective Actions

- a more careful upgrade of `search` from postgresql v9 to v11
- ...
