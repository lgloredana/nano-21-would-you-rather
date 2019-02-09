export const GET_AUTH_USER = 'GET_USER';
export const AUTH_ID = 'tylermcginnis';

export function getAuthUser(authedUser) {
    return {
        type: GET_AUTH_USER,
        authedUser
    }
}
