# 2020-06-08 Search Failure

**Incident Leader: Chris Wilkinson, Joel Summerfield**

## Description

The manual running of a Jenkins project to build a new search index resulted in the search server running out of space [again](https://github.com/elifesciences/tech-team/blob/master/incidents/2020-05-20-search-writes-failing.md).

## Timeline

**2020-06-08**

- 09:21 Nathan manually triggered a reindex which ultimately [failed](https://alfred.elifesciences.org/job/process/job/process-search-reindex/12/)

- 14:54 Peter R posted a message on the incident-response Slack channel that some articles weren't showing on the site.

- 15:17 Joel Acknowledged issue and reached out to Nathan for help.

- 15:18 Nathan concluded that the search service had failed again.

- 15:19 Nathan determined that a recent change may have caused the issue.

- 15:45 Joel reached out to PRC team for help.

- 15:47 Chris W starts to investigate the issue.

- 16:20 Chris W reverts [the change to increase the number of workers](https://github.com/elifesciences/builder-configuration/pull/143)

- 16:42 Chris W triggers the [Jenkins project](https://alfred.elifesciences.org/job/process/job/process-search-reindex/13/) to rebuild the index.

- 17:58 Chris W notes the index rebuild failed due to lack of disk space.

- 18:02 Chris W has to down tools for other commitments

- 18:17 Joel S follows Stabilization step from previous search incident to try and free disk space, but it isn't the log that is consuming all the space now. Suspect it might be partially rebuilt indexes left lying about.

- 20:08 Chris W returns, identifies and removes partial and unused indexes to reclaim disk space, disk consumption reduced to 74%.

- 20:23 Chris W starts to build a new index.

- 21:28 Chris W reports the new index has built successfully, however disk usuage is up to 96% so was close.

- 21:37 Chris W switches reads to the new index, reports that new content is now visible.

- 21:40 Chris W cleans up old indexes, disk usage down to 75%. Incident is now considered resolved.

## Contributing Factor(s)

- The [search-reindex project in Jenkins](https://alfred.elifesciences.org/job/process/job/process-search-reindex/) has never successfully completed the production stage of the pipeline.
- High number of new relic alerts makes it hard to identify real issues.

## Stabilization Steps

- Marketing halted the sending of the eToc message.
- Reverted [the change to increase the number of workers](https://github.com/elifesciences/builder-configuration/pull/143)
- Built a new (search index)[https://elifesciences.slack.com/archives/C6N559E2F/p1591643307035000].

```
# View the current indexes
curl http://localhost:9200/_cat/indices

# See which indexes are configured for read and write
cat index.json

# Or alternatively.
bin/console keyvalue:load index-metadata

# Configure which index to write to.
bin/console index:switch:write elife_search_reindex_11

# Delete an index.
bin/console index:delete elife_search_reindex_13

# Create a new index.
bin/reindex elife_search_reindex_manual_202006082020

# Configure which index to read from.
bin/console index:switch:read elife_search_reindex_manual_202006082020
```

## Impact

- New articles not appearing on the main site.

Mean Time to Detect (MTTD): 5.5h
Mean Time to Resolve (MTTR): 7h

## Corrective Actions

- [Fix the broken Jenkins project](https://github.com/elifesciences/issues/issues/5664#issuecomment-643858003)
- [Investigate if log rotation needs to be enabled](https://github.com/elifesciences/issues/issues/5748)
- [Investigate if the 7GB partition is actually enough space, do we need to increase this?](https://github.com/elifesciences/issues/issues/5749)
