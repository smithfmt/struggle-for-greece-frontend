import React from "react";
//import PropTypes from "prop-types";
import CoinIcon from "../images/Icons/CoinIcon.png";
import FoodIcon from "../images/Icons/FoodIcon.png";

class ResourceBar extends React.Component {

    render() {
        const user = JSON.parse(localStorage.getItem("SFGUser"));
        if (!this.props.game.teams) {
            return <div className="resource"></div>
        }
        const team = Object.keys(this.props.game.teams).filter(tm => this.props.game.teams[tm].player===user.name)[0];
        const userStats = this.props.game.teams[team];
        let turnDisplay = this.props.game.whoTurn;
        turnDisplay=`${turnDisplay.split("")[0].toUpperCase()}${turnDisplay.slice(1)}`;
        return (
            <div className="resource-bar">
                <div className="resource">
                    {user.name}
                </div>
                <div className="resource">
                    {userStats.city}
                </div>
                <div className="resource">
                    {`City Level : ${userStats.level}`}
                </div>
                <div className="resource">
                    {`Money : ${userStats.money} `}
                </div>
                <div className="income">
                    {` + ${userStats.moneyIncome}`}
                </div>
                <div className="icon">
                    <img src={CoinIcon} alt="CoinIcon" />
                </div>
                <div className="resource">
                    {`Food : ${userStats.food} `}
                </div>
                <div className="income">
                    {` + ${userStats.foodIncome}`}
                </div>
                <div className="icon">
                    <img src={FoodIcon} alt="FoodIcon" />
                </div>
                <div className="resource">
                    {`Current Turn : ${turnDisplay}`}
                </div>
            </div>
        )
    }
}

export default ResourceBar;