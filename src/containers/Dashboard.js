import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formatDate } from "../utils/helpers";
import { Link } from 'react-router-dom'

class Dashboard extends Component {

    render() {
        const { showAnswered, questions, orderedQuestionsIDs, answers } = this.props;
        const answeredQuestionsIds = orderedQuestionsIDs.filter( orderQId =>
                                        answers.find( answerId => orderQId === answerId));
        const unansweredQuestions  = orderedQuestionsIDs.filter( orderQId =>
                                         !answers.find( answerId => orderQId === answerId));
        return (<div>
            <h1> {showAnswered ? 'Answered' : 'Unanswered' } Questions</h1>
            <div>
                <ul>
                    {showAnswered
                        ? answeredQuestionsIds.map( qid => {
                            const question = questions[qid];
                            const questionOpt1 = question.optionOne.text;
                            const questionOpt2 = question.optionTwo.text;
                            return (<ol key={qid}>
                                        {question.author} / {formatDate(question.timestamp)} / {questionOpt1} / {questionOpt2} /
                                        <Link to={`/questions/${qid}`}>Details</Link>
                                    </ol>)
                        })
                        : unansweredQuestions.map( qid => {
                            const question = questions[qid];
                            const questionOpt1 = question.optionOne.text;
                            const questionOpt2 = question.optionTwo.text;
                            return (<ol key={qid}>
                                        {question.author} / {formatDate(question.timestamp)} / {questionOpt1} / {questionOpt2} /
                                        <Link to={`/questions/${qid}`}>Details</Link>
                                    </ol>)
                    })
                    }
                </ul>
            </div>
        </div>);
    }
}


function mapStateToProps({questions, authedUser, users}, {showAnswered}){
    return {
        questions,
        answers: Object.keys(users[authedUser.id].answers),
        orderedQuestionsIDs: Object.keys(questions).sort((a, b) => questions[b].timestamp - questions[a].timestamp),
        showAnswered
    };
}

export default connect(mapStateToProps)(Dashboard);