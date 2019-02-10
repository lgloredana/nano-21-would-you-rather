import React, { Component, Fragment } from 'react';
import '../css/App.css';
import { connect } from "react-redux";
import {handleInitialData} from "../actions/shared";
import {BrowserRouter, Route, Redirect} from "react-router-dom";
import Dashboard from "./Dashboard";
import LoadingBar from 'react-redux-loading'
import Login from "./Login";
import Header from './Header'
import Menu from "./Menu";
import NewPoll from "./NewPoll";

class App extends Component {
    state = {
        showAnswered : true
    };

    toggleQuestionsView = () => {
        this.setState((prevState, callback) => {
            return {
                showAnswered : !prevState.showAnswered
            }
        })
    }

    componentDidMount() {
        this.props.dispatch(handleInitialData())
    }
    render() {
        console.log('authed user = ', this.props.authedUser);
        return (
            <BrowserRouter>
                <Fragment>
                    <LoadingBar/>
                    {
                        this.props.loadingBar.default > 0
                            ?<div><h1>Loading Initial Data .....</h1> </div>
                            :<div>
                                {
                                    this.props.authedUser === null
                                        ?  <div>
                                                <Route path='/login'
                                                       exact
                                                      component={Login}
                                                />
                                                <Redirect to="/login"/>
                                          </div>
                                        : <div>
                                            <Redirect to="/add"/>
                                            <Header></Header>
                                            <Menu showAnswered={this.state.showAnswered} toggleQuestionsView={this.toggleQuestionsView}/>
                                            <div className='mainContainer'>
                                                <Route path='/'
                                                       exact
                                                       render = {() => (<Dashboard showAnswered={this.state.showAnswered} />)}
                                                />
                                                <Route path='/add'
                                                       render={() => (
                                                           <NewPoll/>)}
                                                />
                                                <Route path='/questions/:question_id'
                                                       exact
                                                       render={() => (
                                                           <div>Question Details</div>)}
                                                />
                                                <Route path='/leaderboard'
                                                          render={() => (
                                                           <div>Leader Board</div>)}
                                                />
                                             </div>
                                        </div>
                                }
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
