import React from "react";
//import PropTypes from "prop-types";

class PlayerCard extends React.Component {

    render() {
        if (this.props.lobby) {
            let team = "";
            if (this.props.lobby.city==="choice") {
                team = this.props.team;
            }
            if (this.props.lobby && this.props.lobby.slots[this.props.id].filled) {
                const ready = this.props.lobby.slots[this.props.id].ready ? "ready" : "";
                return (
                    <div className="player-card">
                        <div>
                            {this.props.lobby.slots[this.props.id].filled}  
                        </div>
                        <button onClick={this.props.ready} id={this.props.id} className={`player-card-button ${ready}`}>Ready</button>
                    </div>
                )
            };
            return (
                <div className="player-card">
                    <div>
                    Player Name  
                    </div>
                    <button 
                        className="facebook player-card-button"
                        id={this.props.id} 
                        onClick={this.props.join}>
                        Join {team}
                    </button>
                </div>
            );
        } else return null;
    };
}

export default PlayerCard;