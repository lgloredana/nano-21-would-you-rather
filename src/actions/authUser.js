import {hideLoading, showLoading} from "react-redux-loading";

export const GET_AUTH_USER = 'GET_USER';
export const AUTH_ID = 'tylermcginnis';

function getAuthUser(authedUser) {
    return {
        type: GET_AUTH_USER,
        authedUser
    }
}

export function handleGetAuthedUser(authedUser) {
    return (dispatch) => {
        dispatch(showLoading());
        dispatch(getAuthUser(authedUser))
        dispatch(hideLoading());
    }
}
