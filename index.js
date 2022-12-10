const path = require("path");
require('dotenv').config({ path: path.join(process.cwd(),".env") });
require('./server');
require('./config/dbConnection');