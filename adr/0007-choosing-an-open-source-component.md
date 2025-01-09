# Choosing an open source component

Date: 2018-01-09

## Status

Proposed.

## Context 

Using poor quality or unmaintained third-party software can be at the least inconvenient, and at the most downright dangerous: for example, it can fail to take advantage of the benefits from the latest technology, and security holes can go unpatched.

Using third-party software that is difficult to maintain integrated in our environment can make updating it difficult, time-consuming or risky.

Using software with an inappropriate license may present a legal risk, or may risk others choosing not to use our software because of the burden the license subsequently places on them.  

We want to minimise exposure to these risks when choosing an open source component to use in the eLife code base.   
            
## Decision
When choosing an open source component, care should be taken to try to choose something that is:

- licensed appropriately
- reliable
- well maintained
- not complex to maintain in our environment

### Must have
 - compatible license
 
### Nice to have
 - issue tracker
 - many maintainers
 - community enthusiasm
 - documentation
 - low complexity to maintain in our environment
 
## Warning signs
 - many open issues
 - customised license
 - few commits
 - exotic code
 - delays in 3rd party PRs getting merged or rejected for no obvious reason

During the inclusion of a library in a pull request, complete the following list and let the maintainers of the project make an informed choice.

- [] license type:
- [] is the license customised?
- [] the there an issue tracker?
- [] open issue count:
- [] commit count:
- [] maintainer count:
- anticipated effort to maintain in our environment:
    - [] low
    - [] medium
    - [] high                       
- [] any exotic code (provide details):

## Consequences

Selection of all future open source components should go through this evaluation process.

This will help maintain the quality of eLife software, facilitate its reuse, and require less maintenance replacing unmaintained components so increasing the work not done.
  
