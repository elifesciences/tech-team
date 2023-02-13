# 2023-02-13 EPP Prod outage

## Description

EPP preprint pages were throwing a 500 error. The cause of the 500 was due to the EPP server pod being not ready, and not routable from EPP client

## Timeline

2023-02-13:

* 0717: Routine cluster component upgrade merged in the `epp-flux-cluster`
* 0734: prometheus monitoring sent a KubPodCrashLooping #cluster-alerts
* 0820: Fred Atherden sent a message to #incident-response
* 0824: Scott Aubrey jumped off a call and started to look into the problem. Discovered the `git-sync` container was stopped with error logs indicating an issue with the data directory:

    `E0213 08:34:12.160850      10 main.go:535] "msg"="too many failures, aborting" "error"="Run(git rev-parse HEAD): exit status 128: { stdout: "", stderr: "fatal: detected dubious ownership in repository at '/articles' To add an exception for this directory, call: git config --global --add safe.directory /articles" }" "failCount"=1`
* 0827: Scott Aubrey deleted the epp-server pod to see if a clean data directory would clear the issue
* 0828: EPP came back, but the error reoccurred and eventually was removed from the service as not ready again
* 0845: research into the error and git-sync issues returned no results, but Scott remembered that `git-sync` container had been updated in the morning.
* 0846: skimming changelog again didn't show any behaviour changes listed, but downgraded it anyway.
* 0851: EPP server confirmed to be back up and working.

## Contributing Factors

* Upgraded `git-sync` not mentioning any change in behaviour in the changelog
* early morning call with Luke Scott didn't notice the alerts or outage
* The cluster has been throwing alerts on a regular basis due to issues with ephemeral resources (alert fatigue)

## Stabilization Steps

* Downgrading problematic software upgrade

## Impact

* `epp--prod` was unavailable for ~1.5 hrs meaning no uncached reviewed preprints were able to display on the journal.

## Corrective Actions

* Not upgrading cluster components before Monday morning call.
* clearing the cluster issues causing regular alerts to fire.
