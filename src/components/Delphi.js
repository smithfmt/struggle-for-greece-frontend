import React from "react";
import DelphiBattlefield from "./DelphiBattlefield";
import HeroShopCard from "./HeroShopCard";
import PurchaseCard from "./PurchaseCard";
//import PropTypes from "prop-types";

class Delphi extends React.Component {
    
    state = {
        card: {},
        buyOpen: {},
        isInDelphi: false,
    }

    componentDidUpdate() {
        const cards = this.props.game.cards;
        let isInDelphi = false;
        if (!cards) return;
        Object.keys(cards).forEach(c => {
            if (c.split("-")[0]==="delphi" && cards[c].type===this.props.game.whoTurn) {
                isInDelphi = true;
            };
        });
        if (isInDelphi!==this.state.isInDelphi) {
            this.setState({ isInDelphi });
        };
    };

    openBuyModal = (c) => {
        const buyOpen = "open";
        const card = c;
        this.setState({ card, buyOpen });
    };

    closeBuyModal = (e) => {
        if(e.target===e.currentTarget){
            const buyOpen = "";
            this.setState({ buyOpen });
        };
    };

    buyCard = (card) => {
        const user = JSON.parse(localStorage.getItem("SFGUser"));
        const game = this.props.game;
        const team = Object.keys(game.teams).filter(team => {return game.teams[team].player === user.name})[0]
        if (team !== this.props.game.whoTurn) return;
        const buyOpen = "";
        if (game.delphi.hero1 === card) {
            game.delphi.hero1 = false;
        } else {
            game.delphi.hero2 = false;
        }
        this.setState({ buyOpen });
        this.props.buyingCard(card);
    };

    heroForHire = () => {
        if (!this.state.isInDelphi) return;
        this.props.heroForHire();
    };
    consultOracle = () => {
        if (!this.state.isInDelphi) return;
        this.props.consultOracle();
    };

    render() {
        const game = this.props.game;
        if (!game.teams) return null;
        const user = JSON.parse(localStorage.getItem("SFGUser"));
        let team = Object.keys(game.teams).filter(team => game.teams[team].player===user.name)[0];
        return (
            <div className="delphi-container">
                <DelphiBattlefield 
                pos="sparta" 
                id={"delphi-t2"} 
                cardSlotProps={this.props.cardSlotProps} 
                movingCard={this.props.movingCard}
                cards={this.props.cards}
                selectedCard={this.props.selectedCard}
                canMoveTo={this.props.canMoveTo}
                canAttack={this.props.canAttack}
                canCast={this.props.canCast}
                />
                <DelphiBattlefield 
                pos="troy" 
                id={"delphi-t4"} 
                cardSlotProps={this.props.cardSlotProps} 
                movingCard={this.props.movingCard}
                cards={this.props.cards}
                selectedCard={this.props.selectedCard}
                canMoveTo={this.props.canMoveTo}
                canAttack={this.props.canAttack}
                canCast={this.props.canCast}
                />
                <DelphiBattlefield 
                pos="athens" 
                id={"delphi-t1"} 
                cardSlotProps={this.props.cardSlotProps} 
                movingCard={this.props.movingCard}
                cards={this.props.cards}
                selectedCard={this.props.selectedCard}
                canMoveTo={this.props.canMoveTo}
                canAttack={this.props.canAttack}
                canCast={this.props.canCast}
                />
                <DelphiBattlefield 
                pos="thebes" 
                id={"delphi-t3"} 
                cardSlotProps={this.props.cardSlotProps} 
                movingCard={this.props.movingCard}
                cards={this.props.cards}
                selectedCard={this.props.selectedCard}
                canMoveTo={this.props.canMoveTo}
                canAttack={this.props.canAttack}
                canCast={this.props.canCast}
                />
                <div className="hero-hire">
                    <PurchaseCard 
                    card={this.state.card} 
                    team={team}
                    openBuyModal={this.openBuyModal}
                    closeBuyModal={this.closeBuyModal}
                    open={this.state.buyOpen}
                    game={game}
                    buyCard={this.buyCard}
                    isInDelphi={this.state.isInDelphi}
                    />
                    <HeroShopCard
                    id="hero1"
                    card={game.delphi.hero1}
                    openBuyModal={this.openBuyModal}
                    game={this.props.game}
                    />
                    <HeroShopCard
                    id="hero2"
                    card={game.delphi.hero2}
                    openBuyModal={this.openBuyModal}
                    game={this.props.game}
                    />
                </div>
                <div className="delphi-temple">
                   <button onClick={this.heroForHire} className="delphi-hero-button">Hero Hire</button>
                   <div className="delphi-temple-center">
                   </div>
                   <button onClick={this.consultOracle} className="delphi-oracle-button">Consult the Oracle</button> 
                </div>
            </div>
        )
    }
}

export default Delphi;