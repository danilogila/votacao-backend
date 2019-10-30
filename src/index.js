const server = require('./server')
const chalk = require('chalk')

let PORT = process.env.PORT || 3000

server.listen(PORT, () => {
    console.log('%s APP is running at http://localhost:%d', chalk.green('✓'), PORT);
    console.log('  Press CTRL-C to stop\n');
  });