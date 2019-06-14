import React from 'react'
import {connect} from "react-redux";
import {handleSaveQuestion} from "../actions/questions";
import {withRouter} from 'react-router-dom'

class NewPoll extends React.Component{

    state = {
        optionOneTxt: '',
        optionTwoTxt: ''
    };

    onChangeOpt = (e) => {
        e.preventDefault();
        const text = e.target.value;
        const name = e.target.name;
        this.setState((prevState, callback) => {
            return {
                [name]: text
        }
        })
    };

    submitNewPoll = (e) => {
        e.preventDefault();
        this.props.dispatch(handleSaveQuestion({
            optionOneText: this.state.optionOneTxt,
            optionTwoText: this.state.optionTwoTxt
        }, this.onSuccesRedirect));
    };

    onSuccesRedirect = () => {
        this.props.history.push(`/`);
    };

    render () {
        const {optionOneTxt, optionTwoTxt} = this.state;
        return (<div>
            <h1>Would You Rather</h1>
            <form onSubmit={(e) => this.submitNewPoll(e)}>
                <textarea
                    className='optionInfo'
                    placeholder='Please enter question 1'
                    value={optionOneTxt}
                    name='optionOneTxt'
                    onChange={(e) => this.onChangeOpt(e)}
                >
                </textarea>
                <textarea
                    className='optionInfo'
                    placeholder='Please enter question 2'
                    value={optionTwoTxt}
                    name='optionTwoTxt'
                    onChange={(e) => this.onChangeOpt(e)}>
                </textarea>
                <br/>
                <button className='submitButton' type='submit' disabled={optionOneTxt==='' || optionTwoTxt === ''}>Create</button>
            </form>
        </div>)
    }
}


export default withRouter(connect()(NewPoll));