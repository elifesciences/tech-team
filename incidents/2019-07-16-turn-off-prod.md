# 2018-11-12

**Incident Leader: Giorgio Sironi**

## Description

## Timeline

- 14:25: bad API call during `builder` development 

- 14:36: `prod` up

- 14:39: everything up, but Vault remains sealed. However, the file /etc/profile.d/elife-xpub-configuration.sh on the servers should still be fine

- 14:44: bad API call identified

- 21:15 (21:45 on even servers) the daily update runs Salt and since the Vault is sealed, the credentials are replaced with the defaults that do not come from Vault

- 22:54 first user on Hotjar recorded as not being able to login

- 2019-07-17 8:00: Giuliano asks "have you seen the Hotjar responses?"

- 2019-07-17 8:06: Xpub login problem in #incident-response

- 8:11: Vault unsealed

- 8:16: `elife-xpub--prod` deploy completed

- 9:47: test submission performed (due to emails to Susanna) in `prod`

- 10:05: `elife-xpub--staging` restored too

## Contributing Factor(s)

- development of infrastructure code affecting `prod`
- good configuration falling back to default (not working) configuration
- lack of alerts on sealed Vault
- no validation of configuration on xpub boot

## Stabilization Steps

- restart of all affected serves through `builder`
- [vault unseal](https://github.com/elifesciences/it-admin/blob/master/vault.md)
- [deploy of `elife-xpub--prod`](https://alfred.elifesciences.org/job/prod-elife-xpub/)

## Impact

MTTD: 9h06m (overnight)

MTTR: 16m

## Corrective Actions

- investigate a IAM rule to forbid turning off `prod` EC2 instances accidentally
- monitoring of Vault status?
- stop Salt from running (deployment, daily update) if Vault is sealed or inaccessible, for a certain set of projects/environments
- elife-xpub status page
- New Relic Synthetics monitoring of elife-xpub status page
