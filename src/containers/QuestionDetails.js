import React, { Component } from 'react'
import connect from "react-redux/es/connect/connect";
import {handleUpdateQuestion} from "../actions/questions";
import {withRouter, Redirect} from 'react-router-dom'

class QuestionDetails extends Component {
    state = {
        selectedOption: ''
    };

    componentWillMount() {
        const {question, users, authedUser} = this.props;
        if(question) {
            this.setState({
                selectedOption: users[authedUser].answers[question.id]
            });
        }
    }

    updateAnswer = (e) => {
        e.preventDefault();
        this.props.dispatch(handleUpdateQuestion({qid: this.props.question.id,answer:e.target.question.value}))
    };


    handleOptionChange = (changeEvent) => {
        this.setState({
            selectedOption: changeEvent.target.value
        });
    };

    render() {
        const { users, question,isAnswerdQuestion } = this.props;
        const {selectedOption} = this.state;
        let votesQ1, votesQ2, nrUsersWhoVoted;

        if(question){
            votesQ1 = question.optionOne.votes.length;
            votesQ2 = question.optionTwo.votes.length;
            nrUsersWhoVoted = votesQ1 + votesQ2;
        }


        return ( <div>{ question
            ? (
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
                                            <label> {votesQ1 * 100 / nrUsersWhoVoted} %</label>
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
                                            <label> {votesQ2 * 100 / nrUsersWhoVoted} %</label>
                                        </div>
                                        : ''
                                }
                            </div>
                            <br/>
                        </div>
                        {isAnswerdQuestion
                            ? ''
                            : <button type='submit' className='submitButton' disabled={selectedOption === ''}>Submit
                                Answer</button>
                        }
                    </form>
                </div>
                )
            : <Redirect to='/error'></Redirect>
            }
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

export default connect(mapStateToProps)(QuestionDetails);