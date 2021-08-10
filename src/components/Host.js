import React from "react";
//import PropTypes from "prop-types";
import HostForm from "./HostForm";

class Host extends React.Component {

    render() {
        return (<>
        <h2 className="page-title">Host</h2>
            <HostForm hostLobby={this.props.hostLobby}/>
            <button className="mm-button" onClick={() => this.props.goToPage("/")}>Return to Main Menu</button>
            </>
        );
    }
}

export default Host;