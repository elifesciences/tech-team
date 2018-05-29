# 2018-04-24 9.5hr journal outage

## Description

All nodes on journal--prod failed highstate, journal left broken for many hours.

## Timeline

(UTC+9:30)

6:54am - First alert from Loggly that highstate had failed

9:20am - Investigation into highstate on journal--prod

9:27am - Website check, looks like it's running

10:35am - Finished investigation, email to techalerts. Conclusion: low-priority bug.

3:54pm - Alert from Chris that journal is actually down

4:01pm - Chris merges fix

4:03pm - Updating master-server and journal--prod nodes

4:08pm - Journal responding to requests again

4:15pm - All nodes updated

## Contributing Factors

* CDN fooled me into thinking website was running
* it's common for failed states to allow the application to continue working
* changes to application passed CI
* apart from highstate failure reported by Loggly, no other (related) alerts to journal being down

## Impact

Journal was (mostly) down from approx 7am to 4pm (9hrs)

## Corrective actions

* Journal should be dockerized to ease the amount of setup on multiple servers e.g. [ELPP-3323](https://elifesciences.atlassian.net/browse/ELPP-3323)
* builder should be used through a pipeline to do daily updates on user-facing projects like Journal: [ELPP-3663](https://elifesciences.atlassian.net/browse/ELPP-3663)
* NewRelic should be checking the website is up and responding from a non-CDN url: [alert](https://synthetics.newrelic.com/accounts/1451451/monitors/dff9c974-d446-4057-9ea0-eee1d0ca18b6).
