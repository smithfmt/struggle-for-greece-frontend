import React from "react";
import { cityCards, delphiEvents, delphiHeroes } from "../data";
import CardListItem from "./CardListItem";
//import PropTypes from "prop-types";

class CardList extends React.Component {
    state = {
        card:{},
        open: "",
    };

    openInfoModal = (c) => {
        const open = "open";
        const card = {...c};
        this.setState({ card, open });
    };

    closeInfoModal = (e) => {
        if (e.currentTarget===e.target) {
            const open = "";
            this.setState({ open });
        };        
    };

    render() {
        const athensCards = ["athensCity", "athensCitizen", "athensSoldier", "athensArcher", "athensHorseman", "athensHero1", "athensHero2", "athensHero3", "athensHero4", "athensHero5",];
        const spartaCards = ["spartaCity", "spartaCitizen", "spartaSoldier", "spartaArcher", "spartaHorseman", "spartaHero1", "spartaHero2", "spartaHero3", "spartaHero4", "spartaHero5",];
        const thebesCards = ["thebesCity", "thebesCitizen", "thebesSoldier", "thebesArcher", "thebesHorseman", "thebesHero1", "thebesHero2", "thebesHero3", "thebesHero4", "thebesHero5",];
        const troyCards = ["troyCity", "troyCitizen", "troySoldier", "troyArcher", "troyHorseman", "troyHero1", "troyHero2", "troyHero3", "troyHero4", "troyHero5",];
        const heroCards = Object.keys(delphiHeroes);
        const eventCards = Object.keys(delphiEvents);

        return (
            <>
            <div onClick={this.closeInfoModal} className={`shop-buy-modal-out ${this.state.open}`}>
                <div className={`card-list-modal-in`}>
                    <div className="card-list-display-wrapper">
                        <CardListItem card={this.state.card} team={this.state.card.type} display={true}/>
                    </div>
                    <div className="shop-buy-card-buffer"></div>
                    <div className="shop-buy-card-description">
                        <strong>{this.state.card.text}</strong> 
                        {`: ${this.state.card.desc}`}
                    </div>
                </div>
            </div>
            <div className="card-list-container">
                <button className="card-list-button" onClick={() => this.props.closeCardList()}>Return to Game →</button>
                <h2 className="card-list-title">Athens</h2>
                <div className="card-list-section">
                    {athensCards.map(card => {return(
                        <div className="card-list-card">
                            <CardListItem openInfoModal={this.openInfoModal} card={cityCards[card]} team={"athens"} />
                        </div>
                    )})}
                </div>
                <h2 className="card-list-title">Sparta</h2>
                <div className="card-list-section">
                    {spartaCards.map(card => {return(
                        <div className="card-list-card">
                            <CardListItem openInfoModal={this.openInfoModal} card={cityCards[card]} team={"sparta"} />
                        </div>
                    )})}
                </div>
                <h2 className="card-list-title">Thebes</h2>
                <div className="card-list-section">
                    {thebesCards.map(card => {return(
                        <div className="card-list-card">
                            <CardListItem openInfoModal={this.openInfoModal} card={cityCards[card]} team={"thebes"} />
                        </div>
                    )})}
                </div>
                <h2 className="card-list-title">Troy</h2>
                <div className="card-list-section">
                    {troyCards.map(card => {return(
                        <div className="card-list-card">
                            <CardListItem openInfoModal={this.openInfoModal} card={cityCards[card]} team={"troy"} />
                        </div>
                    )})}
                </div>
                <h2 className="card-list-title">Delphi</h2>
                <div className="card-list-section">
                    {heroCards.map(card => {return(
                        <div className="card-list-card">
                            <CardListItem openInfoModal={this.openInfoModal} card={delphiHeroes[card]} team={"universal"} />
                        </div>
                    )})}
                </div>
                <h2 className="card-list-title">Events</h2>
                <div className="card-list-section">
                    {eventCards.map(card => {return(
                        <div className="card-list-card">
                            <CardListItem openInfoModal={this.openInfoModal} card={delphiEvents[card]} team={"universal"} />
                        </div>
                    )})}
                </div>
            </div>
            
            </>
        );
    }
}

export default CardList;