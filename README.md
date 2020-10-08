# Tandem 2.0

This repository seeks to build on [the lessons learned from _Horoscope_](https://docs.thinktandem.io/manifesto/history.html#horoscope). As such, its goal is to continually, incrementally, and iteratively improve the business so we can increasingly focus on the things that matter most while maximizing our flow.

This means that someone should be able to come here with an idea or suggestion and...

1. Put it through a standardized vetting, prioritization and refinement process
2. End up with small, actionable and connected tasks that can be advanced by a team slowly and methodically over some time frame
3. Make contributions into a predefined and obvious structure
4. Have their contributions automatically deployed to the places where they have the most impact
5. Improve Tandem by removing repetition, variables and confusion from our work

## Getting Started

Before you begin make sure you...

1. Understand where [we are coming from](https://docs.thinktandem.io/manifesto/history.html#horoscope) and the problems this repo attempts to solve
2. Understand [the _entire_ process for improving Tandem](https://docs.thinktandem.io/guides/improve-tandem.html)
3. [Have all the tools you need to contribute to this repo](https://docs.thinktandem.io/handbook/tools.html)
4. Have a decent idea about [how Lando works](https://docs.devwithlando.io/started.html)
5. Understand how to [contribute code to it](https://docs.thinktandem.io/guides/contributing-code.html)
6. Understand how to [QA and deploy](https://docs.thinktandem.io/guides/qaing-code.html) said code

### Developing

You can easily get relevant web properties eg the docs and website running locally.

```bash
# Clone this repo
git clone git@github.com:thinktandem/tandem.git

# Start it up
cd tandem
lando start

# Get a helpful list of all your lando commands
lando
```
### Writing Blog Posts

tl;dr: `lando tandem-blog:generate`  && `lando show:containers`

All blog posts are markdown files with front matter for SEO. You can use the command `lando tandem-blog:generate` to scaffold out a blog post template for you. The command prompts for the relevent information and creates the markdown file in the 
`site/blog` directory for you. Here is an example run of the command:

```bash
gff ~/code/tandem/tandem 
(tandem-blog-generate) └─ ∴ lando tandem-blog:generate
? Post title? How to Drupal Real Good
? Post summary? From starting your Drupal dev to advanced migrations.
? Written by? John Ouellet
? Choose your location: Sarasota
? Tags? John Ouellet, User Experience., Development.

   _  __                       _    __      __              __                    
  / |/ /__ _    __  ___ ___ __(_)__/ /__   / /  ___ ____   / /  ___ ___ ___       
 /    / -_) |/|/ / / _ `/ // / / _  / -_) / _ \/ _ `(_-<  / _ \/ -_) -_) _ \_ _ _ 
/_/|_/\__/|__,__/  \_, /\_,_/_/\_,_/\__/ /_//_/\_,_/___/ /_.__/\__/\__/_//_(_|_|_)
                  /___/                                                           
  _____             __         ____
 / ___/______ ___ _/ /____ ___/ / /
/ /__/ __/ -_) _ `/ __/ -_) _  /_/ 
\___/_/  \__/\_,_/\__/\__/\_,_(_)  
                                   

Make sure you have run lando start to get the docs running locally.

Oh... and here are some vitals about your new content:

 FILEPATH    /home/gff/code/tandem/tandem/site/blog/2020-10-08-how-to-drupal-real-good.md 
 TITLE       How to Drupal Real Good                                                      
 SUMMARY     From starting your Drupal dev to advanced migrations.                        
 ID          johno                                                                        
 AUTHOR      John Ouellet                                                                 
 PIC         /images/people/john-sm.jpg                                                   
 LOCATION    Sarasota                                                                     
 DATE        2020-10-08                                                                   
 PARSEDTAGS  - johno                                                                      
             - ux                                                                         
             - development                                                                
```

You can then open the file in your favorite text editor and write your post.

In the course of writing your post you may want to call attention to certain pieces of information. The Tandem Blog uses vuepress containers to achieve these callouts. You can get a list of them with the command `lando show:containers`. This command will list the available containers/callouts and when you select one give you the copy and pasteable syntax to drop into your blog post. Here is an example run:

```bash
gff ~/code/tandem/tandem 
(tandem-blog-generate) └─ ∴ lando show:containers
? Choose a container danger
::: danger <optional title>
content for the danger container
:::
```

Happy blogging!

### Testing

```bash
# Run the markdown linter
lando test
```

## References

* [Lando docs](https://docs.devwithlando.io/)
* [Vuepress docs](https://vuepress.vuejs.org)
