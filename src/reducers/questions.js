import {GET_QUESTIONS, SAVE_NEW_QUESTION, UPDATE_ANSWERED_QUESTION} from "../actions/questions";

export default function questions( prevStoreState = null, action){
    switch (action.type) {
        case GET_QUESTIONS :
            return {
                ...prevStoreState,
                ...action.questions
            };
        case SAVE_NEW_QUESTION :
            return {
                ...prevStoreState,
                [action.newQuestion.id]: action.newQuestion,
            };
        case UPDATE_ANSWERED_QUESTION :
            return {
                ...prevStoreState
                /// TODO IMPLEMENT UPDATE
            };
        default:
            return prevStoreState;
    }
}