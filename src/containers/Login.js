import React from 'react'
import {connect} from "react-redux";
import { handleGetAuthedUser} from "../actions/authUser";
import { Redirect,NavLink } from 'react-router-dom'

class Login extends React.Component{

    selectedUser = (e) => {
       e.preventDefault();
       this.props.dispatch(handleGetAuthedUser({id: e.target.value}));
    };

    render () {
        let options = this.props.users
            ? Object.keys(this.props.users).map((user) => {
                return <option value={user} key={user}>{user}</option>
            })
            : '';


        return (<div>
            Login Page <br/><br/>
           <select onChange={(e) => this.selectedUser(e)}>
               <option value="">--Please choose an user--</option>
               {options}
           </select>
        </div>)
    }
}

function mapStateToProps({users}){
    return {
        users
    };
}


export default connect(mapStateToProps)(Login);