import React, { Component } from 'react'
import connect from "react-redux/es/connect/connect";
import {handleUpdateQuestion, OPT1, OPT2} from "../actions/questions";

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
        this.props.dispatch(handleUpdateQuestion({qid: this.props.question.id,answer:e.target.question.value}))
    };

    handleOptionChange = (changeEvent) => {
        this.setState({
            selectedOption: changeEvent.target.value
        });
    };

    render() {
        const { users, question } = this.props;
        const {selectedOption} = this.state;

        const votesQ1 = question.optionOne.votes.length;
        const votesQ2 = question.optionTwo.votes.length;
        const nrUsers = Object.keys(users).length;
        const voteAnswer1 = this.props.question.optionOne.votes.find( user => (user === this.props.authedUser));
        console.log(` ---------- this.props.question.optionOne.votes = ${this.props.question.optionOne.votes.length}  -------------------`);
        console.log(` ---------- selectedOption = ${selectedOption}  -------------------`);
        console.log(' ========= question =============');
        console.dir(this.props.question);
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
                            <label htmlFor="qChoice1">{question.optionOne.text} -----</label>
                            <label htmlFor="qChoice1">Count = {votesQ1} ------</label>
                            <label htmlFor="qChoice1"> {votesQ1 * 100 / nrUsers} %</label>
                        </div>
                        <div>
                            <input type="radio"
                                   id="qChoice2"
                                   value='optionTwo'
                                   name='question'
                                   checked={selectedOption === 'optionTwo'}
                                   onChange={this.handleOptionChange}
                            />
                            <label htmlFor="qChoice2">{question.optionTwo.text}-----</label>
                            <label htmlFor="qChoice2">Count = {votesQ2} -------</label>
                            <label htmlFor="qChoice2"> {votesQ2 * 100 / nrUsers} %</label>
                        </div><br/>
                    </div>
                    <button type='submit' className='submitButton' >Submit Answer</button>
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