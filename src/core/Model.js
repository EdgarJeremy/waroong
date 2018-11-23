import req from "../modules/req";

export default class Model {

    columns = [];
    dataValues = {};
    basepoint = '/';

    constructor(dataValues) {
        this.dataValues = dataValues;
    }

    prepare({ relations } = {}) {
        Object.keys(this.dataValues).forEach((key) => {
            let value = this.dataValues[key];
            relations.forEach((relation) => {
                if (key === relation.key) {
                    value = new relation.model(value);
                }
            });
            this.dataValues[key] = value;
        });
    }

    save() {
        return req(this.basepoint + '/' + this.dataValues.id, 'PUT', { body: this.dataValues });
    }

    update(dataValues) {
        return req(this.basepoint + '/' + this.dataValues.id, 'PUT', { body: dataValues });
    }

    delete() {
        return req(this.basepoint + '/' + this.dataValues.id, 'DELETE');
    }

    toJSON() {
        return this.dataValues;
    }

}