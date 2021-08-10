import React from "react";
//import PropTypes from "prop-types";
import HostForm from "./HostForm";

class Host extends React.Component {

    render() {
        return (<>
            <HostForm hostLobby={this.props.hostLobby}/>
            <button onClick={() => this.props.goToPage("/")}>Return to Main Menu</button>
            </>
        );
    }
}

export default Host;