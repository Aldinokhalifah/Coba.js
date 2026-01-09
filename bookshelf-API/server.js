const express = require('express');
const app = express();
const port = 9000;
const router = require('./routes/api');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use(router);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});