import React from "react";
//import PropTypes from "prop-types";
import Card from "./Card"

class CardSlot extends React.Component {

    place = (e) => {
        if (![...e.currentTarget.classList].includes("can-place")) return;
        this.props.cardSlotProps.placeCard(e.currentTarget);
    };

    moveHere = () => {
        this.props.cardSlotProps.moveCard(this.props.id);
    };
    attackHere = () => {
        this.props.cardSlotProps.attackCard(this.props.id);
    };
    castHere = () => {
        this.props.cardSlotProps.castHere(this.props.id);
    };

    render() {
        const cardSlotProps = this.props.cardSlotProps;
        if(!this.props.id || !this.props.cards || !cardSlotProps) return null;
        const cards = this.props.cards;
        const card = cards[this.props.id];
        let selected = "";
        if (this.props.selectedCard === card) {selected="selected"}
        let canPlace = this.props.canPlace;
        if (!canPlace && !card) {canPlace = ""};
        if (!card) {
            if (canPlace) return (
                <div onClick={this.place} className={`card-slot ${canPlace}`} id={this.props.id}></div>
            );
            if (this.props.canMoveHere) return (
                <div onClick={this.moveHere} className={`card-slot ${canPlace} ${this.props.canMoveHere}`} id={this.props.id}></div>
            );
            return (
                <div className={`card-slot`} id={this.props.id}></div>
        )};
        if (this.props.canCastHere) return (
            <div onClick={this.castHere} className={`card-slot ${selected} ${this.props.canCastHere}`} id={this.props.id}>
                <Card 
                card={card}
                team={card.type}
                showMoves={cardSlotProps.showMoves}
                id={this.props.id}
                type={"boardCard"}
                openCityShop={this.props.openCityShop}
                game={this.props.game}
                />
            </div>
        );
        if (this.props.canAttackHere) return (
            <div onClick={this.attackHere}className={`card-slot ${selected} ${this.props.canAttackHere}`} id={this.props.id}>
                <Card 
                card={card}
                team={card.type}
                showMoves={cardSlotProps.showMoves}
                id={this.props.id}
                type={"boardCard"}
                openCityShop={this.props.openCityShop}
                game={this.props.game}
                />
            </div>
        );

        return (
            <div className={`card-slot ${selected}`} id={this.props.id}>
                <Card 
                card={card}
                team={card.type}
                showMoves={cardSlotProps.showMoves}
                id={this.props.id}
                type={"boardCard"}
                openCityShop={this.props.openCityShop}
                game={this.props.game}
                setInfoState={cardSlotProps.setInfoState}
                />
            </div>
        );
    };
};

export default CardSlot;