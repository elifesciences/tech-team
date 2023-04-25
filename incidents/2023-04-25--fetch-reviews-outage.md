# 2023-04-25 Enhanced Preprints Client outage after a DataHub API release

## Description

As a consequence of a DataHub update removing an API endpoint, The enhanced preprints (EPP) server was unable to fetch reviews from DataHub Docmaps. This caused fetch requests in the EPP client to fail, so reviewed preprints failed to load.

## Timeline

(All times are in local UK time [GMT+1])

2023-04-19

- 15:21: Hazal sent an email asking for opinions for "removing support from the get-by-doi end point in the Data Hub Docmaps API" to the following recipients:
  - Fred
  - Graham
  - Nathan
  - Scott
  - Daniel

2023-04-25

- 15:20: The flux cluster is updated with a new version of data-hub-api
- 15:31: Fred notifies Nathan that certain preprints are not working
- 15:45: Scott raises a [PR in EPP Server](https://github.com/elifesciences/enhanced-preprints-server/pull/675) to address the data-hub-api update
- 15:56: Elliot raises a [PR in EPP Client](https://github.com/elifesciences/enhanced-preprints-client/pull/621) to remove versions from the reviews request
- 16:09: Scott's PR is merged into master branch
- **16:10: The data-hub-api version is rolled back**
- 16:21: The wider team is notified that reviewed preprints have returned
- 17:18: The EPP server is reverted to synchronise the EPP server and client fixes

2023-04-26

## Contributing Factors

- The EPP team was preoccupied with a 3-day workshop (2023-04-17 to 2023-04-19) when the initial email was circulating.

## Stabilization Steps

- data-hub-api is initially rolled back until the EPP team has a fix prepared

## Impact

- MTTD: Near instant
- MTTR: 60 mins

## Corrective Actions
