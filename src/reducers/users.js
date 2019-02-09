import {GET_USERS} from "../actions/users";


export default function users(prevStoreState = null, action) {
    switch (action.type) {
        case GET_USERS :
            return {
                ...prevStoreState,
                ...action.users
            }
        default:
            return prevStoreState;
    }

}