# api-gateway--prod

## impact

* affected profiles--prod
    - from 2020-05-15 to 2020-05-19
    - speculatively caused by throttled traffic to OrcID (requests timing out after 10 seconds)
    - ...
* affected search--prod
    - from 2020-05-18 to 2020-05-21
    - caused by total disk usage
    - events stopped being processed leading to a stale frontpage and new articles not appearing in search listings
* affected api-gateway--prod database for approximately 29 hours
    - from 2020-05-19 19:24:54 UTC to 2020-05-22 00:42:15 UTC
    - caused by total disk usage
    - no downtime, no services apparently affected
        - the database stores configuration and is not particularly stateful

## description

Our infrastructure came under intense load Sat 2020-05-16 to Tues 2020-05-19 from a sanctioned web crawl by a bot called 
DeepCrawler, ticket here: https://github.com/elifesciences/issues/issues/5630

Several alerts were resolved on Monday, another Tuesday (`profiles--prod`, possibly unrelated), another was detected 
Weds (`search--prod`) and was resolved Thursday. `api-gateway--prod` was detected Friday after failing the daily 
highstate and was resolved Friday.

The alerts were a mix of everything we have, disk usage, disk I/O, memory usage, cpu spikes, APM drops and a failing monitor.

This came amid news of a restructuring of the tech team.

The recurrent failing monitor was "journal--prod (Washington DC)" traced to `profiles--prod`. The nginx read timeout was
set to 14 seconds and the uwsgi harakiri timeout was set to 10 seconds. Many requests were being killed by uwsgi causing
500 errors to be returned by the nginx wrapper to the journal, causing the monitor to fail. 

`search--prod` failed with a full disk alert but otherwise continued performing well until it was discovered that new 
content wasn't being indexed.

`api-gateway--prod` failed with a full disk but was also apparently failing highstate with nowhere to write the daily
update log file until some space was freed and the next daily highstate was performed. In this case, the PostgreSQL 
database couldn't write to it's journal file and was in an error state.

## stabilisation steps

`profiles--prod` was stabilised by double the timeout of the uwsgi harakiri value to 20 seconds and the nginx read 
timeout value to 21 seconds. The failures with the monitor stopped immediately.

`search--prod` had log files manually emptied to free up space and a new index was built.

`api-gateway--prod` had log files manually emptied, PostgreSQL restarted, it's journal was rebuilt and then highstate 
ran to restart Kong. It appears to have continued working fine with no alerts that it's database was in a bad state until 
highstate failed.

## corrective actions

The root problem with `profiles--prod` taking very long to respond remains unresolved but some debugging was required 
to find the cause of the failed monitor as it wasn't clear anywhere that it was related to `profiles--prod`. 
NewRelic should be checking and reporting problems with `profiles--prod`. Ticket here: https://github.com/elifesciences/issues/issues/5657

The problems with `search--prod` took a long time to surface. And the remediation steps (a re-index) failed in several 
places. The re-index problems are [documented here](https://github.com/elifesciences/issues/issues/5664) but more could
be done to detect content not being indexed. 

`api-gateway--prod` and `search--prod` both suffered from full disks because of log files. These log files are sent 
directly to Loggly for indexing. It is convenient on occasion to have them on disk but we don't need them there in such
quantities growing indefinitely. I recommend revisiting their logging rules and ensure they are rotated at a given byte 
size rather than number of rotations. This is typically per-application and may not be possible. 
Another solution is attaching an external disk to projects whose log files are prone to explosive growth and have the 
logs written there. A full external disk wouldn't affect the root disk.


