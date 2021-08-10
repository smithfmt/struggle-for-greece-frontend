import React from "react";
//import PropTypes from "prop-types";
import CoinIcon from "../images/Icons/CoinIcon.png";
import Card from "./Card";

class HeroShopCard extends React.Component {

    render() {
        if (!this.props.card) return (
            <button className="hero-shop-card">
                <div className="hero-shop-card-price">
                    <div className={`hero-price-money`}>
                        - <img src={CoinIcon} alt="CoinIcon" />
                    </div>
                </div>
            </button>
        );
        let moneyPriceClass;
        if (this.props.card.money>9) {moneyPriceClass="price-money2"}
        return (
            <>
            <button className="hero-shop-card" onClick={() => {this.props.openBuyModal(this.props.card)}}>
                <Card card={this.props.card} team={this.props.team} type={"heroShopCard"}/>
                <div className="hero-shop-card-price">
                    <div className={`hero-price-money ${moneyPriceClass}`}>
                        {this.props.card.money} <img src={CoinIcon} alt="CoinIcon" />
                    </div>
                </div>
            </button>
            </>
        );
    };
};

export default HeroShopCard;
