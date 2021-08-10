import React from "react";
//import PropTypes from "prop-types";

class EndTurn extends React.Component {

    handleClick = () => {
        const user = JSON.parse(localStorage.getItem("SFGUser"));
        if (this.props.game.teams[this.props.game.whoTurn].player !== user.name) return;
        this.props.endTurn();
    }

    render() {
        return (
            <div className="end-turn-wrapper">
                <button className="end-turn-button" onClick={this.handleClick}>
                    <strong>→</strong>
                </button>
            </div>
        )
    }
}

export default EndTurn;