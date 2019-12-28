const dotenv = require('dotenv');
const express = require('express');
const fs = require('fs');
const https = require('https');
const mongoose = require('mongoose');

// Import routes
const apiRouter = require('./routes/api');

function redirectToHttps() {
    const app = express();
    app.use(function (req, res, next) { // Redirect from http to https
        if (req.secure) {
            // request was via https, so do no special handling
            next();
        } else {
            // request was via http, so redirect to https
            res.redirect('https://' + req.headers.host + req.url);
        }
    });

    app.listen(process.env.PORT, () => console.log(`Started HTTP redirect server on port ${process.env.PORT}...`));
}

async function init() {
    dotenv.config();

    const app = express();
    app.use(express.json());

    // Define API endpoints
    app.use('/api/', apiRouter);

    // Static pages (index.html, ...)
    app.use(express.static(process.env.PUBLIC_FOLDER));

    mongoose.connect(process.env.DB_CONNECT,
        { useUnifiedTopology: true, useNewUrlParser: true },
        () => console.log("mongoDB connected!"));

    // Http server
    app.listen(process.env.PORT, () => console.log(`Started HTTP server on port ${process.env.PORT}...`));

    // Https server
    // const httpsOptions = {
    //     cert: fs.readFileSync(process.env.SSL_CERT),
    //     key: fs.readFileSync(process.env.SSL_KEY)
    // }
    // https.createServer(httpsOptions, app)
    //     .listen(process.env.SSL_PORT,
    //         () => console.log(`Started HTTPS server on port ${process.env.SSL_PORT}...`)
    //     );
    // redirectToHttps();
}

init();