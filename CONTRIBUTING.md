# Contributing guide

Contributions and feedback on your experience of using this software are welcome.

This includes bug reports, feature requests, ideas, pull requests, and examples of how you have used this software.

Please see the [Code of Conduct](CODE_OF_CONDUCT.md) and follow any templates configured in GitHub when reporting bugs, requesting enhancements, or contributing code.

Please raise any significant new functionality or breaking change an issue for discussion before raising a Pull Request for it.

## For contributors

Anyone can be a contributor. Either you found a typo, or you have an awesome feature request you could implement, we encourage you to create a Pull Request.

## For maintainers

We use [semantic-release](https://github.com/semantic-release/semantic-release) together with [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0) to automate releases. This makes the maintainenance process easier and less error-prone to human error. Please study the "Conventional Commits" site to understand how to write a good commit message.

When accepting Pull Requests, make sure the following:

* Use "Squash and merge"
* Make sure you merge contributor PRs into `main`
* Rewrite the commit message to conform to the `Conventional Commits` style. Check the "Recommended Scopes" section for further advice.
* Optionally link issues the PR will resolve (You can add "close" in front of the issue numbers to close the issues automatically, when the PR is merged. `semantic-release` will also comment back to connected issues and PRs, notifying the users that a feature is added/bug fixed, etc.)
