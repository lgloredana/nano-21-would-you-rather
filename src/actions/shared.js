import {handleGetQuestions} from "./questions";
import {handleGetUsers} from "./users";
import {AUTH_ID, handleGetAuthedUser} from "./authUser";

export function handleInitialData () {
    return (dispatch) => {
        dispatch(handleGetAuthedUser({id: AUTH_ID}))
        dispatch(handleGetUsers());
        dispatch(handleGetQuestions());
    }
}