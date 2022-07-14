const optionsSQLite3 = {
  client: 'sqlite3',
  connection: {
    filename: "./db/ecommerce.db"
  },
  useNullAsDefault : true
};

module.exports = { optionsSQLite3 };