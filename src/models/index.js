import req from '../modules/req';
import UserModel from './UserModel';
import StoreModel from './StoreModel';

export const User = {
    basepoint: '/users',
    collection: function ({ attributes = 'id', filter = '', limit = 20, offset = 10, order = '\\created_at' } = {}) {
        return req(this.basepoint, 'GET', { params: { attributes, filter, limit, offset, order } }).then((body) => {
            body.data.rows = body.data.rows.map((item) => new UserModel(item));
            return body;
        });
    },
    one: function (id, { attributes } = {}) {
        return req(this.basepoint + '/' + id, 'GET', { params: { attributes } }).then((body) => {
            body.data = new UserModel(body.data);
            return body;
        });
    }
}

export const Store = {
    basepoint: '/stores',
    collection: function ({ attributes = 'id', filter = '', limit = 20, offset = 10, order = '\\created_at' } = {}) {
        return req(this.basepoint, 'GET', { params: { attributes, filter, limit, offset, order } }).then((body) => {
            body.data.rows = body.data.rows.map((item) => new StoreModel(item));
            return body;
        });
    },
    one: function (id, { attributes } = {}) {
        return req(this.basepoint + '/' + id, 'GET', { params: { attributes } }).then((body) => {
            body.data = new StoreModel(body.data);
            return body;
        });
    }
}