import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signin } from './../action/user';
import LoadingBox from './../components/LoadingBox';
import MessageBox from '../components/MessageBox';

class SignInScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            redirect: this.props.location.search
                ? this.props.location.search.split('=')[1]
                : '/'
        }
    }
    componentDidMount() {
        if (this.props.userInfo) {
            this.props.history.push(this.state.redirect);
        }

    }
    submitHandler = (e) => {
        e.preventDefault();
        this.props.signin(this.state.email, this.state.password);
    }

    onChangeEmail = (e) => {
        this.setState({ email: e.target.value });
    }
    onChangePassword = (e) => {
        this.setState({ password: e.target.value });
    }
    render() {
        return (
            <div>
                <form className="form" onSubmit={this.submitHandler}>
                    <div>
                        <h1>Sing In</h1>
                    </div>
                    {this.props.loading && <LoadingBox></LoadingBox>}
                    {this.props.error && <MessageBox variant="danger">{this.props.error}</MessageBox>}
                    <div>
                        <label htmlFor="txtEmail">Email Address</label>
                        <input type="email" id="txtEmail" value={this.state.email} onChange={this.onChangeEmail} />
                    </div>
                    <div><label htmlFor="txtPassword">Password</label><input type="password" id="txtPassword" value={this.state.password} onChange={this.onChangePassword} /></div>
                    <div><label /><button className="primary" type="submit">Sign In</button></div>
                    <div>
                        <label />
                        <div>New User:{' '}<Link to='/register'>Create New Account</Link></div>
                    </div>
                </form>
            </div>
        );
    }
}
const mapStateToProps = (props) => {
    return {
        userInfo: props.userSignIn.userInfo,
        loading: props.userSignIn.loading,
        error: props.userSignIn.error
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        signin: (email, password) => { dispatch(signin(email, password)) }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen);