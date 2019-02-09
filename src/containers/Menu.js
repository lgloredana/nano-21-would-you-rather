import React, { Component } from 'react'
import {connect} from 'react-redux'
import NavLink from "react-router-dom/es/NavLink";

class Menu extends Component{

    render() {
        return  (
            <nav className='nav'>
                <ul>
                    <li>
                        <NavLink to='/' exact activeClassName='active'  onClick={this.props.toggleQuestionsView}>
                            {this.props.showAnswered ? 'Answered' : 'Unanswered'}
                        </NavLink>
                    </li>
                </ul>
                <ul>
                    <li>
                        <NavLink to='/leaderboard' activeClassName='active'>
                            Leader Board
                        </NavLink>
                    </li>
                </ul>
                <ul>
                    <li>
                        <NavLink to='/add' activeClassName='active'>
                            New Poll
                        </NavLink>
                    </li>
                </ul>
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