// GP3/src/models/models.js

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres://gong:1234@localhost:5432/mydb');

const LearningPackage = sequelize.define('User', {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // 다른 필요한 칼럼들...
}, {
  // 모델 설정
});

module.exports = { sequelize, LearningPackage };
