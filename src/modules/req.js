import axios from 'axios';
import env from '../env.json';
import { AsyncStorage } from 'react-native';

// const baseURL = 'http://192.168.100.101:8080/api';
const baseURL = `${env.api_host}:${env.api_port}/api`;

export default async (route = '', method = '', options = {}) => {
    console.log(`Start Request : ${baseURL + route}`);
    let accessToken = await AsyncStorage.getItem('accessToken');
    let refreshToken = await AsyncStorage.getItem('refreshToken');
    let config = {
        params: options.params,
        headers: { 'x-access-token': accessToken, 'x-refresh-token': refreshToken }
    }
    if (method === 'GET' || method === 'DELETE') {
        return axios[method.toLowerCase()](baseURL + route, config)
            .then(handleAfterRequest);
    } else {
        return axios[method.toLowerCase()](baseURL + route, options.body, config)
            .then(handleAfterRequest);
    }
}

async function handleAfterRequest(response) {
    console.log(`Done Request : ${response.config.url}`);
    const accessToken = response.headers['x-access-token'];
    const refreshToken = response.headers['x-refresh-token'];
    if(accessToken && refreshToken) {
        console.log(`Renew Token : ${response.config.url}`);
        await AsyncStorage.setItem('accessToken', accessToken);
        await AsyncStorage.setItem('refreshToken', refreshToken);
    }
    return response.data;
}