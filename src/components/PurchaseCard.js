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
        let moneyPriceClass;
        if (this.props.card.money>9) {moneyPriceClass="price-money2"};
        let canBuy;
        const { game, team, card } = this.props;
        if (!game.teams.troy) return null;
        if ((game.teams[team].money > card.money-1) && (game.teams[team].food > card.food-1) && (game.whoTurn === team) && game.teams[team].buildings[this.shopRef[card.id]] && this.props.open) {
            canBuy = "purchaseable";
        };
        if (game.whoTurn === team && this.props.isInDelphi && this.props.open) {
            canBuy = "purchaseable"
        }
        return (
            <>
            <div onClick={this.props.closeBuyModal} className={`shop-buy-modal-out ${this.props.open}`}>
                <div className={`${this.props.team}-city-shop-in shop-buy-modal-in`}>
                    <div className="shop-buy-card-wrapper">
                        <Card card={this.props.card} team={this.props.team} type={"shopCard"}/>
                    </div>
                    <div className="shop-buy-card-price shop-card-price">
                        <div className="price-food">
                            {this.props.card.food} <img src={FoodIcon} alt="FoodIcon" />
                        </div>
                        <div className={`price-money ${moneyPriceClass}`}>
                            {this.props.card.money} <img src={CoinIcon} alt="CoinIcon" />
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
