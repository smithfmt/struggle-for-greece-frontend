import React from "react";
import Battlefield from "./Battlefield";
import Battlefield2 from "./Battlefield2";
import CityBattlefield from "./CityBattlefield";
import CityBattlefield2 from "./CityBattlefield2";
//import PropTypes from "prop-types";

class Battlefields extends React.Component {

    render() {
        return (
            <>
            <Battlefield 
            pos="l" id={"left"} 
            cardSlotProps={this.props.cardSlotProps} 
            movingCard={this.props.movingCard}
            cards={this.props.cards}
            selectedCard={this.props.selectedCard}
            canMoveTo={this.props.canMoveTo}
            canAttack={this.props.canAttack}
            canCast={this.props.canCast}
            />
            <Battlefield 
            pos="r" id={"right"} 
            cardSlotProps={this.props.cardSlotProps} 
            movingCard={this.props.movingCard}
            cards={this.props.cards}
            selectedCard={this.props.selectedCard}
            canMoveTo={this.props.canMoveTo}
            canAttack={this.props.canAttack}
            canCast={this.props.canCast}
            />
            <Battlefield2 
            pos="t" id={"top"} 
            cardSlotProps={this.props.cardSlotProps} 
            movingCard={this.props.movingCard}
            cards={this.props.cards}
            selectedCard={this.props.selectedCard}
            canMoveTo={this.props.canMoveTo}
            canAttack={this.props.canAttack}
            canCast={this.props.canCast}
            />
            <Battlefield2 
            pos="b" id={"bottom"} 
            cardSlotProps={this.props.cardSlotProps} 
            movingCard={this.props.movingCard}
            cards={this.props.cards}
            selectedCard={this.props.selectedCard}
            canMoveTo={this.props.canMoveTo}
            canAttack={this.props.canAttack}
            canCast={this.props.canCast}
            />
            <CityBattlefield 
            pos="as" id={"athensCity-t2"} 
            cardSlotProps={this.props.cardSlotProps} 
            movingCard={this.props.movingCard}
            cards={this.props.cards}
            selectedCard={this.props.selectedCard}
            canMoveTo={this.props.canMoveTo}
            canAttack={this.props.canAttack}
            canCast={this.props.canCast}
            />
            <CityBattlefield2 
            pos="ad" id={"athensCity-t3"} 
            cardSlotProps={this.props.cardSlotProps} 
            movingCard={this.props.movingCard}
            cards={this.props.cards}
            selectedCard={this.props.selectedCard}
            canMoveTo={this.props.canMoveTo}
            canAttack={this.props.canAttack}
            canCast={this.props.canCast}
            />
            <CityBattlefield 
            pos="ss" id={"spartaCity-t2"} 
            cardSlotProps={this.props.cardSlotProps} 
            movingCard={this.props.movingCard}
            cards={this.props.cards}
            selectedCard={this.props.selectedCard}
            canMoveTo={this.props.canMoveTo}
            canAttack={this.props.canAttack}
            canCast={this.props.canCast}
            />
            <CityBattlefield2 
            pos="sd" id={"spartaCity-t3"} 
            cardSlotProps={this.props.cardSlotProps} 
            movingCard={this.props.movingCard}
            cards={this.props.cards}
            selectedCard={this.props.selectedCard}
            canMoveTo={this.props.canMoveTo}
            canAttack={this.props.canAttack}
            canCast={this.props.canCast}
            />
            <CityBattlefield 
            pos="ts" id={"troyCity-t2"} 
            cardSlotProps={this.props.cardSlotProps} 
            movingCard={this.props.movingCard}
            cards={this.props.cards}
            selectedCard={this.props.selectedCard}
            canMoveTo={this.props.canMoveTo}
            canAttack={this.props.canAttack}
            canCast={this.props.canCast}
            />
            <CityBattlefield2 
            pos="td" id={"troyCity-t3"} 
            cardSlotProps={this.props.cardSlotProps} 
            movingCard={this.props.movingCard}
            cards={this.props.cards}
            selectedCard={this.props.selectedCard}
            canMoveTo={this.props.canMoveTo}
            canAttack={this.props.canAttack}
            canCast={this.props.canCast}
            />
            <CityBattlefield 
            pos="ths" id={"thebesCity-t2"} 
            cardSlotProps={this.props.cardSlotProps} 
            movingCard={this.props.movingCard}
            cards={this.props.cards}
            selectedCard={this.props.selectedCard}
            canMoveTo={this.props.canMoveTo}
            canAttack={this.props.canAttack}
            canCast={this.props.canCast}
            />
            <CityBattlefield2 
            pos="thd" id={"thebesCity-t3"} 
            cardSlotProps={this.props.cardSlotProps} 
            movingCard={this.props.movingCard}
            cards={this.props.cards}
            selectedCard={this.props.selectedCard}
            canMoveTo={this.props.canMoveTo}
            canAttack={this.props.canAttack}
            canCast={this.props.canCast}
            />
            </>
        )
    }
}

export default Battlefields;