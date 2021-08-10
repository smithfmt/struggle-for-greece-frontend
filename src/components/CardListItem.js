import React from "react";
//import PropTypes from "prop-types";
import FoodIcon from "../images/Icons/FoodIcon.png";
import CoinIcon from "../images/Icons/CoinIcon.png";

class CardListItem extends React.Component {

    render() {
        let card = this.props.card;
        if (!card.name) return null;
        let cardHpClass = "";
        if (card.hp > 9) {cardHpClass="card-def2"};
        let cardName = "";
        if (`${card.name}`.length>14) {cardName="long"};
        let cardText = "";
        if (`${card.text}`.length>20) {cardText="long"};
        if (this.props.type!=="heroShopCard" && `${card.text}`.length>14) {cardText="long"};
        const CardSrc = require(`../images/Cards/${card.img}.jpg`);
        if (!this.props.card || !this.props.card.img) return null;
        let moneyPriceClass;
        if (this.props.card.money>9) {moneyPriceClass="price-money2"}
        if (this.props.display) return (
            <>
            <button className="shop-card">
                <div className={`card-wrapper ${this.props.team}-card`} >
                    <div className={`card-img-wrapper`}>
                        <img src={CardSrc} className={`card-image `} alt="card" />
                    </div>
                    <div className={`card-name-wrapper ${cardName}`}><strong>{card.name}</strong></div>
                    <div className="card-text-wrapper">
                        <div className={`card-atk`}><strong>{card.atk}</strong></div>
                        <div className={`card-text ${cardText}`}><i>{card.text}</i></div>
                        <div className={`card-def ${cardHpClass}`}><strong>{card.hp}</strong></div>
                    </div>
                </div>
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
        return (
            <>
            <button className="shop-card" onClick={() => {this.props.openInfoModal(card)}}>
                <div className={`card-wrapper ${this.props.team}-card`} >
                    <div className={`card-img-wrapper`}>
                        <img src={CardSrc} className={`card-image `} alt="card" />
                    </div>
                    <div className={`card-name-wrapper ${cardName}`}><strong>{card.name}</strong></div>
                    <div className="card-text-wrapper">
                        <div className={`card-atk`}><strong>{card.atk}</strong></div>
                        <div className={`card-text ${cardText}`}><i>{card.text}</i></div>
                        <div className={`card-def ${cardHpClass}`}><strong>{card.hp}</strong></div>
                    </div>
                </div>
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

export default CardListItem;
