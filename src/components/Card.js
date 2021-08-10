import React from "react";
//import PropTypes from "prop-types";

class Card extends React.Component {

    openShop = () => {
        if (!this.props.setInfoState) return;
        this.props.setInfoState(this.props.card);
        const user = JSON.parse(localStorage.getItem("SFGUser"));
        let team = Object.keys(this.props.game.teams).filter(team => this.props.game.teams[team].player===user.name)[0];
        if (team === this.props.card.type) {
            this.props.openCityShop("cityCenter");
        };  
    };

    handleCardClick = () => {
        if (!this.props.setInfoState) return;
        this.props.setInfoState(this.props.card);
        this.props.showMoves(this.props.card, this.props.id);
    };

    render() {
        let card = this.props.card;
        if (!card.name) return null;
        let cardHpClass = "";
        if (card.modHp > 9) {cardHpClass="card-def2"};
        let cardName = "";
        if (`${card.name}`.length>14) {cardName="long"};
        let cardText = "";
        if (`${card.text}`.length>20) {cardText="long"};
        if (this.props.type!=="heroShopCard" && `${card.text}`.length>14) {cardText="long"};
        const CardSrc = require(`../images/Cards/${card.img}.jpg`);
        let cardHealth;
        if (card.text==="City") {
            cardHealth = card.cityHealth*10;
            if (card.cityHealth<1) {
                cardHealth = 0;
            };
            let cityHealth = "full";
            if (card.cityHealth<7) {
                cityHealth="medium"
                
            }
            if (card.cityHealth<4) {
                cityHealth="low";
            }
            let cityWalls;
            cityWalls = card.walls*10;
            if (card.walls<1) {
                cityWalls=0;
            };
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
                    <div className={`city-health-inner ${cityHealth}`} style={{width: `${cardHealth}%`}}></div>
                    <div className="city-walls-inner" style={{width: `${cityWalls}%`}}></div>
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
            <div className={`card-wrapper ${this.props.team}-card ${this.props.moving}`} onClick={this.handleCardClick} >
                <div className={`card-img-wrapper ${this.props.moving}`}>
                    <img src={CardSrc} className={`card-image ${this.props.moving}`} alt="card" />
                </div>
                <div className={`card-name-wrapper ${cardName}`}><strong>{card.name}</strong></div>
                <div className="card-text-wrapper">
                    <div className={`card-atk`}><strong>{card.modAtk}</strong></div>
                    <div className={`card-text ${cardText}`}><i>{card.text}</i></div>
                    <div className={`card-def ${cardHpClass}`}><strong>{card.modHp}</strong></div>
                </div>
            </div>
            </>
        )
    }
}

export default Card;