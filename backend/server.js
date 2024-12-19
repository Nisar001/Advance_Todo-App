const cluster = require('cluster');
const os = require('os');
const app = require('./app.routes');
const { sequelize } = require('./models');

const PORT = process.env.PORT || 3000;

if (cluster.isMaster) {
  // Master process: Fork workers
  const numCPUs = os.cpus().length;
  console.log(`Master process is running on PID: ${process.pid}`);
  console.log(`Forking ${numCPUs} workers...`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // Listen for worker exits and replace them
  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} exited. Forking a new worker...`);
    cluster.fork();
  });
} else {
  // Worker process: Start the server
  sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
      console.log(`Worker ${process.pid} started on http://localhost:${PORT}`);
    });
  });
}
