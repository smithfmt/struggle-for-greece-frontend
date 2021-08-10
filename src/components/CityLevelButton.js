import React from "react";
//import PropTypes from "prop-types";

class CityLevelButton extends React.Component {

    tryToBuy = () => {
        if (this.props.playerEcon.food > this.props.cost.food-1 && this.props.playerEcon.money > this.props.cost.money-1) {
        this.props.upLevel(this.props.team, this.props.cost);
        };
    }

    render() {
        let bought = "";
        if (this.props.cityLevel > this.props.id-1) {
            bought = "bought";
        };
        if (this.props.pericles) {
            bought = "";
            if (this.props.cityLevel > this.props.id) {
                bought = "bought";
            };
        };
        let canBuy = "";
        if (this.props.cityLevel === this.props.id-1) {
            if (this.props.playerEcon.food > this.props.cost.food-1 && this.props.playerEcon.money > this.props.cost.money-1) {
                canBuy = "can-buy"
            };
        };
        if (this.props.pericles) {
            canBuy = "";
            if (this.props.cityLevel === this.props.id) {
                if (this.props.playerEcon.food > this.props.cost.food-1 && this.props.playerEcon.money > this.props.cost.money-1) {
                    canBuy = "can-buy"
                };
            };
        };
        return (
            <>
            <button onClick={this.tryToBuy} onMouseOver={() => {this.props.updateLevelDisplay(this.props.id)}} style={this.props.style} className={`city-level-button ${bought} ${canBuy}`} id={this.props.id}>{this.props.id}</button>
            </>
        );
    };
};

export default CityLevelButton;
