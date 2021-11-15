# 2021-11-15: ALB runs out of functioning nodes

## description

The ALB removed nodes from it's Target Group until only one remained and then that remaining node ran out of credits 
after ~3 days. 

## timeline

UTC/ACDT

03:16/13:46 - New Relic reports "Error Percentage (High)"

* I click the acknowledge button and go investigating any spikes in traffic.
    - these errors are typically enthusiastic bots, or a confluence of bots
* I'm not logged in to NewRelic so it was never acknowledged.
* traffic seems normal. I block a couple of random bots that are iterating through the corpus just in case with no effect.

03:19/13:49 - New Relic reports "Journal (bypass CDN)"

* I acknowledge again and log in to NewRelic this time.
    - these are typically more serious
    - I try to load the prod--journal.elifesciences.org/status in browser, no luck
    - I check Fastly for any spikes in traffic. There is a slight bump but nothing drastic.

03:21/13:51 - New Relic reports "journal--prod--2 'cpu steal'"

* this is quite unusual.
    - this is essentially the CPU operating without credits.
* I check the CPU Credits and I can see they've been declining for days.
    - CPU credits have been known to behave strangely and fix themselves with a restart.
* I stop the instance through the console
    - it stops without fuss
* I start the instance with builder with the understanding it would add it back to the load balancer
    - ./bldr start:journal--prod

03:30/14:00 - New Relic reports "elife.* subdomain Check failure"

* error was expected so I ignored it
* I check the CPU Credits on the other nodes, all very high
    - I suspect the load balancer is routing all traffic to a single node
* I check the ALB Target Group and only one node is attached
    - the one I just stopped and started.
* I use the console to add nodes 1 and 3 back into the target group
    - the command I just ran should have done this, but if it didn't I have no time to debug why

03:37/14:07 - New Relic closes New Relic reports "Journal (bypass CDN)"
03:39/14:09 - New Relic closes "Error Percentage (High)"
03:40/14:10 - New Relic closes "elife.* subdomain Check failure"
03:41/14:11 - New Relic closes "journal--prod--2 'cpu steal'"

## stabilisation steps

Added nodes back to the target group through the console.

## impact

Maximum of 20mins of downtime and/or degraded performance.

## corrective actions

...
