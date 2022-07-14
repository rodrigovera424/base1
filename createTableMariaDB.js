
const { optionsMariaDB } = require("./options/mariaDB");
const knex = require("knex")(optionsMariaDB);

const start = async () => {

    await knex.schema.dropTableIfExists('product');

    knex.schema
        .createTable('product', (table) => {
            table.increments();
            table.string('title');
            table.integer('price');
            table.string('thumbnail');
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