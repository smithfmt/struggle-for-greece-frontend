import React from "react";
//import PropTypes from "prop-types";
import FoodIcon from "../images/Icons/FoodIcon.png";
import CoinIcon from "../images/Icons/CoinIcon.png";
import Card from "./Card";

class PurchaseCard extends React.Component {

    shopRef = {
        Citizen: "city",
        Soldier: "barracks",
        Archer: "archerRange",
        Horseman: "stables",
        Siege: "workshop",
        Hero: "city",
    };

    render() {
        let moneyPriceClass="";
        let canBuy = "";
        const { game, team, card } = this.props;
        if (card.money>9) {moneyPriceClass="price-money2"};

        let foodCost = card.food;
        let moneyCost = card.money;
        if (card.id==="Hero") {
            moneyCost = card.money - Object.values(game.teams[team].modifiers.discount.heroes.int).filter(val => val!==null).reduce((acc, {value}) => value + acc, 0);
        };
        if (card.id==="Soldier") {
            foodCost = card.food - Object.values(game.teams[team].modifiers.discount.soldiers.int).filter(val => val!==null).reduce((acc, {value}) => value + acc, 0);
        };

        if (!game.teams.troy || !game.teams.troy.money) return null;
        if ((game.teams[team].money > card.money-1) && (game.teams[team].food > card.food-1) && (game.whoTurn === team) && game.teams[team].buildings[this.shopRef[card.id]] && this.props.open) {
            canBuy = "purchaseable";
        };
        if (game.whoTurn === team && this.props.isInDelphi && this.props.open && game.teams[team].money > card.money-1) {
            canBuy = "purchaseable"
        };
        if (this.props.card.text==="Citizen") {
            canBuy = "";
            if (team==="sparta") {
                canBuy = "purchaseable";
            } else if (game.teams[team].citizens.number < game.teams[team].level+1 && game.whoTurn === team && game.teams[team].food>0) {
                canBuy = "purchaseable";
            };
        };
        return (
            <>
            <div onClick={this.props.closeBuyModal} className={`shop-buy-modal-out ${this.props.open}`}>
                <div className={`${this.props.team}-city-shop-in shop-buy-modal-in`}>
                    <div className="shop-buy-card-wrapper">
                        <Card card={this.props.card} team={this.props.team} type={"shopCard"}/>
                    </div>
                    <div className="shop-buy-card-price shop-card-price">
                        <div className="price-food">
                            {foodCost} <img src={FoodIcon} alt="FoodIcon" />
                        </div>
                        <div className={`price-money ${moneyPriceClass}`}>
                            {moneyCost} <img src={CoinIcon} alt="CoinIcon" />
                        </div>
                    </div>
                    <div className="shop-buy-card-buffer"></div>
                    <div className="shop-buy-card-description">
                        <strong>{this.props.card.text}</strong> 
                        {`: ${this.props.card.desc}`}
                    </div>
                    <button 
                        className={`shop-buy-card-button ${canBuy}`} 
                        onClick={(e) => this.props.buyCard(card)}>
                        Buy {this.props.card.name}
                    </button>
                </div>
            </div>
            </>
        );
    };
};

export default PurchaseCard;
