# 2018-11-12

** Incident Leader: Nathan Lisgo **

## Description
Production database manually deleted in error on Journal-CMS, intended target was continuum test.

## Timeline
All times UTC.

~16.50: Nathan realised the database was dropped from the wrong environment

16.52: Nathan determined to restore the most recent database backup (from 23:00 on 11th November - the previous day)

16.54: New Relic alert for incident on journal: 'journal bypassed CDN'

16.56: Stuart notices the Magazine page carousel is missing.

16.59: New Relic alerts for incident on journal-cms-prod

17.05: Magazine carousel reported in Slack as being back

17.07: Stuart confirms carousel is back

17.18: email eLife staff notifying that any content added or modified today would need to be redone, and to get in touch

17.20: Through analysing search logs, Giorgio discovered 2 blog articles had been created or modified and so needed to be addressed

17.31: Rowena reports Miranda is the source of the new blog post, and confirms that Rowena is the editor of the modified one & that she will reapply the edits to the latter.

17.37: Nathan submits a PR for a complete reindex

18.17: reindexing gets to production, but fails due to lack of sufficient disk space


2018-11-13

02.52: Luke reports he's noticed a disk space problem on search, he goes on to clear up logs to free 1Gb, but it wasn't enough

08.32: Giorgio cleans up unused old indexes

08.46: Giorgio intiates another reindex

09.15: reindexing completes

10.57: PR submitted for redirect from deleted version to replacement version

21.31: automated daily update applied journal redirect


## Contributing Factor(s)

- Being able to connect to the production machine
- Being able to connect to the database as a user with drop table permissions
- Nathan connected to the production journal-cms server by mistake
- Process to be performed was destructive, and there was no rollback
- Process was manual
- Search does not have a delete option
- There were left over indexes on Search
- Frequency of backups is 'only' daily

## Stabilization Steps

- Restoring the most recent database backup
- Using the search logs to discover what content would still be affected after the database was restored
- Communicating with staff to get such affected content resubmitted
- Reindexing search
- Adding redirect from deleted blog post to resubmitted version

## Impact

MTTD: < 1 minute

MTTR:

- journal cms content available again: 17 minutes;

- full resolution: 28 hours 41 minutes.

## Corrective Actions

- Time-limit SSH connections to production servers
- Colourise prompts on production servers
- Create a pipeline for journal-cms: 'contiuum test restore from prod'
- Delete left over indexes during a Search reindex
