import React from "react";
//import PropTypes from "prop-types";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

class Login extends React.Component {
    render() {
        return (<nav className="login">
            <LoginForm goToPage={this.props.goToPage} authenticate={this.props.authenticate} login={this.props.login} />
            <SignupForm goToPage={this.props.goToPage} authenticate={this.props.authenticate} signup={this.props.signup} />
            <button onClick={() => this.props.goToPage("/")}>Return to Main Menu</button>
        </nav>
        )
    };
}

export default Login;