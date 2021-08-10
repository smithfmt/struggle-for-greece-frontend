import React from "react";
//import PropTypes from "prop-types";
import FoodIcon from "../images/Icons/FoodIcon.png";
import CoinIcon from "../images/Icons/CoinIcon.png";
import Card from "./Card";

class ShopCard extends React.Component {

    render() {
        if (!this.props.card) {
            return (
                <button className="shop-card">
                    {this.props.card.type}
                    <div className="shop-card-price">
                        <div className="price-food">
                            {this.props.card.food} <img src={FoodIcon} alt="FoodIcon" />
                        </div>
                        <div className="price-money">
                            {this.props.card.money} <img src={CoinIcon} alt="CoinIcon" />
                        </div>
                    </div>
                </button>
            );
        }
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
                        {this.props.card.food} <img src={FoodIcon} alt="FoodIcon" />
                    </div>
                    <div className={`price-money`}>
                        {this.props.card.money} <img src={CoinIcon} alt="CoinIcon" />
                    </div>
                </div>
            </button>
            </>
            );
        }
        let moneyPriceClass;
        if (this.props.card.money>9) {moneyPriceClass="price-money2"}
        return (
            <>
            <button className="shop-card" onClick={() => {this.props.openBuyModal(this.props.card)}}>
                <Card card={this.props.card} team={this.props.team} type={"shopCard"}/>
                <div className="shop-card-price">
                    <div className="price-food">
                        {this.props.card.food} <img src={FoodIcon} alt="FoodIcon" />
                    </div>
                    <div className={`price-money ${moneyPriceClass}`}>
                        {this.props.card.money} <img src={CoinIcon} alt="CoinIcon" />
                    </div>
                </div>
            </button>
            </>
        );
    };
};

export default ShopCard;
