# 2022-11-15: Search is not indexing items that are on the SQS queue

**Incident Leader: Nathan Lisgo**

## Description

It was reported that recent content that was confirmed to be published was not appearring on the homepage.

## Timeline

**2022-11-15**

- 11:01 Peter posts on slack #incident-response:

> Is search working? The following articles were published earlier today but are not showing on the home page etc:
> https://elifesciences.org/articles/82392
> https://elifesciences.org/articles/75749
> https://elifesciences.org/articles/84118

See: https://elifesciences.slack.com/archives/C6N559E2F/p1668510100151269

- 11:06 Nathan contacted on slack by Paul directly
- 11:11 Scott involved as Nathan not yet available. Scott looked into running processes and checked logs for evidence of an issue.
- 11:32 Postegres upgrade identfied as a possible cause.
- 11:35 Nathan actively looking into issue
- 11:37 Scott and Nathan jump into Google Meet to work on issue together
- Scott considering restarting server as this was identified as a possible resolution for a similar experienced recently. Luke's documentation of previous resolution was helpful. (See: https://github.com/elifesciences/issues/issues/7733)
- 12:17 Prior to restart we were able to isolate a process that wasn't working as expected so we would have clear evidence that a restart was effective.

ssh'd into search prod
```
cd /srv/search
./bin/console queue:push article 34995
```

Meanwhile we were tailing the logs and grepping on 34995:

```
tail -f var/logs/all.json | grep 34995
```

Not all expected logs were output so we had something to compare after restart.
- 12:20 restarted server via aws console. After restart ran `sudo salt-call state.highstate` on server.
- 12:35 reattempt `queue:push` while monitorin logs and it was successful. We then pushed all 3 of the missing articles on to the queue and each was successfully indexed.
- 12:44 reported back on slack that all was now working and the search index was up to date.


## Contributing Factor(s)

- postgresql database was upgraded (v11 to v12) without any sign of any problems
- reluctance to trigger full reindex as we still have concern that switch to new index will occur even though new index didn't successful index anything

## Stabilization Steps

- restart of server through aws console
- manually triggering the addition of missing articles into the sqs queue

## Impact

- no articles indexed while issue in place
- no magazine content indexed while issue in place

## Corrective Actions

- add ability to alert appropriate team members if new content is not available on search. Would be great not to rely on a team member spotting the issue.
- consider removing the reliance on gearman as we are not currently benefitting from the presence of the service. The alternative is to index items as soon as we retrieve them from the queue.
- implement a check on full search reindex to ensure that write index has some items in place before switch the read index flag. (https://github.com/elifesciences/issues/issues/7896)
- add dateFrom filter to search import command. (https://github.com/elifesciences/issues/issues/7942)
- consider the possibility of having a health check that we run hourly which checks that we can successfully index a single item and if we can't alerts an appropriate team member.
- as part of postgres upgrade process also restart the server and verify that a single item can queued and indexed successfully.
