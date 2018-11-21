import req from '../modules/req';
import UserModel from './UserModel';

export const User = {
    basepoint: '/users',
    collection: function ({ attributes = 'id', filter = '', limit = 20, offset = 10, order = '\\created_at' }) {
        return req(this.basepoint, 'GET', { params: { attributes, filter, limit, offset, order } }).then((data) => {
            data.data.rows = data.data.rows.map((item) => new UserModel(req, this.basepoint, item));
            return data;
        });
    },
    one: function (id, { attributes }) {
        return req(this.basepoint + '/' + id, 'GET', { params: { attributes } })
    }
}