const express = require('express');
const app = express();
const port = 5000;
const sequelize = require('./config/database')
const authRoutes = require('./routes/authRoutes')
const bookRoutes = require('./routes/bookRoutes')
const memberRoutes = require('./routes/memberRoutes')
const borrowingRoutes = require('./routes/borrowingRoutes')
const fineRoutes = require('./routes/fineRoutes')
const path = require('path');
const authMiddleware = require('./middlewares/authMiddleware');
const clearExpiredTokens = require('./utils/clearExpiredTokens'); 
const cron = require('node-cron');

// Handle preflight requests 
app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.sendStatus(200);
}); 
// Set CORS headers 
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', authRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(authMiddleware)
app.use('/api/books', bookRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/borrowings', borrowingRoutes);
app.use('/api/fines', fineRoutes);

//Scheduled task to clear the expired blacklisted tokens
cron.schedule('0 0 * * *', clearExpiredTokens);

sequelize.sync()
  .then(() => {
    console.log('Database synced');
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

