import axios from 'axios';
import { 
    AUTH_LOGIN_SUCCESS,
    AUTH_REGISTER_SUCCESS,
    AUTH_LOADING,
    AUTH_SYSTEM_ERROR,
    AUTH_REGISTER_ERROR,
    AUTH_LOGIN_ERROR,
    LOGOUT,
    COOKIE_CHECKED
} from './types';

export const onUserLogin = ({ username, password }) => {

    return ( dispatch ) => {

        dispatch({ type: AUTH_LOADING });
        axios.post("http://localhost:2002/user/user", {
                username: username,
                password: password
         })
        .then((res) => {
            console.log(res);
            if(res.data.length > 0) {
                dispatch({ type: AUTH_LOGIN_SUCCESS, 
                            payload: { 
                                id : res.data[0].id,
                                username: res.data[0].username,
                                role: res.data[0].role, 
                                email: res.data[0].email,
                                status: res.data[0].status,
                                // phone: res.data[0].phone 
                            }
                        });
            } else {
                dispatch({ type: AUTH_LOGIN_ERROR, payload: 'Username or password invalid.' });
            }
        })
        .catch((err) => {
            console.log(err);
            dispatch({ type: AUTH_SYSTEM_ERROR, payload: 'System error.' });
        })

    }

};

    export const onUserRegister = ({ username, email, password }) => {

    return ( dispatch ) => {
        
        dispatch({ type: AUTH_LOADING });

        if(username === '' || email === '' || password === '') {
            dispatch({ type: AUTH_REGISTER_ERROR, payload: 'Semua form wajib diisi' });
        } else {
            axios.post('http://localhost:2002/auth/register', {
                username: username,
                email: email,
                // phone: phone,
                password: password,
            }).then((res) => {
                console.log(res)
                dispatch({ type : AUTH_REGISTER_SUCCESS, payload: res.data })
            }).catch((err) => {
                console.log(err);
                dispatch({ type: AUTH_SYSTEM_ERROR, payload: 'System Error' })
            })
        }
        
    }

};

export const keepLogin = (username) => {

    return (dispatch) => {

        axios.get("http://localhost:2002/keeplogin/keeplogin", {
            params: {
                username
            }
        }).then((res) => {
            if(res.data.length > 0) {
                dispatch({
                    type: AUTH_LOGIN_SUCCESS,
                    payload: {
                        id: res.data[0].id,
                        username: res.data[0].username,
                        role: res.data[0].role,
                        email: res.data[0].email,
                        status: res.data[0].status,
                        // phone: res.data[0].phone
                     }
                })
            }
        })

    }

};

export const onUserLogout = () => {
    return { type: LOGOUT }
};

export const cookieChecked = () => {
    return { type: COOKIE_CHECKED }
};

export const onUserVerified = (userData) => {
    return {
        type: AUTH_LOGIN_SUCCESS,
        payload: userData
    }
}