
const { optionsSQLite3 } = require("./options/sqlite3");
const knex = require("knex")(optionsSQLite3);

const start = async () => {

    await knex.schema.dropTableIfExists('message');

    knex.schema
        .createTable('message', (table) => {
            table.increments();
            table.string('email');
            table.string('date');
            table.string('message');
        })
        .then(() => {
            console.log("Table File was created");
        })
        .catch((err) => {
            console.log(err);
        })
        .finally((err) => {
            knex.destroy();
        });
}

start();