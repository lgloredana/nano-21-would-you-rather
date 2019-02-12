import React, { Component } from 'react'
import {connect} from 'react-redux'
import NavLink from "react-router-dom/es/NavLink";

class Menu extends Component{

    render() {

        return  (
            <nav className='nav'>
                <NavLink
                         activeClassName='active'
                         to='/'
                         onClick={this.props.toggleQuestionsView}>
                    {this.props.showAnswered ? 'Unanswered' : 'Answered'}
                </NavLink>
                <label> /////////////// </label>
                <NavLink
                        activeClassName='active'
                        to='/leaderboard'>
                    Leader Board
                </NavLink>
                <label> /////////////// </label>
                <NavLink
                        activeClassName='active'
                        to='/add'>
                    New Poll
                </NavLink>
            </nav>
        )
    }
}

function mapStateToProps({}, {showAnswered, toggleQuestionsView}){
    return {
        showAnswered,
        toggleQuestionsView
    };
}

export default connect(mapStateToProps)(Menu);