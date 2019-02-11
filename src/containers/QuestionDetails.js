import React, { Component } from 'react'
import connect from "react-redux/es/connect/connect";

class QuestionDetails extends Component {
    updateAnswer = (e) => {
        e.preventDefault();
    };

    render() {
        const { users, authedUser, question } = this.props;
        const votesQ1 = question.optionOne.votes.length;
        const votesQ2 = question.optionTwo.votes.length;
        const nrUsers = Object.keys(users).length;
        const hasVotedOpt1 = question.optionOne.votes.find( user => (user === authedUser)) ? 'x' : '';
        const hasVotedOpt2 = question.optionTwo.votes.find( user => (user === authedUser)) ? 'x' : '';
        return (
            <div>
                <h1>Would You Rather</h1>
                <img
                    src={users[question.author].avatarURL}
                    alt={`Avatar of ${users[question.author].name}`}
                    className='avatar'
                />

                <form onSubmit={(e) => this.updateAnswer(e)}>
                    <div>
                        <div>
                            <input type="radio" id="q1" name='question' checked={hasVotedOpt1}/>
                            <label htmlFor="q1">{question.optionOne.text}</label> -----
                            <label htmlFor="q1">Count = {votesQ1}</label> ------
                            <label htmlFor="q1"> {votesQ1 * 100 / nrUsers} %</label>
                        </div>
                        <div>
                            <input type="radio" id="q2" name='question' checked={hasVotedOpt2} />
                            <label htmlFor="q2">{question.optionTwo.text}</label> -----
                            <label htmlFor="q2">Count = {votesQ2}</label> -------
                            <label htmlFor="q2"> {votesQ2 * 100 / nrUsers} %</label>
                        </div><br/>
                    </div>
                    <button type='submit' className='submitButton'>Submit Answer</button>
                </form>

            </div>
        )
    }
}


function mapStateToProps({authedUser, questions, users} , props) {
    const { question_id } = props.match.params;
    return {
        authedUser : authedUser.id,
        question : questions[question_id],
        users
    }
}

export default connect(mapStateToProps)(QuestionDetails);