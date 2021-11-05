const dotenv = require('dotenv');
dotenv.config();

const app = require('./app');

const port = process.env.PORT;
const server = app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});