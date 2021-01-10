import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { register, signin } from '../action/user';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

class RegisterScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
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
        if (this.state.password !== this.state.confirmPassword)
            alert("Password And Confirm Password Not Same...");
        else
            this.props.register(this.state.name, this.state.email, this.state.password);
    }
    onChangeName = (e) => {
        this.setState({ name: e.target.value });
    }
    onChangeEmail = (e) => {
        this.setState({ email: e.target.value });
    }
    onChangePassword = (e) => {
        this.setState({ password: e.target.value });
    }
    onChangeConfirmPassword = (e) => {
        this.setState({ confirmPassword: e.target.value });
    }
    render() {
        return (
            <div>
                <form className="form" onSubmit={this.submitHandler}>
                    <div>
                        <h1>Register</h1>
                    </div>
                    {this.props.loading && <LoadingBox></LoadingBox>}
                    {this.props.error && <MessageBox variant="danger">{this.props.error}</MessageBox>}
                    <div>
                        <label htmlFor="txtName">Name</label>
                        <input type="text" id="txtName" placeholder="Enter Name" value={this.state.name} onChange={this.onChangeName} />
                    </div>
                    <div>
                        <label htmlFor="txtEmail">Email Address</label>
                        <input type="email" id="txtEmail" placeholder="Enter Email" value={this.state.email} onChange={this.onChangeEmail} />
                    </div>
                    <div>
                        <label htmlFor="txtPassword">Password</label>
                        <input type="password" id="txtPassword" placeholder="Enter Password" value={this.state.password} onChange={this.onChangePassword} />
                    </div>
                    <div>
                        <label htmlFor="txtConfirmPassword">Confirm Password</label>
                        <input type="password" id="txtConfirmPassword" placeholder="Enter COnfirm Password" value={this.state.confirmPassword} onChange={this.onChangeConfirmPassword} />
                    </div>
                    <div><label /><button className="primary" type="submit">Reginstration</button></div>
                    <div>
                        <label />
                        <div>Already have an accoount:{' '}<Link to={'/signin?redirect=' + this.state.redirect}>Sign-In</Link></div>
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
        register: (name, email, password) => { dispatch(register(name, email, password)) }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);