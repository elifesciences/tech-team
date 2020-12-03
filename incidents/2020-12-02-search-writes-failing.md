# 2020-12-02 Search stopped accepting writes

**Incident Leader: Joel Summerfield**

## Description

The search service suddenly stopped accepting writes due to a full disk, and as such new content was no longer showing on the site.

## Timeline

**2020-12-01**

- 19:37 New Relic raises alert about disk usage exceeding 85% on `search--prod--1`

**2020-12-02**

- 18:23 Peter R posted a message on the incident-respoonse Slack channel that new articles weren't appearing on either the homepage or other listing pages.

- 18:27 Joel acknowledges issue, and starts investigation.

- 18:48 With Graham's help, SSH into node and confirm that the elasticsearch log file has ballooned in size again.

- 19:04 Joel takes a copy of the logfile, and then clears it recovering 1.8GB of disk space.

- 19:23 Search can't recover on it's own, hence Joel starts to rebuild a new index.

- 20:46 As new index is building, have to clear other log files and caches to reclaim more space to ensure the index completes successfully.

- 20:50 Building new index is successful, but was close consuming 99% of space.

- 20:51 New content is appearing on the site. Incident is resolved.

## Contributing Factor(s)

- Nobody spotted or acknowledged the New Relic aleart about disk space.

## Stabilization Steps

- Cleared space on full drive, by overwriting a log file that had grown rather large.

```sh
sudo su
cd /var/log/elasticsearch
echo > elasticsearch.log
```

- Built a new index using instructions from [here](https://github.com/elifesciences/elife-playbook/blob/master/operations/search/reindexing.md)

```sh
cd /srv/search/
bin/reindex prod elife_search_20201202
```

- Monitored disk usage as the new index built, and cleared some additional space to ensure it completed. Recovered around 200MB of space which was just enough.

```sh
sudo su
rm -rf /var/log/*.gz
apt-get clean
```

## Impact

- New articles not appearing on the main site or in any of the listing pages.

## Corrective Actions

- [Increase the disk space on the nodes so that building a new index doesn't cut it so fine](https://github.com/elifesciences/issues/issues/5433)
