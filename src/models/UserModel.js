import Model from '../core/Model';

export default class UserModel extends Model {

    columns = ['id', 'name', 'username', 'password', 'type', 'avatar', 'active', 'created_at', 'updated_at'];
    basepoint = '/users';

}