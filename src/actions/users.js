import {_getUsers} from "../utils/_DATA";
import {showLoading, hideLoading} from 'react-redux-loading'

export const GET_USERS = 'GET_USERS';
export const UPDATE_USERS = 'UPDATE_USERS';

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

function updateUser(userInfo) {
    return {
        type: UPDATE_USERS,
        userInfo
    }
}

export function handleUpdateUsers({answerId, questionId, answer}){
    return (dispatch, getState) => {
        const { authedUser } = getState();
        const userInfo = {
            answerId,
            questionId,
            answer,
            uId : authedUser.id
        };
        dispatch(updateUser(userInfo))
    }
}