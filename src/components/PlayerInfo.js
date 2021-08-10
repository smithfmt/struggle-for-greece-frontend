import React from "react";
import FoodIcon from "../images/Icons/FoodIcon.png";
import CoinIcon from "../images/Icons/CoinIcon.png";
//import PropTypes from "prop-types";

class PlayerInfo extends React.Component {

    render() {
        if (!this.props.game || !this.props.game.teams) return null;
        const game = this.props.game;
        const teams = Object.keys(game.teams);

        return (
            <>
            <button className="card-list-button" onClick={() => this.props.closePlayerInfo()}>Return to Game →</button>
            {teams.map(team => {
                let teamTitle = team.split("");
                teamTitle[0] = teamTitle[0].toUpperCase();
                teamTitle = teamTitle.join("")
                return (
                <div className={`player-info ${team}`}>
                    <h2>{`${teamTitle} - ${game.teams[team].player}`}</h2>
                    <h3>{`Level : ${game.teams[team].level}`}</h3>
                    <div className="player-info-resources">
                        <div>{game.teams[team].money} <img src={CoinIcon} alt="coin" /></div> <div>{game.teams[team].food} <img src={FoodIcon} alt="food" /></div>
                    </div>
                </div>
            )})}
            </>
        );
    }
}

export default PlayerInfo;