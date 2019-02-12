import {handleGetQuestions} from "./questions";
import {handleGetUsers} from "./users";

export function handleInitialData () {
    return (dispatch) => {
        dispatch(handleGetUsers());
        dispatch(handleGetQuestions());
    }
}