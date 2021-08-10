import React from "react";
//import PropTypes from "prop-types";
import FoodIcon from "../images/Icons/FoodIcon.png";
import CoinIcon from "../images/Icons/CoinIcon.png";
import Card from "./Card";

class CardInfo extends React.Component {
    state = {
        open: ""
    }
    openInfo = () => {
        if (this.state.open) {
            const open = "";
            this.setState({ open });
        } else {
            const open = "open";
            this.setState({ open });
        };
    };

    render() {
        const { team, card } = this.props;
        let moneyPriceClass ="";
        if (card.money>9) {moneyPriceClass="price-money2"};
        if (!card.type) return null;
        return (
            <>
            <div className={`card-info-tab ${this.state.open}`}>
                <div className="shop-buy-card-wrapper">
                    <Card card={card} team={team} type={"shopCard"}/>
                </div>
                <div className={`shop-buy-card-price shop-card-price ${(!card.money && !card.food) ? "hide" : ""}`}>
                    <div className="price-food">
                        {card.food} <img src={FoodIcon} alt="FoodIcon" />
                    </div>
                    <div className={`price-money ${moneyPriceClass}`}>
                        {card.money} <img src={CoinIcon} alt="CoinIcon" />
                    </div>
                </div>
                <div className="shop-buy-card-buffer"></div>
                <div className="shop-buy-card-description">
                    <strong>{card.text}</strong> 
                    {`: ${card.desc}`}
                </div>
                <button onClick={this.openInfo}><strong>{"<"}</strong></button>
            </div>
            </>
        );
    };
};

export default CardInfo;
