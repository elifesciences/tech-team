# Supported Python Versions

Date: 2017-11-20

## Status

Proposed

## Context 

eLife has numerous projects written completely and partly with the [Python programming language](https://www.python.org/).

In order to provide language version consistency across projects we need to get a consensus on which versions we are going to support. 

## Descision

We will use Python 2.7.14 as our default version for any project that solely uses or supports Python 2.

We will use Python 3.6.3 as our default supported version for any project that solely uses or supports Python 3.

## Consequences

Remote environments that come with Python 3.5 as their default Python 3 interpreter and that can't easily install Python 3.6 may not be able to adhere to this.

Projects that support Python 3.6 will gain from the numerous benefits of the release:

* Improved memory usage for Dictionaries:
The dict type now uses a “compact” representation based on a [proposal by Raymond Hettinger](https://mail.python.org/pipermail/python-dev/2012-December/123028.html) which was first implemented by PyPy. The memory usage of the new dict() is between 20% and 25% smaller compared to Python 3.5.

* F strings: a new kind of string literals: f-strings, or [formatted string literals](https://docs.python.org/3.6/reference/lexical_analysis.html#f-strings).

* Asynchronous generators: [PEP 492](https://www.python.org/dev/peps/pep-0492) introduced support for native coroutines and async / await syntax to Python 3.5. A notable limitation of the Python 3.5 implementation is that it was not possible to use await and yield in the same function body. In Python 3.6 this restriction has been lifted, making it possible to define asynchronous generators.

* Asynchronous comprehensions: [PEP 530](https://www.python.org/dev/peps/pep-0530) adds support for using async for in list, set, dict comprehensions and generator expressions.

* Underscores in numeric literals: [PEP 515](https://www.python.org/dev/peps/pep-0515) adds the ability to use underscores in numeric literals for improved readability.
