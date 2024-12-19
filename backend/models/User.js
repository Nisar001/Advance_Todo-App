const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    mobile: DataTypes.STRING,
    gender: DataTypes.STRING,
    country: DataTypes.STRING,
    hobbies: DataTypes.ARRAY(DataTypes.STRING),
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: DataTypes.STRING,
  });

  User.associate = (models) => {
    User.hasMany(models.Todo, { foreignKey: 'userId' });
  };

  return User;
};
