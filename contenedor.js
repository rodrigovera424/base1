class Contenedor {
    constructor(nombre, options) {
      this._nombre = nombre;
      this._knex = require("knex")(options);
    }

    get nombre() {
        return this._nombre;
    }

    get knex() {
        return this._knex;
    }    
  
    async save(object) {
        let id = await this.knex(this.nombre)
        .insert(object)
        return id;
    }

    async update(id, object) {
        await this.knex(this.nombre)
        .where('id', Number(id))
        .update(object)
    }    
  
    async getById(id) {
        let element = await this.knex
        .from(this.nombre)
        .select('*')
        .where('id', Number(id))
        return element;
    }
  
    async getAll() {
        let result = await this.knex
        .from(this.nombre)
        .select('*')
        return result;
    }

    async deleteById(id) {
        await this.knex(this.nombre)
        .where({ id: id })
        .del()
    }
}

module.exports = Contenedor

