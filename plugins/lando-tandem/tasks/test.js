'use strict';

module.exports = lando => ({
  command: 'holla',
  level: 'tasks',
  describe: 'Tests an app loaded plugin',
  run: () => {
    console.log('I WORKED!');
  },
});
