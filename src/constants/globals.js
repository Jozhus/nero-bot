const MongoDAL = require("../helpers/MongoDAL");

const mongoOptions = {
    dbUri: process.env.DBURI,
    dbName: process.env.DBNAME,
    dbCollection: process.env.DBCOLLECTION
};

module.exports = new MongoDAL(mongoOptions);