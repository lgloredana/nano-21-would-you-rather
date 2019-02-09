import {handleGetQuestions} from "./questions";
import {handleGetUsers} from "./users";
import {AUTH_ID, getAuthUser} from "./authUser";

export function handleInitialData () {
    return (dispatch) => {
        dispatch(handleGetUsers());
        dispatch(handleGetQuestions());
        dispatch(getAuthUser({id: AUTH_ID}))
    }
}