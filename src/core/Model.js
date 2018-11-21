export default class Model {

    columns = [];
    dataValues = {};
    req = {};
    basepoint = '';

    save() {
        return this.req(this.basepoint + '/' + this.dataValues.id, 'PUT', { body: this.dataValues });
    }

    update(dataValues) {
        return this.req(this.basepoint + '/' + this.dataValues.id, 'PUT', { body: dataValues });
    }

    delete() {
        return this.req(this.basepoint + '/' + this.dataValues.id, 'DELETE');
    }

    toJSON() {
        return this.dataValues;
    }

}