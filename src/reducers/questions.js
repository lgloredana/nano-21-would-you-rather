import {GET_QUESTIONS, OPT1, OPT2, SAVE_NEW_QUESTION, UPDATE_ANSWERED_QUESTION} from "../actions/questions";

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
        case UPDATE_ANSWERED_QUESTION : {
            const {authedUser, qid, answer} = action.questionAnswer;
            let  answerOneVotes,  answerTwoVotes;


            if (  answer === OPT1 ){
                answerOneVotes = prevStoreState[qid][OPT1]['votes'].find(uid => uid === authedUser)
                    ? prevStoreState[qid][OPT1]['votes']
                    : prevStoreState[qid][OPT1]['votes'].concat(authedUser);
                answerTwoVotes = prevStoreState[qid][OPT2]['votes'].filter(uid => uid !== authedUser);
            }else{
                answerOneVotes = prevStoreState[qid][OPT1]['votes'].filter(uid => uid !== authedUser);
                answerTwoVotes = prevStoreState[qid][OPT2]['votes'].find(uid => uid === authedUser)
                    ? prevStoreState[qid][OPT2]['votes']
                    : prevStoreState[qid][OPT2]['votes'].concat(authedUser);
            }
            const updatedQuestion = {
                ...prevStoreState[qid],
                [OPT1]: {
                    votes: answerOneVotes
                },
                [OPT2]: {
                    votes: answerTwoVotes
                }
            };
            debugger;

            return {
                ...prevStoreState,
                [qid]: updatedQuestion
            };
        }
        default:
            return prevStoreState;
    }
}