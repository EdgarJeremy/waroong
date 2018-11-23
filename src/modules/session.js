import { AsyncStorage } from 'react-native';
import req from './req';
import UserModel from '../models/UserModel';

export default {
    start: (payload) => {
        return req('/public/login', 'POST', { body: payload }).then(async (body) => {
            if (body) {
                if (body.status) {
                    await AsyncStorage.setItem('accessToken', body.data.token);
                    await AsyncStorage.setItem('refreshToken', body.data.refreshToken);
                    return new UserModel(body.data.user);
                } else return null;
            }
        });
    },
    check: () => {
        return req('/public/check', 'GET').then(async (body) => {
            if (body) {
                if (body.status) {
                    return new UserModel(body.data);
                } else return null;
            }
        });
    },
    clear: () => {
        return req('/public/logout', 'GET').then(async (body) => {
            if (body.status) {
                await AsyncStorage.removeItem('accessToken');
                await AsyncStorage.removeItem('refreshToken');
                return true;
            } else return false;
        });
    },
    register: (payload) => {
        return req('/public/register', 'POST', { body: payload });
    },
    verify: (payload) => {
        return req('/public/verify', 'POST', { body: payload }).then((body) => {
            if(body.status) {
                return new UserModel(body.data);
            } else return null;
        });
    }
}