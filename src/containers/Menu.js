import React  from 'react'
import {connect} from 'react-redux'
import NavLink from "react-router-dom/es/NavLink";

const  Menu  = (props) =>{
        return  (
            <nav className='nav'>
                <NavLink
                         activeClassName='active'
                         to='/'
                         onClick={props.toggleQuestionsView}>
                    {props.showAnswered ? 'Unanswered' : 'Answered'}
                </NavLink>
                <label> -------- </label>
                <NavLink
                        activeClassName='active'
                        to='/leaderboard'>
                    Leader Board
                </NavLink>
                <label> ------------ </label>
                <NavLink
                        activeClassName='active'
                        to='/add'>
                    New Poll
                </NavLink>
            </nav>
        )
    };


function mapStateToProps(state, {showAnswered, toggleQuestionsView}){
    return {
        showAnswered,
        toggleQuestionsView
    };
}

export default connect(mapStateToProps)(Menu);