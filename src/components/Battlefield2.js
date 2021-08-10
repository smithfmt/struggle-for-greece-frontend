import React from "react";
import CardSlot from "./CardSlot";
//import PropTypes from "prop-types";

class Battlefield2 extends React.Component {

    render() {
        let canMoveHere1="";
        if (this.props.canMoveTo && this.props.canMoveTo.includes(`${this.props.id}-t1`)) {
            canMoveHere1="can-move-here";
        };
        let canMoveHere2="";
        if (this.props.canMoveTo && this.props.canMoveTo.includes(`${this.props.id}-t2`)) {
            canMoveHere2="can-move-here";
        };
        let canAttackHere1="";
        if (this.props.canAttack && this.props.canAttack.includes(`${this.props.id}-t1`)) {
            canAttackHere1="can-attack-here";
        };
        let canAttackHere2="";
        if (this.props.canAttack && this.props.canAttack.includes(`${this.props.id}-t2`)) {
            canAttackHere2="can-attack-here";
        };
        return (
            <div className={`battlefield-container-${this.props.pos}`}>
                <div className={`battlefield2-t1`}>
                        <CardSlot 
                        id={`${this.props.id}-t1-s1`} 
                        canMoveHere={canMoveHere1} 
                        canAttackHere={canAttackHere1}
                        cardSlotProps={this.props.cardSlotProps} 
                        movingCard={this.props.movingCard}
                        cards={this.props.cards}
                        selectedCard={this.props.selectedCard}
                        canMoveTo={this.props.canMoveTo}
                        canAttack={this.props.canAttack}
                        />
                        <CardSlot 
                        id={`${this.props.id}-t1-s2`} 
                        canMoveHere={canMoveHere1} 
                        canAttackHere={canAttackHere1}
                        cardSlotProps={this.props.cardSlotProps} 
                        movingCard={this.props.movingCard}
                        cards={this.props.cards}
                        selectedCard={this.props.selectedCard}
                        canMoveTo={this.props.canMoveTo}
                        canAttack={this.props.canAttack}
                        />
                        <CardSlot 
                        id={`${this.props.id}-t1-s3`} 
                        canMoveHere={canMoveHere1} 
                        canAttackHere={canAttackHere1}
                        cardSlotProps={this.props.cardSlotProps} 
                        movingCard={this.props.movingCard}
                        cards={this.props.cards}
                        selectedCard={this.props.selectedCard}
                        canMoveTo={this.props.canMoveTo}
                        canAttack={this.props.canAttack}
                        />   
                        <CardSlot 
                        id={`${this.props.id}-t1-s4`} 
                        canMoveHere={canMoveHere1} 
                        canAttackHere={canAttackHere1}
                        cardSlotProps={this.props.cardSlotProps} 
                        movingCard={this.props.movingCard}
                        cards={this.props.cards}
                        selectedCard={this.props.selectedCard}
                        canMoveTo={this.props.canMoveTo}
                        canAttack={this.props.canAttack}
                        />
                        <div className="empty"></div>  
                        <CardSlot 
                        id={`${this.props.id}-t1-s5`} 
                        canMoveHere={canMoveHere1} 
                        canAttackHere={canAttackHere1}
                        cardSlotProps={this.props.cardSlotProps} 
                        movingCard={this.props.movingCard}
                        cards={this.props.cards}
                        selectedCard={this.props.selectedCard}
                        canMoveTo={this.props.canMoveTo}
                        canAttack={this.props.canAttack}
                        />
                        <CardSlot 
                        id={`${this.props.id}-t1-s6`} 
                        canMoveHere={canMoveHere1} 
                        canAttackHere={canAttackHere1}
                        cardSlotProps={this.props.cardSlotProps} 
                        movingCard={this.props.movingCard}
                        cards={this.props.cards}
                        selectedCard={this.props.selectedCard}
                        canMoveTo={this.props.canMoveTo}
                        canAttack={this.props.canAttack}
                        />  
                </div>
                <div className={`battlefield2-t2`}>
                        <CardSlot 
                        id={`${this.props.id}-t2-s1`} 
                        canMoveHere={canMoveHere2} 
                        canAttackHere={canAttackHere2}
                        cardSlotProps={this.props.cardSlotProps} 
                        movingCard={this.props.movingCard}
                        cards={this.props.cards}
                        selectedCard={this.props.selectedCard}
                        canMoveTo={this.props.canMoveTo}
                        canAttack={this.props.canAttack}
                        />
                        <CardSlot 
                        id={`${this.props.id}-t2-s2`} 
                        canMoveHere={canMoveHere2} 
                        canAttackHere={canAttackHere2}
                        cardSlotProps={this.props.cardSlotProps} 
                        movingCard={this.props.movingCard}
                        cards={this.props.cards}
                        selectedCard={this.props.selectedCard}
                        canMoveTo={this.props.canMoveTo}
                        canAttack={this.props.canAttack}
                        />
                        <CardSlot 
                        id={`${this.props.id}-t2-s3`} 
                        canMoveHere={canMoveHere2} 
                        canAttackHere={canAttackHere2}
                        cardSlotProps={this.props.cardSlotProps} 
                        movingCard={this.props.movingCard}
                        cards={this.props.cards}
                        selectedCard={this.props.selectedCard}
                        canMoveTo={this.props.canMoveTo}
                        canAttack={this.props.canAttack}
                        />
                        <CardSlot 
                        id={`${this.props.id}-t2-s4`} 
                        canMoveHere={canMoveHere2} 
                        canAttackHere={canAttackHere2}
                        cardSlotProps={this.props.cardSlotProps} 
                        movingCard={this.props.movingCard}
                        cards={this.props.cards}
                        selectedCard={this.props.selectedCard}
                        canMoveTo={this.props.canMoveTo}
                        canAttack={this.props.canAttack}
                        />  
                        <div className="empty"></div>  
                        <CardSlot 
                        id={`${this.props.id}-t2-s5`} 
                        canMoveHere={canMoveHere2} 
                        canAttackHere={canAttackHere2}
                        cardSlotProps={this.props.cardSlotProps} 
                        movingCard={this.props.movingCard}
                        cards={this.props.cards}
                        selectedCard={this.props.selectedCard}
                        canMoveTo={this.props.canMoveTo}
                        canAttack={this.props.canAttack}
                        />
                        <CardSlot 
                        id={`${this.props.id}-t2-s6`} 
                        canMoveHere={canMoveHere2} 
                        canAttackHere={canAttackHere2}
                        cardSlotProps={this.props.cardSlotProps} 
                        movingCard={this.props.movingCard}
                        cards={this.props.cards}
                        selectedCard={this.props.selectedCard}
                        canMoveTo={this.props.canMoveTo}
                        canAttack={this.props.canAttack}
                        /> 
                </div>
            </div>
        )
    }
}

export default Battlefield2;