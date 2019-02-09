import {_saveQuestion, _saveQuestionAnswer} from "../utils/_DATA";

export const OPT1 = 'optionOne';
export const OPT2 = 'optionTwo';
export const GET_QUESTIONS = 'GET_QUESTIONS';
export const SAVE_NEW_QUESTION = 'SAVE_NEW_QUESTION';
export const UPDATE_ANSWERED_QUESTION = 'UPDATE_ANSWERED_QUESTION';


export function getQuestions(questions) {
    return {
        type: GET_QUESTIONS,
        questions
    }
}

function saveQuestion(newQuestion) {
    return {
        type: SAVE_NEW_QUESTION,
        newQuestion
    }
}

export function handleSaveQuestion({optionOneText, optionTwoText}) {
    return (dispatch, getState) => {
        const { authedUser } =  getState();
        _saveQuestion({author: authedUser,optionOneText,optionTwoText})
            .then((response) => {
                dispatch(saveQuestion(response));
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
        const questionAnswer = {authedUser, qid, answer};
        _saveQuestionAnswer(questionAnswer)
            .then((response) => {
                dispatch(updateQuestion(questionAnswer));
            })
    }
}