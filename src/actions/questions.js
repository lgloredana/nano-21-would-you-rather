import {_getQuestions, _saveQuestion, _saveQuestionAnswer} from "../utils/_DATA";
import {showLoading, hideLoading} from 'react-redux-loading'
import {handleUpdateUsers} from "./users";

export const OPT1 = 'optionOne';
export const OPT2 = 'optionTwo';
export const GET_QUESTIONS = 'GET_QUESTIONS';
export const SAVE_NEW_QUESTION = 'SAVE_NEW_QUESTION';
export const UPDATE_ANSWERED_QUESTION = 'UPDATE_ANSWERED_QUESTION';



function getQuestions(questions) {
    return {
        type: GET_QUESTIONS,
        questions
    }
}

export function handleGetQuestions(){
    return (dispatch) => {
        dispatch(showLoading());
        _getQuestions()
            .then((response) => {
                dispatch(getQuestions(response));
                dispatch(hideLoading());
            })
    }
}

function saveQuestion(newQuestion) {
    return {
        type: SAVE_NEW_QUESTION,
        newQuestion
    }
}

export function handleSaveQuestion({optionOneText, optionTwoText}, callback) {
    return (dispatch, getState) => {
        const { authedUser } =  getState();
        _saveQuestion({author: authedUser.id,optionOneText,optionTwoText})
            .then((response) => {
                dispatch(saveQuestion(response));
                dispatch(handleUpdateUsers({questionId: response.id}));
                callback();
            })
    }
}

function updateQuestion(questionAnswer) {
    return {
        type: UPDATE_ANSWERED_QUESTION,
        questionAnswer
    }
}

export function handleUpdateQuestion({qid, answer}) {
    return (dispatch, getState) => {
        const { authedUser } = getState();
        const questionAnswer = {authedUser: authedUser.id, qid, answer};
        _saveQuestionAnswer(questionAnswer)
            .then((response) => {
                dispatch(updateQuestion(questionAnswer));
                dispatch(handleUpdateUsers({answerId:qid, answer}));
            })
    }
}