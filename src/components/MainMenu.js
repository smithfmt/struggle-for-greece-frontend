import React from "react";
//import PropTypes from "prop-types";
import Profile from "./Profile";

class MainMenu extends React.Component {

  render() {
    return (
      <>
      <div className="menu-wrapper">
            <div className="menu">
                <strong>Main Menu</strong>
                <button className="menu-button" onClick={(e) => this.props.goToPage(`/${e.currentTarget.id}`)} id="host">Host Game</button>
                <button className="menu-button" onClick={(e) => this.props.goToPage(`/${e.currentTarget.id}`)} id="join">Join Game</button>
                <button className="menu-button" onClick={(e) => this.props.goToPage(`/${e.currentTarget.id}`)} id="login">Login</button>
                <button className="menu-button" onClick={(e) => this.props.goToPage(`/${e.currentTarget.id}`)} id="privacy-policy">Privacy Policy</button>
            </div>
      </div>
      
      <Profile goToPage={this.props.goToPage} />
      </>
    );
  }
}

export default MainMenu;
