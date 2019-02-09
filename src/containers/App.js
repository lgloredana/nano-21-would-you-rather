import React, { Component, Fragment } from 'react';
import '../css/App.css';
import { connect } from "react-redux";
import {handleInitialData} from "../actions/shared";
import Login from "./Login";
import {BrowserRouter, Route} from "react-router-dom";

class App extends Component {
    componentDidMount() {
        this.props.dispatch(handleInitialData())
    }
    render() {
        return (
            <BrowserRouter>
                <Fragment>
                    <div>
                        <Route exact path='/' render={() => (
                            <div>Dashboard Answered/Unanswered</div>)}
                        />
                        <Route path='/login' render={() => (
                            <div>Login</div>)}
                        />
                        <Route path='/add' render={() => (
                            <div>New Poll</div>)}
                        />
                        <Route path='/questions/:question_id' render={() => (
                            <div>Question Details</div>)}
                        />
                        <Route path='/leaderboard' render={() => (
                            <div>Leader Board</div>)}
                        />
                    </div>
                </Fragment>
            </BrowserRouter>

        );
    }
}

export default connect()(App)
