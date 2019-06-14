import React from 'react'
import {connect} from "react-redux";

const LeaderBoard  = (props) => {
    return (
        <div>
            <h1>Leader Board</h1>
            <ol>
                {
                    props.orderedUserIds.map( userId => {
                        const user = props.users[userId];
                        return (<li key={userId}>
                            <strong>{user.name} </strong>
                            <img
                                src={user.avatarURL}
                                alt={`Avatar of ${user.name}`}
                                className='avatar'
                            />
                            asked - {Object.keys(user.answers).length} -
                            answers - {user.questions.length}
                            </li>)})
                }
            </ol>
        </div>
)};

function mapStateToProps({users}){
    return {
        users,
        orderedUserIds : Object.keys(users).sort(
            (a, b) => (Object.keys(users[b].answers).length + users[b].questions.length) -
                (Object.keys(users[a].answers).length + users[a].questions.length)
        )
    };
}


export default connect(mapStateToProps)(LeaderBoard);