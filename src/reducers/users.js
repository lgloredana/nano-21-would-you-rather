import {GET_USERS, UPDATE_USERS} from "../actions/users";


export default function users(prevStoreState = null, action) {
    switch (action.type) {
        case GET_USERS :
            return {
                ...prevStoreState,
                ...action.users
            };
        case UPDATE_USERS:{
            const { answerId, questionId, uId } = action.userInfo;
            let updateAnswer = {}, updatedQuestions = {};
            if (answerId) {
                debugger;
                updateAnswer = prevStoreState[uId].answers[answerId]
                    ?  prevStoreState[uId].answers
                    :  { ... prevStoreState[uId].answers , answerId };
            }
            else{
                updateAnswer = prevStoreState[uId].answers;
            }

            if (questionId) {
                updatedQuestions = prevStoreState[uId].questions.concat(questionId);
            }
            else{
                updatedQuestions = prevStoreState[uId].questions;
            }
            debugger;
            return {
                ...prevStoreState,
                [uId]:{
                    answers: updateAnswer,
                    questions: updatedQuestions
                }
            }
        }
        default:
            return prevStoreState;
    }

}