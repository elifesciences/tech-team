# 2023-01-27 search outage

## Description

For ~13.5hrs over 2023-01-26 - 2023-01-27, `elife-metrics--prod` was unreachable.

The cause was a "degradation of the underlying hardware hosting" the ec2 instance.

## Timeline

Dates and times are in ACDT (+10:30)

2023-01-26:

* 1955: NewRelic alerts us with a "Host Not Reporting" alert.
* 1956: journal healthcheck fails.
* 2228: AWS alerts us with a "degradation of the underlying hardware hosting" alert.

2023-01-27:

* 0900: Luke comes online.
* 0901: `elife-metrics--prod` is told to stop.
* 0914: `elife-metrics--prod` is force stopped.
* 0917: `elife-metrics--prod` is started.
* 0919: NewRelic "Host Not Reporting" alert is closed after 804 minutes.

## Contributing Factors

* hardware fault for failure.
* nobody addressed the alert.

## Stabilization Steps

* ec2 instance was forcibly stopped via the AWS console after a regular 'stop' via builder timed out. ec2 instance was started again via builder.
* highstate was run manually successfully being brought back up.

## Impact

* `elife-metrics--prod` was unavailable for ~13.5 hrs.
* no metrics data displayed on journal.
* ...

## Corrective Actions

* a load-balanced/redundant ec2 instance in a separate AZ would allow the service to continue running despite human availability to fix individual node problems.
* ...

