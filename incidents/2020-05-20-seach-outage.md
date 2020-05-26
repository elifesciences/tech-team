# 2020-05-20 Search Outage

**Incident Leader: Giorgio Sironi, Luke Skibinski**

## Description

Summary of the findings of the investigation/post-mortem.

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
- [Luke raised the following](https://github.com/elifesciences/issues/issues/5664)
- [Investigate if log rotation needs to be enabled]()
- [Investigate if the 7GB partition is actually enough space, do we need to increase this?]()
