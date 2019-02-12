import React from 'react'
import {connect} from "react-redux";
import {handleSaveQuestion} from "../actions/questions";
import {Redirect, withRouter} from 'react-router-dom'

class NewPoll extends React.Component{

    state = {
        opt1Txt: '',
        opt2Txt: ''
    };

    onChangeOpt1 = (e) => {
        e.preventDefault();
        const text = e.target.value;
        this.setState((prevState, callback) => {
            return {
                opt1Txt: text
            }
        })
    };

    onChangeOpt2 = (e) => {
        e.preventDefault();
        const text = e.target.value;
        this.setState((prevState, callback) => {
            return {
                opt2Txt: text
        }
        })
    };

    submitNewPoll = (e) => {
        e.preventDefault();
        this.props.dispatch(handleSaveQuestion({
            optionOneText: this.state.opt1Txt,
            optionTwoText: this.state.opt2Txt
        }, this.onSuccesRedirect));
    };

    onSuccesRedirect = () => {
        this.props.history.push(`/`);
    };

    render () {
        const {opt1Txt, opt2Txt} = this.state;
        return (<div>
            <h1>Would You Rather</h1>
            <form onSubmit={(e) => this.submitNewPoll(e)}>
                <textarea
                    className='optionInfo'
                    placeholder='Please enter question 1'
                    value={opt1Txt}
                    onChange={(e) => this.onChangeOpt1(e)}
                >
                </textarea>
                <textarea
                    className='optionInfo'
                    placeholder='Please enter question 2'
                    value={opt2Txt}
                    onChange={(e) => this.onChangeOpt2(e)}>
                </textarea>
                <br/>
                <button className='submitButton' type='submit' disabled={opt1Txt==='' || opt2Txt === ''}>Create</button>
            </form>
        </div>)
    }
}


export default withRouter(connect()(NewPoll));