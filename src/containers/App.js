import React, { Component, Fragment } from 'react';
import '../css/App.css';
import { connect } from "react-redux";
import {handleInitialData} from "../actions/shared";
import {BrowserRouter, Route} from "react-router-dom";
import Dashboard from "./Dashboard";
import LoadingBar from 'react-redux-loading'
import Login from "./Login";
import Header from './Header'
import Menu from "./Menu";

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
                                        ?  <Route path='/login'
                                                  exact
                                                  component={Login}
                                            />
                                        : <div>
                                            <Header></Header>
                                            <Menu showAnswered={this.state.showAnswered} toggleQuestionsView={this.toggleQuestionsView}/>
                                            <div className='center'>
                                                <Route path='/'
                                                       exact
                                                       render = {() => (<Dashboard showAnswered={this.state.showAnswered} />)}
                                                />
                                                <Route path='/add'
                                                       render={() => (
                                                           <div>New Poll</div>)}
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
