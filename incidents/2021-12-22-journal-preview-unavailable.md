# 2021-12-22: Journal Preview is Unavailable

**Incident Leader: Joel Summerfield**

## Description

The Production team reported that they were unable to publish content as the 'preview' feature in the continuum dashboard was not working.

## Timeline

**2021-12-22**

- 12:34 Naushin posts in the #general channel on slack asking if anybody knows who to contact if they are having issues with continuum.

- 14:12 Dave Price responds letting her know to contact either Paul Shannon or Joel.

- 14:33 Paul Shannon responds, and suggests that a part of the infrastructure might need restarting and @ mentions Graham Nott and Joel Summerfield. He also suggests that Naushin posts in the #incident-response channel as that will automatically notify various menbers of the team.

- 14:34 Naushin posts on the #incident-response channel that there is an issue with Continuum that is preventing the production team from publishing any content.

- 14:35 Paul Shannon messages Joel Summerfield directly in slack to let him know that there is a problem.

- 14:52 Chris Huggins responds and lets Naushin know that the majority of the tech team are on leave, but @mentions various people to make them aware of the issue.

- 15:14 Various active team members respond, but are unsure about how to debug or resolve the issue on the assumption that it is an infrastruture issue.

- 15:46 Joel comes online, and starts to investigate the outage.

- 16:32 After checking the SWF workflows, and concluding that the errors in the elife-bot's logs are not the root cause of the issue I spot that the `journal-preview` ec2 instance is in a dimished/unreachable state. Joel tries to first reboot, then force reboot the instance from the management console and cli with no success.

- 16:38 Figruing that the underlying ec2 hardware is the issue I decide to stop and start the instance to transition it to a new node, the stop is successful but I am unable to start the instance with a `Insufficient capacity` error. These leads me to check the AWS status pages and confirm that there was a power outage in a datacentre in the `us-east-1` region and this has caused the `journal-preview` and `journal-prod-3` instances to fail. As the datacentre is still being bought online I will have to wait until the instance can be restarted.

- 16:54 Joel manages to start the instance, and confirm that it is running by ssh.

- 17:00 Joel spots that the Route53 DNS record is still pointing at the old ip, and manually updates the record in the Route53 dashboard. This allows me to test and confirm that the relevant articles can now be previewed.

- 17:02 Claudia from the production team confirms that the preview function from the dashboard is now working.

- 17:09 Claudia confirms that she has now successfully published an article.

- 17:25 Joel posts a very short summary of the incident in the #blue-team-tech channel just to make others aware that there was an issue and that it has now been resolved.


## Contributing Factor(s)

- Lack of understanding/experience around who or how to ask for help when something is not working. There was around 2.5 hours between the first messages on slack and a post being created in the incident response channel.

## Stabilization Steps

- Stopped and restarted the affected instance using the AWS dashboard.
- Checked the instance had restarted OK by using builder to ssh into the instance...

```
./bldr ssh
```

- Updated the DNS records in Route53 after failing to access the instance via it's hostname.

## Impact

- Production was unable to complete their pre-publishing checks by previewing the content, and therefore were unable  to publish content journal for approximately 4hr, 30mins.

## Corrective Actions

- Communicate across the organisation guidelines on what to do when there is a technical issue preventing users from acccessing the site, or staff from completing their work.