const express = require('express');
const morgan = require('morgan');

const leadRouter = require('./routes/leadRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

const cors = require('cors');

var corsOptions = {
  // origin: "http://localhost:8080"
  origin: '*',
};

app.use(cors(corsOptions));

// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3) ROUTES
app.use('/api/v1/leads', leadRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
