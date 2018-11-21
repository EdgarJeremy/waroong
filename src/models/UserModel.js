import Model from '../core/Model';

export default class UserModel extends Model {

    columns = ['id', 'name', 'username', 'password', 'type', 'avatar', 'active'];

    constructor(req, basepoint, dataValues) {
        super();
        this.req = req;
        this.basepoint = basepoint;
        this.dataValues = dataValues;
        Object.keys(dataValues).forEach((key) => {
            this[key] = dataValues[key];
        });
    }

}