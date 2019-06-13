import {GET_QUIZ_QUESTIONS} from "../actions/quizQuestions";

export default function quizQuestions( prevStoreState = null, action){
    switch (action.type) {
        case GET_QUIZ_QUESTIONS :
            return {
                ...prevStoreState,
                ...action.quizQuestions
            };
        default:
            return prevStoreState;
    }
}