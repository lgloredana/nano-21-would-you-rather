import React, { Component } from 'react'
import {connect} from 'react-redux'
import {handleGetAuthedUser} from "../actions/authUser";

class Header extends Component{
    onLogOut = (e) => {
        e.preventDefault();
        this.props.dispatch(handleGetAuthedUser({id: null}))
    };
    render(){
        const { authedUser } = this.props;
        return  (
            <div className='headerContent'>
                {authedUser ? authedUser.id : ''} /
                <button onClick={this.onLogOut}>LogOut</button>
            </div>
        )
    }
};

function mapStateToProps({authedUser}){
    return {
        authedUser
    };
}

export default connect(mapStateToProps)(Header);