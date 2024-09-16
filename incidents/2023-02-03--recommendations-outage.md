# 2023-02-03 recommendations outage

## Description

For ~36hrs over 2023-01-31 - 2023-02-02, `recommendations--prod` was returning 5xx errors.

The cause was `lax` dropping support for VOR v5 content type requests and `recommendations` not having been upgraded to support VOR v6.


## Timeline

Dates and times are in ACDT (+10:30)

2023-01-31:

* 1100: Luke merges completed work on `lax` to support VOR v7.
* 1125: Jenkins `prod-lax` job triggered.
* 1135: Jenkins successfully deploys changes to `lax--prod` nodes.
* 1139: NewRelic alerts us with a "Error percentage > 5% for at least 5 minutes on 'journal--prod'" alert.
* 1140: Luke starts investigation into cause of errors in `journal--prod`.
* 1337: Luke gives up attempting to upgrade the `recommendations` project to support VOR v7 and creates ticket #8089

2023-02-01:

* 2338: update to `recommendations` to support VOR v6 is merged into the `master` branch.
* 2344: Jenkins fails to deploy changes, smoke tests return 502 errors.
    - this actually deployed the changes, the smoke tests just failed too quickly.
* 2359: NewRelic closes "Error percentage > 5% for at least 5 minutes on 'journal--prod'" alert.

2023-02-02:

* 0009: build is kicked by Nathan and Jenkins successfully runs job, smoke tests return 200 responses.

## Contributing Factors

* uncoordinated changes to journal infrastructure.
* `recommendations` not upgraded to support VOR v6 when it was released.
* busy period during switch to PCR.

## Stabilization Steps

* none, `recommendations` was left broken until it could be upgraded.

## Impact

* `recommendations--prod` was not serving recommendations to the journal for 1.5 days.
* 80.6k errors in the journal with stacktraces creating something of a Loggly log flood.

## Corrective Actions

* `recommendations` was added to the list of services to be upgraded in the article feature coordination issue template.
* `recommendations--prod` was upgraded.

