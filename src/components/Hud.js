import React from "react";
//import PropTypes from "prop-types";
import ResourceBar from "./ResourceBar";
import CityShop from "./CityShop";
import CityCenterShop from "./CityCenterShop";
import EndTurn from "./EndTurn";
import CardInfo from "./CardInfo";

class Hud extends React.Component {

    setInfo = (e) => {
        this.props.setInfoState(this.props.delphiEvents[e]);
    };

    castAbility = ([ability, canTarget, event]) => {
        if (event) {
            this.props.castOnEvent(event);
        } else if (ability) {
            this.props.abilityButton();
        } else if (canTarget) {
            this.props.canTargetAbility();
        };
    };

    render() {
        if (!this.props.game || !this.props.game.teams) return null;
        const user = JSON.parse(localStorage.getItem("SFGUser"));
        const team = Object.keys(this.props.game.teams).filter(tm => this.props.game.teams[tm].player===user.name)[0];
        let shop = <CityShop game={this.props.game} cards={this.props.cards} buyingCard={this.props.buyingCard}/>
        if (this.props.shopType==="cityCenter") {
            shop = <CityCenterShop game={this.props.game} cards={this.props.cards} closeCityShop={this.props.closeCityShop} upLevel={this.props.upLevel} buyBuilding={this.props.buyBuilding} />
        }
        
        const modifiers = this.props.game.teams[team].modifiers
        let events = [];
        Object.keys(modifiers.income).forEach(key => {
            Object.keys(modifiers.income[key]).forEach(k => {
                Object.keys(modifiers.income[key][k]).forEach(eff => {
                    events.push(eff);
                });
            });
        });
        events = events.filter(e => {return e !== "effect"});
        const positive = ["bharvest", "fforaging", "festival", "grush", "gtrades"];
        const negative = ["drought", "famine", "fire", "volcano", "storm"];
        events = events.filter(e => {return positive.includes(e) || negative.includes(e)});
        let hide = "hidden";
        let selectedCard = "";
        if (this.props.selectedCard && (this.props.selectedCard.ability || this.props.selectedCard.canTarget) && !this.props.selectedCard.cast) {
            hide = "";
            selectedCard=this.props.selectedCard;
            const cardSlot = Object.keys(this.props.game.cards).filter(c => this.props.game.cards[c].name===this.props.selectedCard.name)[0];
            const cityBased = ["Clytemnestra", "Hecuba", "Ariadne", "Penelope",];
            if (cityBased.includes(this.props.selectedCard.name) && cardSlot.split("-")[0]!==`${this.props.selectedCard.type}City`) {
                hide = "hidden";
            };
        };
        let cdHide = "hidden"
        let cd = "";
        if (this.props.selectedCard.cooldown && this.props.selectedCard.cooldown!==0) {
          cdHide = "";
          cd = "cd";
        };
        
        let casting = "";
        if (this.props.canCast[0]==="events") {
            casting = "can-cast-event";
        };
        
        return (
            <>
            {casting ? (<div className="event-icon-container">
                {events.map(e => {
                    return <div onClick={() => this.castAbility(["","",e])} className={`${casting} event-icon ${positive.includes(e) ? "positive" : "negative"}`}><img src={require(`../images/Icons/${e}.png`)} alt="event" /></div>
                })}
            </div>) : (<div className="event-icon-container">
                {events.map(e => {
                    return <div onClick={() => this.setInfo(e)} className={`event-icon ${positive.includes(e) ? "positive" : "negative"}`}><img src={require(`../images/Icons/${e}.png`)} alt="event" /></div>
                })}
            </div>)}
            <ResourceBar game={this.props.game} />
            {shop}
            <EndTurn endTurn={this.props.endTurn} game={this.props.game} />
            <CardInfo team={team} card={this.props.cardInfo} />
            <button onClick={() => this.castAbility([selectedCard.ability, selectedCard.canTarget])} className={`ability-button ${cd} ${hide} ${selectedCard.type || ""}`}>
                <strong>{selectedCard.text || ""}</strong>
                <div className={`cooldown-div ${cdHide}`}>{this.props.selectedCard.cooldown}</div>    
            </button>
            </>
        )
    }
}

export default Hud;