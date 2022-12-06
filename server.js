const path = require("path");
require('dotenv').config({ path: path.join(process.cwd() + "/data/",".env") });
require('./index');
require('./config/dbConnection');