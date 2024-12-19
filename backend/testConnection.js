const { Sequelize } = require('sequelize');

// Database connection settings
const sequelize = new Sequelize('todo_app', 'root', 'your_password', {
  host: '127.0.0.1',
  dialect: 'postgres',
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  } finally {
    await sequelize.close();
  }
})();
