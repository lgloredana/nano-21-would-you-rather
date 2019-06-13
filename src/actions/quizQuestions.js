import {hideLoading, showLoading} from "react-redux-loading";
import {_getQuizQuestions} from "../utils/_DATA";

export const GET_QUIZ_QUESTIONS = 'GET_QUIZ_QUESTIONS';

function getQuizQuestions(quizQuestions) {
    return {
        type: GET_QUIZ_QUESTIONS,
        quizQuestions
    }
}


export function handleGetQuizQuestions(){
    return (dispatch) => {
        dispatch(showLoading());
        _getQuizQuestions()
            .then((response) => {
                dispatch(getQuizQuestions(response));
                dispatch(hideLoading());
            })
    }
}