import React, { Component } from 'react'
import connect from "react-redux/es/connect/connect";
import {handleUpdateQuestion, OPT1, OPT2} from "../actions/questions";
import {withRouter} from 'react-router-dom'

class QuestionDetails extends Component {
    state = {
        selectedOption: this.props.question.optionOne.votes.find( user => (user === this.props.authedUser))
            ? 'optionOne'
            : this.props.question.optionTwo.votes.find( user => (user === this.props.authedUser))
                ? 'optionTwo'
                : ''
    };

    updateAnswer = (e) => {
        e.preventDefault();
        this.props.dispatch(handleUpdateQuestion({qid: this.props.question.id,answer:e.target.question.value}, this.afterSaveAnswer))
    };

    afterSaveAnswer = () => {
        this.props.history.push(`/`);
    };

    handleOptionChange = (changeEvent) => {
        this.setState({
            selectedOption: changeEvent.target.value
        });
    };

    render() {
        const { users, question,isAnswerdQuestion } = this.props;
        const {selectedOption} = this.state;

        const votesQ1 = question.optionOne.votes.length;
        const votesQ2 = question.optionTwo.votes.length;
        const nrUsers = Object.keys(users).length;

        console.log('================');
        console.dir(question);
        console.dir(users[question.author]);

        return (
            <div>
                <h1>Would You Rather</h1>
                <img
                    src={users[question.author].avatarURL}
                    alt={`Avatar of ${users[question.author].name}`}
                    className='avatar'
                />

                <form onSubmit={(e) => this.updateAnswer(e)} >
                    <div>
                        <div>
                            <input type="radio"
                                   id="qChoice1"
                                   value='optionOne'
                                   name='question'
                                   checked={selectedOption === 'optionOne'}
                                   onChange={this.handleOptionChange}
                            />
                            <label htmlFor="qChoice1">{question.optionOne.text} </label>
                            {
                                isAnswerdQuestion
                                    ? <div>
                                            <label>Count = {votesQ1} ------</label>
                                            <label> {votesQ1 * 100 / nrUsers} %</label>
                                      </div>
                                    : ''
                            }

                        </div>
                        <div>
                            <input type="radio"
                                   id="qChoice2"
                                   value='optionTwo'
                                   name='question'
                                   checked={selectedOption === 'optionTwo'}
                                   onChange={this.handleOptionChange}
                            />
                            <label htmlFor="qChoice2">{question.optionTwo.text}</label>
                            {
                                isAnswerdQuestion
                                    ? <div>
                                        <label>Count = {votesQ2} -------</label>
                                        <label> {votesQ2 * 100 / nrUsers} %</label>
                                      </div>
                                    : ''
                            }
                        </div><br/>
                    </div>
                    { isAnswerdQuestion
                        ? ''
                        : <button type='submit' className='submitButton' disabled={selectedOption === ''}>Submit Answer</button>
                    }
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
        users,
        isAnswerdQuestion: users[authedUser.id].answers[question_id] ? true: false
    }
}

export default withRouter(connect(mapStateToProps)(QuestionDetails));