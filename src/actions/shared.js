import {handleGetQuestions} from "./questions";
import {handleGetUsers} from "./users";
import {handleGetQuizQuestions} from "./quizQuestions";

export function handleInitialData () {
    return (dispatch) => {
        dispatch(handleGetUsers());
        dispatch(handleGetQuestions());
        dispatch(handleGetQuizQuestions());
    }
}