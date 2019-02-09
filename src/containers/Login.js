import React from 'react'
import {connect} from "react-redux";
import {getAuthUser} from "../actions/authUser";

class Login extends React.Component{

    selectedUser = (e) => {
       e.preventDefault();
       console.log('--------- ');
       console.dir(e.target);
       // this.props.dispatch(getAuthUser(e.target.value))
    };

    render () {
        console.log('***************');
        console.dir(this.props.users);
        console.dir(this.props.users ? this.props.users.length : 0);
        // const options = this.props.users
        //         ? this.props.users.map((key, value) => {
        //             return (<option value={key}>{value.name}</option>)
        //         })
        // : [];
        // const options = [];

        return (<div>
           <select onClick={(e) => this.selectedUser(e)}>
               <option value="">--Please choose an user--</option>
               {/*{options}*/}
           </select>
        </div>)
    }
}

function mapStateToProps({authedUser, users}){
    return {
        authedUser,
        users
    };
}


export default connect(mapStateToProps)(Login);