import req from './req';

export default {
    register: (payload) => {
        return req('/publics/register', 'POST', { body: payload });
    },
    verify: (payload) => {
        return req('/publics/verify', 'POST', { body: payload });
    }
}