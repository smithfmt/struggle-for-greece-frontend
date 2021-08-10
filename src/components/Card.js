import React from "react";
//import PropTypes from "prop-types";

class Card extends React.Component {

    openShop = () => {
        const user = JSON.parse(localStorage.getItem("SFGUser"));
        let team = Object.keys(this.props.game.teams).filter(team => this.props.game.teams[team].player===user.name)[0];
        if (team === this.props.card.type) {
            this.props.openCityShop("cityCenter");
        };  
    };

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
        if (card.text==="City") {
            let cityHealth = "full";
            if (card.cityHealth<7) {
                cityHealth="medium"
            }
            if (card.cityHealth<4) {
                cityHealth="low";
            }
            return (
                <>
                <div className={`card-wrapper ${this.props.team}-card ${this.props.moving}`} onClick={this.openShop} >
                    <div className={`card-img-wrapper ${this.props.moving}`}>
                        <img src={CardSrc} className={`card-image ${this.props.moving}`} alt="card" />
                    </div>
                    <div className={`card-name-wrapper ${cardName}`}><strong>{card.name}</strong></div>
                    <div className="card-text-wrapper">
                        <div className={`card-atk`}><strong>{card.atk}</strong></div>
                        <div className={`card-text ${cardText}`}><i>{card.text}</i></div>
                        <div className={`card-def ${cardHpClass}`}><strong>{card.hp}</strong></div>
                    </div>
                </div>
                <div className="city-health-outer">
                    <div className={`city-health-inner ${cityHealth}`} style={{width: `${card.cityHealth*10}%`}}></div>
                </div>
                </>
            )
        }
        if (this.props.type==="shopCard" || this.props.type==="heroShopCard") return (
            <>
            <div className={`card-wrapper ${this.props.team}-card ${this.props.moving}`}>
                <div className={`card-img-wrapper ${this.props.moving}`}>
                    <img src={CardSrc} className={`card-image ${this.props.moving}`} alt="card" />
                </div>
                <div className={`card-name-wrapper ${cardName}`}><strong>{card.name}</strong></div>
                <div className="card-text-wrapper">
                    <div className={`card-atk`}><strong>{card.atk}</strong></div>
                    <div className={`card-text ${cardText}`}><i>{card.text}</i></div>
                    <div className={`card-def ${cardHpClass}`}><strong>{card.hp}</strong></div>
                </div>
            </div>
            </>
        );
        return (
            <>
            <div className={`card-wrapper ${this.props.team}-card ${this.props.moving}`} onClick={() => {this.props.showMoves(this.props.card, this.props.id)}}>
                <div className={`card-img-wrapper ${this.props.moving}`}>
                    <img src={CardSrc} className={`card-image ${this.props.moving}`} alt="card" />
                </div>
                <div className={`card-name-wrapper ${cardName}`}><strong>{card.name}</strong></div>
                <div className="card-text-wrapper">
                    <div className={`card-atk`}><strong>{card.atk}</strong></div>
                    <div className={`card-text ${cardText}`}><i>{card.text}</i></div>
                    <div className={`card-def ${cardHpClass}`}><strong>{card.hp}</strong></div>
                </div>
            </div>
            </>
        )
    }
}

export default Card;