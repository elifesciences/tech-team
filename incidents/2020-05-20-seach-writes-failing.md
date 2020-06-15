# 2020-05-20 Search stopped accepting writes

**Incident Leader: Giorgio Sironi, Luke Skibinski**

## Description

The search service suddenly stopped accepting writes due to a full disk, and as such new content was no longer showing on the site. When a new is to be index is created, the current index is set to read only and new new index created as
write only. Once the new index is built. The new index is updated to be read & write and the old index destroyed. In this case the disk was filled whilst the new index was built, and hence the search index was left in a state where all
reads came from the old index, hence no new content, and all writes were failing on the new index that failed to complete.

## Timeline

**2020-05-15**

- Suspected date the issue started

**2020-05-19**

- 17:57 Peter R posted a message on the sitefeedback Slack channel that some articles weren't showing on the site.

**2020-05-20**

- 08:36 Peter R posted a message on the features-production Slack channel that some articles weren't showing on the site.

- 08:55 Fred A raised issue in GitHub [#5661](https://github.com/elifesciences/issues/issues/5661) that articles where not appearing.

- 09:11 Mael reached out to Nathan for help via Slack and GitHub

- 09:15 Mael raised issue in standup

- 09:42 Nathan looked at the GitHub issue, identied that it might be related to search but said he wouldn't be able to look into the problem until the afternoon.

- 17:31 Incident Response channel on slack, message posted by Rowena about eToc being sent out with no content.

- 17:40 Giorgio started investigation

**2020-05-21**

- 05:07 Luke S notes that the issue is now resolved

## Contributing Factor(s)

- There were a lot of alerts raised from New Relic, which made it difficult to identify which alert was specifically the root cause of the problem.
- Due to a flood of alerts, the alert for hitting > 80% was lost in the noise.

## Stabilization Steps

- Marketing halted the sending of the eToc message, but 13k already sent.
- Cleared space on full drive, by overwriting a log file.

```
root@prod--search:/var/log/elasticsearch# echo > elasticsearch.log
```

## Impact

- New articles not appearing on the main site.
- eToc emails sent out to subscribers with no content.

MTTD: 96h (estimated)
MTTR: 35h

## Corrective Actions

- Was it related to [this](https://github.com/elifesciences/tech-team/pull/23/files)
- [Investigate if log rotation needs to be enabled]()
- [Investigate if the 7GB partition is actually enough space, do we need to increase this?]()
