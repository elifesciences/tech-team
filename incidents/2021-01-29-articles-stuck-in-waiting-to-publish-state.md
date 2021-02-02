# 2021-01-29 Articles are Stuck in the 'Waiting to Publish' Stage

**Incident Leader: Joel Summerfield**

## Description

Several of the automated workflows for the production team suddenly started to fail, resulting in various issues the most notable of which are listed below.

## Timeline

**2021-01-29**

- 12:18 Production team raise a [new issue](https://github.com/elifesciences/issues/issues/6431) in GitHub

- 13:22 Mael notifies Joel on Slack about the issue, and it's urgency.

- 13:50 Joel starts investigating the issue, starting by creating a [new thread](https://elifesciences.slack.com/archives/C6N559E2F/p1611928211001500) in the '#incident-response' channel on slack. And reaches out for help from Giorgio.

- 14:00 Joel notes there are no alerts from New Relic, nor any issues CPU usage, disk space or memory consumption on the `elife-bot` production instances. There aren't any reported AWS outages either. 

- 14:09 Giorgio joins the debugging effort.

- 14:20 Checked the AWS SWF dashboard, which confirmed that various workflows were timing out and the issue was indeed with the `elife-bot`.

- 14:50 With Giorgio's help, it appears that the 5 worker processes have stalled. They are still running, but none are picking up any work nor outputting to their logs. Looking at the logfiles from the the previous day, we can see that they should be rather noisy and hence the empty logs are suspicious. We manually start a new worker process, and that imediately starts to process work from the queue. We then kill the 5 stalled worker processes, which then automatically respawn and things appear back to normal.

- 14:51 James from production confirms that things are working now. Hence the issue has been mitigated for now.

- 16:49 Graham Nott re-runs the failed workflows from earlier in the day. 

## Contributing Factor(s)

- No alerts or monitoring detected that the was an issue brewing on the server.

## Stabilization Steps

- Checked Disk Usage, CPU usage and Memory consumption.

```
top
df -H
```

- Checked log files for signs of errors

```
sudo tail -n 500 /var/log/syslog
sudo egrep /var/log/syslog
journalctl -a
journalctl -n 100
```

- Checked currently running processes

```
ps -faxw | grep python
```

- Checked the `elife-bot` log files for any issues.

```
cd /opt/elife-bot/
ls -lh *.log
```

- Noticed the worker log was empty, which seemed suspect. Hence looked at those in more detail including the previous logs, this confirmed that output had the workers had stopped writting to the log files late the previous day 28th Jan.

```
less worker.log
less queue_worker.log
less queue_workflow_starter.log
zless worker.log.1.gz
journalctl -u worker@0.service
```

- Spawned a new worked, and then in anothor SSH session monitored the worker log for signs of life.

```
ps -faxw | grep python
/opt/elife-bot/venv/bin/python worker.py -e prod 5

cd /opt/elife-bot/
tail -f worker.log
```

- Killed the stalled worker processes, which systemd respawned bringing the system back to life.

```
ps -faxw | grep python
kill -9 25690
kill -9 25709
kill -9 25739
kill -9 25763
kill -9 25790
```

- Checked the [dashboard](https://prod--ppp-dash.elifesciences.org/current) to see if things were working again.

## Impact

- PoA articles have not generated from the 3 packages exported from eJP.
- Features aren't getting processing notifications from digest uploads.
- Attempts to publish are getting stuck at the waiting to publish stage.
- Expect more, but these were the workflows that happend to fail at the time.

## Corrective Actions

- [Improve handling of FTP transfer timeouts](https://github.com/elifesciences/issues/issues/5603)
- [Investigate if we can improve monitoring to detect the issue](https://github.com/elifesciences/issues/issues/6435)
- [Create a playbook for elife-bot](https://github.com/elifesciences/issues/issues/6437)
