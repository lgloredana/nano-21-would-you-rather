import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formatDate } from "../utils/helpers";
import { Link } from 'react-router-dom'

class Dashboard extends Component {

    render() {
        const { showAnswered, questions, authedUser, orderdQuestionsIDs } = this.props;
        const answeredQuestionsIds = orderdQuestionsIDs.filter( qId => {
            const voteQ1found = questions[qId].optionOne.votes.find(vote => (vote === authedUser) );
            const voteQ2found = questions[qId].optionTwo.votes.find(vote => (vote === authedUser));
            // console.log(`-------qId = ${qId}  ---- found = ${voteQ1found} and ${voteQ2found}`);
            return voteQ1found || voteQ2found;
        } );
        const unansweredQuestions = orderdQuestionsIDs.filter(qid => !answeredQuestionsIds.find( aqid => (aqid === qid) ));
        // console.log('------ answered questins ------');
        // console.dir(answeredQuestionsIds);
        // console.log('------ answered questins ------');
        // console.dir(unansweredQuestions);

        return (<div>
            Dashboard {showAnswered ? 'Unanswered' : 'Answered'}
            <div>
                <ul>
                    {showAnswered
                        ? unansweredQuestions.map( qid => {
                            const question = questions[qid];
                            const questionOpt1 = question.optionOne.text;
                            const questionOpt2 = question.optionTwo.text;
                            return (<ol key={qid}>
                                {question.author} / {formatDate(question.timestamp)} / {questionOpt1} / {questionOpt2} /
                                <Link to={`/questions/${qid}`}>Details</Link>
                            </ol>)
                        })
                        :answeredQuestionsIds.map( qid => {
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


function mapStateToProps({questions, authedUser}, {showAnswered}){
    return {
        authedUser: authedUser.id,
        questions,
        orderdQuestionsIDs: Object.keys(questions).sort((a, b) => questions[b].timestamp - questions[a].timestamp),
        showAnswered
    };
}

export default connect(mapStateToProps)(Dashboard);