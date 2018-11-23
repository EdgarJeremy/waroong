import Model from '../core/Model';
import UserModel from './UserModel';

export default class StoreModel extends Model {

    columns = ['id', 'name', 'location', 'location_text', 'description', 'user_id', 'created_at', 'updated_at'];
    basepoint = '/stores';

    constructor(dataValues) {
        super(dataValues);
        this.prepare({
            relations: [{ key: 'user', model: UserModel }]
        });
    }

}