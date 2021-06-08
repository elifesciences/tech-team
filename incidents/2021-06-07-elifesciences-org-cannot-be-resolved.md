# 2021-06-07 Unable to Resolve elifesciences.org

**Incident Leader: Joel Summerfield**

## Description

After using builder to create an ad hoc instance of Journal, which failed, the rollback failed to recreate a DNS A record for elifesciences.org and as such nobody could access the journal using the primary address.

## Timeline

**2021-06-07**

- 12:03 Joel runs the builder command `./bldr launch:journal,mathjaxv3,prod` to create an ad hoc ec2 instance of journal with a production configuration. The command fails, and builder automatically performs a rollback.

- 12:09 Suspicious from output from the failure, Joel checks and notices that accessing `elifesciences.org` is no longer working, however accessing `https://prod--journal.elifesciences.org/` still works. Clearly there was a connection with the command I'd try to run, and the outage. Joel starts a [new thread](https://elifesciences.slack.com/archives/C6N559E2F/p1623064161001500) in the #incident-response Slack channel asking for some help from Giorgio.

- 12:10 Peter Rodgers confirms that he is seeing the same issue with accessing the Journal.

- 12:12 After checking the holiday calendar in Breathe HR, Joel realises that Giorgio is on holiday and asks for some help from Daniel H instead.

- 12:13 Daniel H joins Joel in a Google Meet and together they start to investigate the problem.

- 12:20 Joel and Daniel use CloudTrail to view the events, and can see that the above operation [did indeed make some adjustments to DNS records](https://console.aws.amazon.com/cloudtrail/home?region=us-east-1#/events/a8877f8f-c35f-463b-bd10-5feaafb7c9340).

- 12:25 After some investigation, Daniel H runs `./bldr update_infrastructure:journal--prod` with the intent to bring resources in line with the desired state defined in builder. The command succeeds, but as far as builder was concerned the infrastructure is in the expected state and hence it was a no-op.

- 12:30 Next hunch is that the issue might be in Fastly, but without access to the 2FA phone neither Daniel or Joel can login.

- 12:36 Joel emails Luke to see if he is available to join the debugging effort.

- 12:40 Luke joins the debugging effort.

- 12:43 Confirm that EC2 instances and LoadBalancers are all OK.

- 12:45 Luke can access Fastly, and after an initial look the configuration looks OK.

- 12:50 We start to build a picture of how the DNS is setup and how traffic should be routed, Route53 -> Fastly -> EC2 Load Balancers -> journal--prod-(1/2/3).

- 12:55 We confirm in Route53 that there is no entry for `elifesciences.org`.

- 13:00 We re-review the CloudTrail events and CloudFormation templates and confirm that the DNS entry for `elifesciences.org` has been deleted from Route53.

- 13:07 We manually recreate the A record in Route53 for `elifesciences.org` based on the information in the CloudFormation template, Setting it to point at the IP addresses for Fastly.

- 13:09 Confirm that `elifesciences.org` is resolving correctly and the Journal is back up.

- 13:14 Joel posts [a message](https://elifesciences.slack.com/archives/C025LBBR4/p1623068061016300) in the #general channel in slack to let everybody know about the incident, confirming that it is resolved and that in some cases it might take up to an hour for DNS to update.

## Contributing Factor(s)

- Lack of understanding/experience around launching ad hoc instances using `builder`. In this specific case, it probably would've been wise to review what resources would be impacted by trying to launch a new instance of journal.

## Stabilization Steps

- Tried to use builder to restore the correct state, this failed as it thought everything was up-to-date but it was the correct thing to try.

```
./bldr update_infrastructure:journal--prod
```

- Checked CloudTrail to get a step-by-step view of what the `./bldr launch` command had tried to change, and then after it failed what it had tried to roll back. We could see that it had during the `launch` phase made 3 changes to Route53, but during the `rollback` it had only made 2.

## Impact

- Unable to access the journal via the `elifesciences.org` address.

## Corrective Actions

- [Investigate why elifesciences.org dns record was deleted](https://github.com/elifesciences/issues/issues/6713)
