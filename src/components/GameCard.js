import React from "react";
//import PropTypes from "prop-types";

class GameCard extends React.Component {

    render() {
        return (
            <div className="game-card">
                <div>
                    {this.props.game} 
                </div>
                <button onClick={() => this.props.joinGameFromList(this.props.game)}>
                    Join Game
                </button>
                <div className="card-divider"></div>
            </div>
        );
    };
}

export default GameCard;