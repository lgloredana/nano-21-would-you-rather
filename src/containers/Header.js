import React, { Component } from 'react'
import {connect} from 'react-redux'
import {handleGetAuthedUser} from "../actions/authUser";

const Header = (props) => {

    const onLogOut = (e) => {
        e.preventDefault();
        props.dispatch(handleGetAuthedUser({id: null}))
    };
    const { authedUser } = props;

    return  (
        <div className='headerContent'>
            {authedUser ? authedUser.id : ''} /
            <button onClick={onLogOut}>LogOut</button>
        </div>
    )
};

function mapStateToProps({authedUser}){
    return {
        authedUser
    };
}

export default connect(mapStateToProps)(Header);