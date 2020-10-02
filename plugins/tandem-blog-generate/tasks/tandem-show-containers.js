'use strict';

// Modules
const _ = require('lodash');

// Local stuff
const list = require(__dirname + '/../../../site/.vuepress/theme/index.js');
const containers = [];
_.each(list.plugins, (val, key) => {
  containers[key] = val[1].type;
});

module.exports = lando => {
  return {
    command: 'show:containers',
    describe: 'Show the available blog containers.',
    alias: ['sc'],
    options: {
      container: {
        describe: 'Choose a container to see its details.',
        string: true,
        interactive: {
          type: 'list',
          message: 'Choose a container',
          choices: containers,
        },
      },
    },
    run: options => {
      console.log('::: ' + options.container + ' <optional title>\n' +
        'content for the ' + options.container + ' container\n' +
        ':::');
    },
  };
};
