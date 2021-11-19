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
* I check the ALB Target Group via the console and only one node is attached
    - the one I just stopped and started.
* I use the console to add nodes 1 and 3 back into the target group
    - the command I just ran should have done this, but if it didn't I have no time to debug why

03:37/14:07 - New Relic closes New Relic reports "Journal (bypass CDN)"
03:39/14:09 - New Relic closes "Error Percentage (High)"
03:40/14:10 - New Relic closes "elife.* subdomain Check failure"
03:41/14:11 - New Relic closes "journal--prod--2 'cpu steal'"

## stabilisation steps

Added nodes back to the target group through the console.

The builder approach should have been:

    ./bldr deploy.load_balancer_register_all:journal--prod

## impact

Maximum of 20mins of downtime and/or degraded performance.

## investigation

Feedback from AWS support pointed us to Cloudtrail and the load-balancer target-group deregistration events.

There were events by the 'elife-alfred' user traced back to a failed `journal--prod` blue-green deployment.

During a blue-green deployment, the project's nodes are split into two groups and updated one group at a time.

The nodes are removed from the load balancer so they don't receive traffic while updating and then updated in parallel.

Something happened during the upload of the bootstrap script on one of the nodes that isn't clear and it exited with a 
return code of 1. The other node completed it's update successfully.

This failure meant that the second group was not updated and left alone, presumably until the problem in the first group 
was rectified.

As there are only three nodes in the journal--prod group, we had a group of 2 nodes and a group of 1 nodes and the 2-node 
group was deregistered first leaving a single node to handle traffic for half of friday, the weekend and half of monday.

The corrective action of adding the nodes back into the load balancer meant that the journal was operating with software 
in an inconsistent state.

node 1: failed to update, in the same state as node 2
node 3: successfully updated, running a different version of the journal to nodes 1 and 2.

A better solution to this incident would have been:

1. add the nodes back to the load balancer (as was done), either by the console or builder.
    - nodes would be in an inconsistent state but this is better than not serving traffic.
2. run the [prod-journal](https://alfred.elifesciences.org/job/prod-journal/) pipeline in Jenkins once the CPU Credits and NewRelic Apdex had improved.
    - this would have run the 'Deploy to prod' step that would do the blue-green deployment again.
    - the `build_vars` on each of the nodes would have been made consistent and highstate would have made the rest of the system consistent. 

## corrective actions

- [x] create a NewRelic alert for journal nodes that become suspiciously idle for a period of time
- [x] increase the number of journal nodes from 3 to 4 so that blue-green partitioning never leaves a group of 1 to cope with all traffic.
