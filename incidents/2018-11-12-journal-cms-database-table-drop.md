# 2018-11-12

** Incident Leader: Nathan Lisgo **

## Description
Production database manually deleted in error on Journal-CMS, intended target was continuum test.

## Timeline
All times UTC.

~4.50pm: Nathan realised the database was dropped from the wrong environment

4.52pm: Nathan determined to restore the most recent database backup (from 11pm on 11th November - the previous day)

4.54pm: New Relic alert for incident on journal: 'journal bypassed CDN'

4.56pm: Stuart notices the Magazine page carousel is missing.

4.59pm: New Relic alerts for incident on journal-cms-prod

5.05pm: Magazine carousel reported in Slack as being back

5.07pm: Stuart confirms carousel is back

5.18pm: email eLife staff notifying that any content added or modified today would need to be redone, and to get in touch

5.20pm: Through analysing search logs, Giorgio discovered 2 blog articles had been created or modified and so needed to be addressed

5.31pm: Rowena reports Miranda is the source of the new blog post, and confirms that Rowena is the editor of the modified one & that she will reapply the edits to the latter.

5.37pm: Nathan submits a PR for a complete reindex

6.17pm: reindexing gets to production, but fails due to lack of sufficient disk space


2018-11-13

2.52am: Luke reports he's noticed a disk space problem on search, he goes on to clear up logs to free 1Gb, but it wasn't enough

8.32am: Giorgio cleans up unused old indexes

8.46am: Giorgio intiates another reindex

9.15am: reindexing completes

10.57am: PR submitted for redirect from deleted version to replacement version

9.31pm: automated daily update applied journal redirect


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
    - journal cms content available again: 17 minutes
    - full resolution: 28 hours 41 minutes

## Corrective Actions

- Time-limit SSH connections to production servers
- Colourise prompts on production servers
- Create a pipeline for journal-cms: 'contiuum test restore from prod'
- Delete left over indexes during a Search reindex
