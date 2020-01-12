const server = require('./server')
const chalk = require('chalk')
const cluster = require('cluster')
let numWorkers = require('os').cpus().length;

let PORT = process.env.PORT || 3000

if(cluster.isMaster) {
  console.log('Master cluster setting up ' + numWorkers + ' workers...');

  for(let i = 0; i < numWorkers; i++) {
      cluster.fork();
  }

  cluster.on('online', function(worker) {
      console.log('%s Worker ' + worker.process.pid + ' is online', chalk.green('✓'));
  });

  cluster.on('exit', function(worker, code, signal) {
      console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
      console.log('Starting a new worker');
      cluster.fork();
  });
} else {
  server.listen(PORT, () => {
      console.log('%s APP is running at http://localhost:%d', chalk.green('✓'), PORT);
      console.log(`APP is running at cluster: ${cluster.worker.id}`)
      console.log('  Press CTRL-C to stop\n');
    });
}