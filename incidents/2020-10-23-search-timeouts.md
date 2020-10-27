# 2020-10-23 Search Failure

**Incident Leader: Joel Summerfield, Nathan Lisgo**

## Description

[Requests made to search](https://api.elifesciences.org/search?for=&page=1&per-page=10&sort=date&order=desc&type%5B%5D=research-article&use-date=default) were resulting in a timeout, which was resulting in various journal pages either failing to load completed, or only partially loading.

## Timeline

**2020-10-23**

- 14:10 New Relic raises CPU usage alert about `search--prod--1`.

- 15:44 Nathan reports on slack in #blue-team-techthat requests to search are timing out.

- 15:48 Nathan raises issue in #incident-response.

- 15:50 Joel confirms that `search--prod--1` CPU is at 100% being consumed by a `java` process. Notes that `search-prod--2` is not suffering the same issue.

- 15:53 Joel asks for some help from Giorgio.

- 16:04 Giorgio joins Nathan, Joel and Daniel H on a call. 

- 16:14 Restart `elasticsearch`.

- 16:24 Issue is resolved.

## Contributing Factor(s)

- Not 100%, but not long prior to the incident [this commit](https://github.com/elifesciences/search/commit/3d03c9b79c6e42339dd1481f7ffa2777cfacdeb6) was merged which might have been some sort of trigger.

## Stabilization Steps

- Restarted `elasticsearch` process

  ```
  # Check the logs.
  tail -n 100 /var/log/elasticsearch/elasticsearch.log
  tail -n 100 /srv/search/var/logs/all.json

  #  After confirming that it is safe, we restart elasticsearch.
  sudo service elasticsearch stop
  sudo service elasticsearch start

  # Keep an eye on the log, to check that the service has started OK.
  tail -f /var/log/elasticsearch/elasticsearch.log

  #Check the CPU usage to confirm that it has returned to normal.
  top

  # Double check the status of the indexes
  cd /srv/search/
  ./bin/console queue:count
  ./bin/console index:read
  curl http://localhost:9200/_cat/indices
  ```

## Impact

- Articles published during the outage not appearing on the home page or listings.
- Search function was not working.
- Listing on various sections of the site would fail to load, e.g specifc listing pages that weren't cached.
- Various pages on the site would only partially load, e.g. article pages.

Mean Time to Detect (MTTD): 1.5h
Mean Time to Resolve (MTTR): 0.75h

## Corrective Actions

- [Investigate why there are 2 instances of `search--prod`, yet `search--prod-2` didn't pick up any traffic despite the primary node having issues.](https://github.com/elifesciences/issues/issues/6235)
