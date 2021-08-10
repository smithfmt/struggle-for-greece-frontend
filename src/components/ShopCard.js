import React from "react";
//import PropTypes from "prop-types";
import FoodIcon from "../images/Icons/FoodIcon.png";
import CoinIcon from "../images/Icons/CoinIcon.png";
import Card from "./Card";

class ShopCard extends React.Component {
    
    render() {

        if (!this.props.card || !this.props.game) return null;
        const team = this.props.game.teams[this.props.team];
        let foodCost = this.props.card.food;
        let moneyCost = this.props.card.money;
        if (this.props.card.id==="Hero") {
            moneyCost = this.props.card.money - Object.values(team.modifiers.discount.heroes.int).filter(val => val!==null).reduce((acc, {value}) => value + acc, 0);
        };
        if (this.props.card.id==="Soldier") {
            foodCost = this.props.card.food - Object.values(team.modifiers.discount.soldiers.int).filter(val => val!==null).reduce((acc, {value}) => value + acc, 0);
        };

        if (this.props.bought && this.props.bought[this.props.card.name]) {
            return (
            <>
            <button className="shop-card">
                <div className="trained">
                    Trained
                </div>
                <Card card={this.props.card} team={this.props.team} type={"shopCard"}/>
                <div className="shop-card-price">
                    <div className="price-food">
                        {foodCost} <img src={FoodIcon} alt="FoodIcon" />
                    </div>
                    <div className={`price-money`}>
                        {moneyCost} <img src={CoinIcon} alt="CoinIcon" />
                    </div>
                </div>
            </button>
            </>
            );
        };
        let moneyPriceClass;
        if (moneyCost>9) {moneyPriceClass="price-money2"}
        return (
            <>
            <button className="shop-card" onClick={() => {this.props.openBuyModal(this.props.card)}}>
                <Card card={this.props.card} team={this.props.team} type={"shopCard"}/>
                <div className="shop-card-price">
                    <div className="price-food">
                        {foodCost} <img src={FoodIcon} alt="FoodIcon" />
                    </div>
                    <div className={`price-money ${moneyPriceClass}`}>
                        {moneyCost} <img src={CoinIcon} alt="CoinIcon" />
                    </div>
                </div>
            </button>
            </>
        );
    };
};

export default ShopCard;
