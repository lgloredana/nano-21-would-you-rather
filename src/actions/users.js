import {_getUsers} from "../utils/_DATA";
import {showLoading, hideLoading} from 'react-redux-loading'


export const GET_USERS = 'GET_USERS';

function getUsers(users){
    return {
        type: GET_USERS,
        users
    }
}

export function handleGetUsers(){
    return (dispatch) => {
        dispatch(showLoading());
        _getUsers()
            .then((response) => {
                dispatch(getUsers(response));
                dispatch(hideLoading())
            })
    }
}