import React from "react";
//import PropTypes from "prop-types";

class LobbyCard extends React.Component {
    
    handleJoin = () => {
        this.props.joinLobby(this.props.lobby)
    }

    render() {
        return (
            <div className="lobby-card">
                <div>
                  {`${this.props.lobby.name}  //  ${this.props.lobby.playerCount} /4`}  
                </div>
                <button onClick={this.handleJoin}>
                    Join Lobby
                </button>
            </div>
        );
    };
}

export default LobbyCard;