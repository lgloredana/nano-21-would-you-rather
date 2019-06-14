import React, { Component, Fragment } from 'react';
import '../css/App.css';
import { connect } from "react-redux";
import {handleInitialData} from "../actions/shared";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Dashboard from "./Dashboard";
import LoadingBar from 'react-redux-loading'
import Login from "./Login";
import Header from './Header'
import Menu from "./Menu";
import NewPoll from "./NewPoll";
import QuestionDetails from "./QuestionDetails";
import LeaderBoard from "./LeadersBoard";
import ErrorPage from "./ErrorPage";

class App extends Component {
    state = {
        showAnswered : false
    };

    toggleQuestionsView = () => {
        this.setState((prevState, callback) => {
            return {
                showAnswered : !prevState.showAnswered
            }
        })
    };

    componentDidMount() {
        this.props.dispatch(handleInitialData())
    }
    render() {
        return (
            <BrowserRouter>
                <Fragment>
                    <LoadingBar/>
                    {
                        this.props.loadingBar.default > 0
                            ? <div>
                                <h1>Loading Initial Data .....</h1>
                            </div>
                            : (!this.props.authedUser || !this.props.authedUser.id)
                                ? <div className='mainContainer'>
                                    <Login/>
                                </div>
                                : <div>
                                    <Header></Header>
                                    <Menu showAnswered={this.state.showAnswered} toggleQuestionsView={this.toggleQuestionsView}/>
                                    <div className='mainContainer'>
                                        <Switch>
                                            <Route path='/'
                                                   exact
                                                   render = {() => (<Dashboard showAnswered={this.state.showAnswered} />)}
                                            />
                                            <Route path='/add'
                                                   render={() => (
                                                       <NewPoll/>)}
                                            />
                                            <Route path='/questions/:question_id'
                                                   component={QuestionDetails}
                                            />
                                            <Route path='/leaderboard'
                                                   render={() => (
                                                       <LeaderBoard/>  )}
                                            />
                                            <Route path='/error'
                                                   render={() => (
                                                       <ErrorPage/>  )}
                                            />
                                        </Switch>
                                    </div>
                                </div>
                    }

                </Fragment>
            </BrowserRouter>

        );
    }
}
function mapStateToProps({loadingBar, authedUser}){
    return {
        loadingBar,
        authedUser
    };
}

export default connect(mapStateToProps)(App)
