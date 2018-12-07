# 2018-04-19 - Journal CMS database leak

**Incident Leader: Nathan Lisgo**

## Description

A database dump of production Journal CMS was committed to the public Journal CMS (Drupal) git repo.

## Timeline

2018-03-28 PR 288 (redacted) the database was included in a commit on the pull request. The exact date was unknown but this is when the PR was opened.

2018-04-17 16:39 Merged into default branch on Journal CMS repo 

2018-04-19 14:59 Discovered by giorgio in the project codebase on github

15:22 Made the github repo private

16:05 Reset password check failed because server could not send email

16:10 Added postfix to the formula and deployed change to production

16:20 Manual change to "from email address" (admin@example.com to journal-cms@elifesciences.org) on production Journal CMS

16:50 Changed passwords for all users on production instance of Journal CMS

16:54 Notified eLife staff that passwords had changed and that they would need to reset their passwords to gain access

17:37 PR 297 prepared to set "from email address" configuration in code

17:38 PR 297 failed end2end because the password for the test user had changed

23:00 "from email address" reset to admin@example.com with state.highstate

2018-04-20 10:00 Manual change to "from email address" (admin@example.com to journal-cms@elifesciences.org) on production Journal CMS

11:00 PR 297 merged to set "from email address" configuration in code

## Contributing Factor(s)

- Production database needed locally
- Software let us commit and push a sensitive file

## Stabilization Steps

- Made repo private
- Reset all passwords
- Informed affected users

## Impact

- 20-60 days of database exposure with hashed salted user passwords
- Journal CMS repo inaccessible to public

MTTD: 20-60 days
MTTR: 1 hours 55 mins

## Corrective Actions

- Contacted github support for removal (GIORGIO)
- Evaluation of the hash algorithm (NATHAN)
- Clean up users who no longer need access (NATHAN)
- Git configuration review ()
- Strip user passwords from one of the nightly database dumps (NATHAN,GIORGIO)
- Delegate authentation of Journal CMS (NATHAN)
