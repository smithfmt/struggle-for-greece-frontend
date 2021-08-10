import React from "react";
//import PropTypes from "prop-types";
import CoinIcon from "../images/Icons/CoinIcon.png";

class CityBuildingShopItem extends React.Component {

    tryToBuy = () => {
        if (this.props.playerEcon.money > this.props.cost-1 && !this.props.buildings[this.props.building.id]) {
            this.props.buyBuilding(this.props.team, this.props.building.id, this.props.cost);
        };
    };

    render() {
        let bought = "";
        if (this.props.buildings[this.props.building.id]) {
            bought = "bought";
        };
        let canBuy = "";
        if (this.props.playerEcon.money > this.props.cost-1 && !this.props.buildings[this.props.building.id]) {
            canBuy = "can-buy";
        };
        return (
            <>
            <div className="city-building-shop-item">
                <button onClick={this.tryToBuy} className={`city-building-button ${bought} ${canBuy}`}></button>
                <h2 className="cost-display">{this.props.cost}<img src={CoinIcon} alt="CoinIcon" /></h2>
                <div className="city-building-shop-text"><div className="name">{this.props.building.name}</div><div style={{"font-size": "1vw"}}>{this.props.building.desc}</div></div>
            </div>
            </>
        );
    };
};

export default CityBuildingShopItem;
