# 2023-01-18 search outage

## Description

For ~3hrs 2023-01-18 `search--prod` was serving 5xx responses to API requests.

The cause was a change to the `search` pillar data that wasn't triggered until the daily update occurred.

## Timeline

Times are in ACDT (+10:30)

* 0341: a change to `builder-configuration` is merged
    - https://github.com/elifesciences/builder-configuration/commit/6024b09c6954c668f62c64bf7b6067bc98af2c92
* 0801: daily system update is run on `search--prod--1` and fails
* 0814: daily system update is run on `search--prod--2` and fails
* 1000: Luke comes online, notices mixed highstate failures in Loggly alerts
    - failures for journal-cms, and search
    - I'm not concerned
        - daily highstate failures don't typically end in an unresponsive system
        - I wasn't aware of any changes having been made to `search`
* 1015: an open NewRelic alert for the journal is investigated
    - we've been having problems with distributed bots and spikes in traffic recently.
        - there was nothing too special abusing the site this morning
    - I'm side tracked by all of the Jenkins `test-journal-cms` failure emails
        - Nathan is still awake and kicking off new test-journal-cms builds and we have a conversation
        - I'm side tracked again by investigating a journal-cms composer 2 PR and explaining what needs to happen
        - I investigate one of the broken journal-cms builds and it looks like search--end2end is returning 503 errors
            - https://alfred.elifesciences.org/blue/organizations/jenkins/test-journal-cms/detail/test-journal-cms/1071/pipeline
            - I correlate it with the highstate failures I saw but I'm still not concerned.
    - I return to investigating bot traffic for cause of elevated error rate
        - https://prod--journal.elifesciences.org/status has 'search' in red with a 503 message
    - I investigate the error message in the salt logs
        - a Jinja template in the `search-formula` depends on the pillar data `reviewed_preprints`, but it's missing.
* 1102: the offending commit is discovered and a quick fix is issued
        - https://github.com/elifesciences/builder-configuration/commit/42a14c89a5b1eff179cf7cd5d481ce14f075c9b4
* 1104: highstate is run on `search--prod--1` with success
* 1105: highstate is run on `search--prod--2` with success
* 1106: restored, https://prod--journal.elifesciences.org/status for 'search' is now green on refresh

## Contributing Factors

* ...

## Stabilization Steps

* pillar data with empty dictionary added followed by a highstate on `search` nodes

## Impact

* `search--prod` was returning error responses for 173mins
* ...

## Corrective Actions

* ...
