1436 - alert that CDN check has failed
1436 - acknowledged
1436 - alert that annotations--prod is not reporting
1437 - acknowledged
1438 - attempted ssh
        - eventually timed out
1438 - investigating newrelic report
        - flatlined, nothing sent to newrelic since ~14:30
        - see screenshot
1440 - investigating aws status
     - two failed statuses
        - instance is locked up and unresponsive
        - see screenshot
1441 - stopping annotations--prod
        - not authorised
1442 - dropping permissions
1442 - trying again
1443 - success
1443 - starting instance
1444 - started, took 27secs
1444 - running highstate, just to be sure
1446 - complete, all green

NewRelic reported downtime is about 11 or 12 minutes from first alert being opened.
Actual downtime was probably from 16 minutes.
