const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Todo = sequelize.define('Todo', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    timeEstimate: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('in progress', 'completed'),
      defaultValue: 'in progress',
    },
    pinned: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Todo.associate = (models) => {
    Todo.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  };

  return Todo;
};
