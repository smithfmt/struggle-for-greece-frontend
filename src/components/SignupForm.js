import React from "react";
//import PropTypes from "prop-types";

class SignupForm extends React.Component {
    fbRef = React.createRef();
    nameRef = React.createRef();
    passwordRef = React.createRef();

    handleSignup = (e) => {
        e.preventDefault();
        const user = {
            name: this.nameRef.current.value,
            password: this.passwordRef.current.value,
            fb: this.fbRef.current.checked
        };
        this.props.signup(user);
    };
    
    render() {
        return (
        <form onSubmit={this.handleSignup}> 
            <h2>Sign up</h2>
            <input type="text" ref={this.nameRef} name="name" required placeholder="Name" />
            <input type="password" ref={this.passwordRef} name="password" required placeholder="Password" />
            <label>  Link Facebook?</label>
            <input type="checkbox" ref={this.fbRef} name="facebook" />
            <button type="submit">Submit →</button>
        </form>
        );
    };
}

export default SignupForm;