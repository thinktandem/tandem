# Tandem 2.0

This repository seeks to build on [the lessons learned from _Horoscope_](https://docs.thinktandem.io/manifesto/history.html#horoscope). As such, its goal is to continually, incrementally, and iteratively improve the business so we can increasingly focus on the things that matter most while maximizing our flow.

This means that someone should be able to come here with an idea or suggestion and...

1. Put it through a standardized vetting, prioritization and refinement process
2. End up with small and actionable tasks that can be advanced by a team slowly and methodically over some time frame
3. Make contributions into a predefined and obvious structure
4. Have their contributions automatically deployed to the places where they have the most impact
5. Improve Tandem by removing repetition, variables and confusion from our work

## Getting Started

Before you begin make sure you...

1. Understand the [purpose](https://docs.thinktandem.io/guides/improve-tandem.html#understanding-the-specifics) of this repo and [its history](https://docs.thinktandem.io/manifesto/history.html#horoscope)
2. Understand its [structure and contents](https://docs.thinktandem.io/guides/improve-tandem.html#understanding-the-structure)
3. Understand how to use its [process of self-improvement](https://docs.thinktandem.io/guides/improve-tandem.html#suggesting-a-change)
4. Understand how [it is managed](https://docs.thinktandem.io/guides/improve-tandem.html#managing-the-process) and how to [choose issues to work on](https://docs.thinktandem.io/guides/improve-tandem.html#choosing-an-issue)
5. [Have all the tools you need to develop](https://docs.thinktandem.io/handbook/tools.html)
6. Have a decent idea about [how Lando works](https://docs.devwithlando.io/started.html)
7. Understand how to [contribute code to it](https://docs.thinktandem.io/guides/contributing-code.html)
8. Understand how to [QA and deploy](https://docs.thinktandem.io/guides/qaing-code.html) said code

### Developing

You can easily get the site running locally.

```bash
# Clone this repo
git clone git@github.com:thinktandem/tandem.git

# Start it up
cd tandem
lando start

# Get a helpful list of all your lando commands
lando
```

### Testing

```bash
# Run the markdown linter
lando test
```

## References

* [Lando docs](https://docs.devwithlando.io/)
* [Vuepress docs](https://vuepress.vuejs.org)
