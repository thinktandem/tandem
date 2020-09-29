'use strict';

// Modules
const _ = require('lodash');
const dayjs = require('dayjs');
const fs = require('fs');
const os = require('os');
const path = require('path');

// Local stuff
const config = require(__dirname + "/../../../site/.vuepress/config.js");
const siteTags = config.themeConfig.tags;
const siteLocations = config.themeConfig.locations;

module.exports = lando => {
  // Get some path data
  const blogPath = path.resolve(__dirname, '..', '..', '..', 'site', 'blog');
  const templateFile = path.resolve(__dirname, '..', 'templates', 'post.template');

  // Get the authors
  const authors = [ 
    {
      name: 'Dustin LeBlanc',
      value: 'dustinl'
    },
    {
      name: 'Mike Milano',
      value: 'mikem'
    },
    {
      name: 'John Ouellet',
      value: 'johno'
    },
    {
      name: 'Mike Pirog',
      value: 'pirog'
    },
    {
      name: 'Alec Reynolds',
      value: 'alecr'
    },
    {
      name: 'Geoff St. Pierre',
      value: 'serundeputy'
    },
  ];

  // Get the locations
  const locations = [];
  _.each(siteLocations, (i) => {
    locations.push({
      name: i.name,
      value: i.name
    });
  });

  // Get the tags
  const tags = [];
  _.each(siteTags, (val, key) => {
    tags.push({
      name: val.title,
      value: key
    });
  });

  return {
    command: 'tandem-blog:generate',
    describe: 'Scaffold out a Tandem blog post',
    alias: ['tbg', 'bg', 'blog'],
    options: {
      title: {
        describe: 'A title',
        string: true,
        interactive: {
          type: 'input',
          default: 'An example post',
          message: 'Post title?',
          validate: input => {
            if (_.size(input) > 100) return 'Must be 100 characters or less!';
            return true;
          },
        },
      },
      summary: {
        describe: 'A summary of the blog post.',
        string: true,
        interactive: {
          type: 'input',
          default: 'A longer and SEO dense summary',
          message: 'Post summary?',
          validate: input => {
            if (_.size(input) > 160) return 'Must be 160 characters or less!';
            return true;
          },
        },
      },
      author: {
        describe: 'An author',
        string: true,
        choices: authors,
        interactive: {
          type: 'list',
          message: 'Written by?',
          default: 'Team Lando',
          choices: authors,
        },
      },
      location: {
        describe: 'Enter your location',
        string: true,
        choices: locations,
        interactive: {
          type: 'list',
          message: 'Choose your location:',
          default: 'The Internet',
          choices: locations
        }
      },
      tags: {
        describe: 'Tags',
        array: true,
        choices: tags,
        interactive: {
          type: 'checkbox',
          message: 'Tags?',
          choices: tags,
        },
      },
    },
    run: options => {
      // Today things
      const year = dayjs().format('YYYY');
      const month = dayjs().format('MM');
      const day = dayjs().format('DD');
      const id = options.author;
      const author = siteTags[options.author].title;

      // Build The basic data
      const data = {
        filePath: path.join(blogPath, `${year}-${month}-${day}-${_.kebabCase(options.title)}.md`),
        title: options.title,
        summary: options.summary,
        id: id,
        author: author,
        pic: siteTags[options.author].pic,
        location: options.location,
        date: dayjs().format('YYYY-MM-DD'),
        parsedTags: _.map(options.tags, tag => `- ${tag}`).join(os.EOL),
      };

      // Dump the new guide
      const compiled = _.template(fs.readFileSync(templateFile, 'utf8'));
      fs.writeFileSync(data.filePath, compiled(data));

      // Log
      const displayData = _.omit(data, ['_', '_app', 'v', 'verbose', '$0']);
      console.log(lando.cli.makeArt('newContent'));
      console.log(lando.cli.formatData(displayData, {format: 'table'}, {border: false}));
      console.log(' ');
    },
  };
};
