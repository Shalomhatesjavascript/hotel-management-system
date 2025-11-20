const { Sequelize } = require('sequelize');

// This single line works perfectly on Railway
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false   // Required for Railway
    }
  },
  logging: false
});

const User = require('./User')(sequelize, require('sequelize').DataTypes);
const Complaint = require('./Complaint')(sequelize, require('sequelize').DataTypes);

User.hasMany(Complaint, { foreignKey: 'UserId' });
Complaint.belongsTo(User, { foreignKey: 'UserId' });

module.exports = { sequelize, User, Complaint };