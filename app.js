const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const indexRoutes = require('./server/routes/index.routes')
const app = express();

// 1) GLOBAL MIDDLEWARES
// Set security HTTP headers
app.use(helmet());

// app.use(cors());
// Development logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Limit requests from same API
// const limiter = rateLimit({
//     max: 100,
//     windowMs: 60 * 60 * 1000,
//     message: 'Too many requests from this IP, please try again in an hour!'
// });
// app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));
// Test middleware
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    // console.log(req.headers);
    next();
});

// 3) ROUTES
app.use('/api/v1', indexRoutes)
// Base route
app.get('/', function (req, res) {
    res.status(200).send({
        health_check: 'Ok',
        message: 'base endpoint for the fintech lite app is up and running'
    })
})

app.all('*', (req, res, next) => {
    res.status(404).json({
        status: "Failed",
        error: `Can't find this route: ${req.originalUrl} on the server`
    })
});

module.exports = app;
