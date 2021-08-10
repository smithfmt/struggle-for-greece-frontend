import React from "react";
//import PropTypes from "prop-types";

class GameCard extends React.Component {

    render() {
        return (
            <div className="game-card">
                {this.props.game}
                <button onClick={() => this.props.joinGameFromList(this.props.game)}>
                    Join Game
                </button>
            </div>
        );
    };
}

export default GameCard;