import React, { Component } from 'react'
import {connect} from 'react-redux'
import NavLink from "react-router-dom/es/NavLink";

const Header = (props) => {
    return  (
        <div className='headerContent'>
           {props.authedUser ? props.authedUser.id : ''} /
            <NavLink to='/login'>LogOut</NavLink>
        </div>
    )
};

function mapStateToProps({authedUser}){
    return {
        authedUser
    };
}

export default connect(mapStateToProps)(Header);