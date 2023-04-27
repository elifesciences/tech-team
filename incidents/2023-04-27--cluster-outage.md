# 2023-04-27 The cluster failed to deploy a new release of EPP

## Description

The cluster nodes hit a disk space limit, preventing the latest release of EPP client from deploying.

## Timeline

2023-04-27:

- 10:49: Ash is notified by Andy that [EPP Prod](https://elifesciences.org/reviewed-preprints/87147) is down
- 10:49: EPP Team acknowledges at the time of notification
  - Scott begins an investigation and fix
- 11:06: Scott confirms EPP Prod is back up

## Contributing Factors

- Not enough disk space in the cluster
- Build images are unnessessarily large

## Stabilization Steps

- Added a node to the cluster
  - Adds more disk space (no history)
  - This supposedly allows EPP Client to deploy, this in unclear

## Impact

- Enhanced preprints were inaccessible
- MTTD: Instant
- MTTR: 17 mins

## Corrective Actions

- Reduce size of the images
Or
- Increase disk space per node (currently 20 GB)
