const express = require('express');
const path = require('path');
const sequelize = require('./models').sequelize;
const authRoutes = require('./routes/auth');
const complaintRoutes = require('./routes/complaints');
const serveStatic = require('serve-static');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/complaints', complaintRoutes);

// Serve frontend in production AND development
const isProduction = process.env.NODE_ENV === 'production';
const frontendPath = path.join(__dirname, 'hotel-compliant-management-system', 'dist');

if (require('fs').existsSync(frontendPath)) {
  app.use(express.static(frontendPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
  });
  console.log('Frontend serving from:', frontendPath);
} else {
  console.log('dist folder not found! Run: npm run build:frontend');
  app.get('*', (req, res) => res.send('Run "npm run build:frontend" first!'));
}

// Sync/migrate DB
sequelize.sync({ alter: true }).then(() => {  // Use alter for dev; migrations for prod
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.error('DB connection error:', err));