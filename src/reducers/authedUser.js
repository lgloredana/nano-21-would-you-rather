import {GET_AUTH_USER} from "../actions/authUser";

export default function authedUser( prevStoreState = null, action){
    switch (action.type) {
        case GET_AUTH_USER :
            return action.authedUser;
        default:
            return prevStoreState;
    }
}