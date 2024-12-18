# 2024-12-10 - Reviewed Preprints 500 Error

**Incident Leader: Nathan Lisgo**

## Description

Users were unable to access Reviewed Preprints pages on December 10th due to persistent 500 Internal Server Errors. The issue was caused by a failure in handling non-standard response codes from the Metrics API. This resulted in all Reviewed Preprints pages being inaccessible to users, with no fallback from caching or the CDN.

## Timeline

2024-12-10

* ~00:01: Metrics API response failures logged
* ~00:12: techalerts@elifesciences.org notified of Metrics API response failures
* ~06:00: Metrics API becoming fully unresponsive (occassionally succeeding)
* 08:54: Fred reports the issue in the `#incident-response` Slack channel, stating all Reviewed Preprints pages are returning 500 errors. He includes a screenshot.
* 09:05: Ash acknowledges the error in `#incident-response` and posts in `#epp-team-babbage` to call on developers for investigation.
* 09:25: Aisha begins investigation
* 09:34: Aisha responds in `#epp-team-babbage` stating she has restarted the deployments but is unsure of the source of the problem.
* 09:34: Hazal offers assistance to pair on debugging.
* 09:38: Aisha identifies the error as originating from the EPP server application and suggests pairing with Hazal to debug further. A Google Meet session is initiated.
* 10:00: The team confirms the issue is with the server application. Aisha begins reviewing recent commits and logs to identify possible causes.
* 10:05: Aisha reverts a renovate commit (`fix(deps): update dependency @smithy/util-stream to v3.3.2`) merged at 10:46 PM on December 9th to rule out its involvement. This does not resolve the issue.
* 10:11: Ash provides an update in Slack: "Aisha has locally reverted a server utility function commit, but the error persists."
* 10:50?: The team identifies that the 500 errors are caused by a request made to the Metrics API, which fails to handle non-standard response codes (e.g., 2xx, 404).
* ~10:50: Ali runs high-state on Metrics service. Succeeds but doesn't improve things.
* 10:53: Ash updates the team: "We've identified a Metrics API work completed yesterday may be the root cause. We are working to resolve the issue and ensure such upgrades don’t cause the same impact in the future."
* 11:00: A fix is committed to the server application to log errors from Metrics API requests instead of throwing them: [Commit: 4dad1f1](https://github.com/elifesciences/enhanced-preprints-server/commit/4dad1f10622070fbefa6b42a3c4bca3dbdeac115).
* 11:17: The fix is deployed to staging, resolving the 500 errors. Reviewed Preprints pages are visible again without metrics data.
* 11:22: The fix is deployed to production, resolving the issue for all users. Reviewed Preprints pages are accessible but do not display metrics.
* 12:32: Ali sends report to Scott of Metrics server issues
* 13:20: Scott begins investigation. Kernel level error. Restarted Metrics server. Still choppy for 10 minutes and then remained resilient. Increased workers to Metrics server from 4 to 8 (not clear that this has had any impact).

## Contributing factors

* Developers were travelling

## Stabilisation steps

* The team identified and reverted a renovate commit to rule out its involvement. (unrelated, it has been reintroduced)
* Collaboratively debugged the Metrics API's behaviour and identified the root cause.
* Committed and deployed a fix to the EPP server application, logging Metrics API errors as soft failures rather than throwing them.
* Verified the fix on staging and production, ensuring Reviewed Preprints pages were accessible again.

## Impact

* All users attempting to access Reviewed Preprints experienced 500 errors.
* Reviewed Preprints pages were inaccessible for approximately 5 hours 22 minutes (MTTD: ~2:54 | MTTR: ~2:26 after detection).
* Metrics data was unavailable on Reviewed Preprints pages after resolution briefly.

## Corrective Actions

*Because we ran out of time in the post-mortem we are going to have to progress on this section asynchronously. If your name is against it please could you be responsible for tidying up the bullet point. Create a ticket, if appropriate and link to the ticket. We are really looking for small changes that can be made that will offer great value.*

*Once you have finished with the action then remove your name from the bullet point.*

* Turn on fastly for EPP/Journal on reviewed preprints (https://github.com/elifesciences/enhanced-preprints-issues/issues/1228)
* ? More descriptive logs (agree on framework for logs) (Hazal)
* ? Better monitoring of services (Will/Scott)
* ? Google meet chat is lost after incident (Aisha)
* ? Better handling of third party requests in application (Scott)
* ? Incident frequency - value in recording and surfacing metrics (Ash)
* Address clone db script failing (https://github.com/elifesciences/enhanced-preprints-issues/issues/1226)
* ? Documentation/tooling - to assist debugging and response - playbook (Will/Aisha)
* ? testing for resilience (Nathan)
* ? Fake drills (Scott/Paul)
* Schedule 2 hours for future post-mortems
