import {getAuthUser} from "./authUser";
import {getQuestions} from "./questions";
import {handleGetUsers} from "./users";

export function handleInitialData () {
    return (dispatch) => {
        dispatch(handleGetUsers());
        dispatch(getQuestions());
        dispatch(getAuthUser());
    }
}