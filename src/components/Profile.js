import React from "react";
//import PropTypes from "prop-types";

class Profile extends React.Component {

    logout = () => {
        localStorage.removeItem("SFGUser"); 
        this.props.goToPage("/");
    }

    render() {
        const user = JSON.parse(localStorage.getItem("SFGUser"));
        if (!user) {
            return (
                <div className="profile">
                    <button onClick={() => this.props.goToPage("/login")}>Login to View Your Profile →</button>
                </div>
            )
        }
        return (
            <div className="profile">
                <h2>{user.name}'s Profile</h2>
                <div>Wins: {user.wins} Losses: {user.losses} Win%: {Math.floor(user.wins/(user.wins+user.losses)*100)}%</div>
                <button onClick={this.logout} className="nav-button" >Logout →</button>
            </div>
        );
    };
}

export default Profile;