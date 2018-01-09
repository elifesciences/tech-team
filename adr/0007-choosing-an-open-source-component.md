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
- sustainable within our environment

### Licensing

[should we specify this in terms of an explicit list of acceptable licenses, or in terms of what we need a licence to allow us to do?]

### Reliability

- Check the code: are there any obvious code smells?
- Try out the code: does it behave as expected? Are there any idiosyncrasies in behaviour or usage that may indicate a design problem? A design problem may make bugs more likely, and may make it harder to fix them.  
- Check the issues (open and closed): how many bug reports are there? How frequently are they reported?

These steps should help form a view of the likely reliability of the component.

### Well maintained

- Are there a decent number of recent commits? This will indicate whether it's under active development. Avoid it if it's not.
- How far back do the commits go? This will indicate how mature the library is. Take extra care to assess its reliability if it's quite immature. Immaturity may be a reason to decline to use it if there are equivalent, mature alternatives.
- What is the average lifespan of pull requests? You might want to put in a pull request yourself: is the turnaround reasonable for your needs?
- How many people have interacted with the repo recently? A larger community is a good indication that bugs will be identified quickly, and improvements be made quicker than otherwise.  
- How many people have merged in pull requests? A large component is more likely to be sustainable if more than one person has the ability to merge pull requests.



### Sustainable within our environment

Is there an obvious, easy integration path for its intended use, or will some hoop-jumping be required? The easier the integration is, the easier it is likely to be to keep it up-to-date within its eLife-useage context. This means easier overall maintenance of the eLife product. 

## Consequences

Selection of all future open source components should go through this evaluation process.

This will help maintain the quality of eLife software, facilitate its reuse, and require less maintenance replacing unmaintained components so increasing the work not done.
  
