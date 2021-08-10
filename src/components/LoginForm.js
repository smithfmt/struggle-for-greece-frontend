import React from "react";
//import PropTypes from "prop-types";

class LoginForm extends React.Component {

    nameRef = React.createRef();
    passwordRef = React.createRef();

    handleLogin = (e) => {
        e.preventDefault();
        const user = {
            name: this.nameRef.current.value,
            password: this.passwordRef.current.value,
            fb: false
        };
        this.props.login(user);
    };

    render() {
        return (
        <form className="login-form" onSubmit={this.handleLogin}>
            <h2>Login</h2>
            <p>Sign in to Play</p>
            <button 
                className="facebook" 
                onClick={() => this.props.login({fb: true})}>
                Login with Facebook
            </button>
            <input type="text" ref={this.nameRef} name="name" required placeholder="Name" />
            <input type="password" ref={this.passwordRef} name="password" required placeholder="Password" />
            <button type="submit">Submit →</button>
        </form>
        );
    };
}

export default LoginForm;