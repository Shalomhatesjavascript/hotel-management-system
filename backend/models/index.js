// backend/models/index.js
require('dotenv').config();  // ← make sure .env is loaded

const { Sequelize } = require('sequelize');

// Use DATABASE_URL if exists, otherwise fall back to individual vars
const sequelize = new Sequelize(
  process.env.DATABASE_URL || {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres'
  },
  {
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
      ssl: process.env.NODE_ENV === 'production' 
        ? { require: true, rejectUnauthorized: false }
        : false
    }
  }
);

const User = require('./User')(sequelize, require('sequelize').DataTypes);
const Complaint = require('./Complaint')(sequelize, require('sequelize').DataTypes);

User.hasMany(Complaint, { foreignKey: 'UserId' });
Complaint.belongsTo(User, { foreignKey: 'UserId' });

module.exports = { sequelize, User, Complaint };