import React from "react";
//import PropTypes from "prop-types";
import CoinIcon from "../images/Icons/CoinIcon.png";
import Card from "./Card";

class HeroShopCard extends React.Component {

    render() {
        if (!this.props.card || !this.props.game) return (
            <button className="hero-shop-card">
                <div className="hero-shop-card-price">
                    <div className={`hero-price-money`}>
                        - <img src={CoinIcon} alt="CoinIcon" />
                    </div>
                </div>
            </button>
        );

        const user = JSON.parse(localStorage.getItem("SFGUser"));
        const team = Object.keys(this.props.game.teams).filter(t => this.props.game.teams[t].player===user.name)[0];
        let moneyCost = this.props.card.money;
        if (this.props.card.id==="Hero") {
            moneyCost = this.props.card.money - Object.values(this.props.game.teams[team].modifiers.discount.heroes.int).filter(val => val!==null).reduce((acc, {value}) => value + acc, 0);
        };

        let moneyPriceClass;
        if (moneyCost>9) {moneyPriceClass="price-money2"}
        return (
            <>
            <button className="hero-shop-card" onClick={() => {this.props.openBuyModal(this.props.card)}}>
                <Card card={this.props.card} team={this.props.team} type={"heroShopCard"}/>
                <div className="hero-shop-card-price">
                    <div className={`hero-price-money ${moneyPriceClass}`}>
                        {moneyCost} <img src={CoinIcon} alt="CoinIcon" />
                    </div>
                </div>
            </button>
            </>
        );
    };
};

export default HeroShopCard;
