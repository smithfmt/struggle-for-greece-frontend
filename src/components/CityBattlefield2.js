import React from "react";
import CardSlot from "./CardSlot";
//import PropTypes from "prop-types";

class CityBattlefield2 extends React.Component {

    render() {
        let canMoveHere="";
        if (this.props.canMoveTo && this.props.canMoveTo.includes(`${this.props.id}`)) {
            canMoveHere="can-move-here";
        };
        let canAttackHere="";
        if (this.props.canAttack && this.props.canAttack.includes(this.props.id)) {
            canAttackHere="can-attack-here";
        };
        return (
            <div className={`city-battlefield2-container-${this.props.pos}`}>
                <div className={`city-battlefield2-${this.props.pos[this.props.pos.length-1]}`} id={this.props.id} >
                        <CardSlot 
                        id={`${this.props.id}-s1`} 
                        canMoveHere={canMoveHere} 
                        canAttackHere={canAttackHere}
                        cardSlotProps={this.props.cardSlotProps} 
                        movingCard={this.props.movingCard}
                        cards={this.props.cards}
                        selectedCard={this.props.selectedCard}
                        canMoveTo={this.props.canMoveTo}
                        canAttack={this.props.canAttack}
                        />
                        <CardSlot 
                        id={`${this.props.id}-s2`} 
                        canMoveHere={canMoveHere} 
                        canAttackHere={canAttackHere}
                        cardSlotProps={this.props.cardSlotProps} 
                        movingCard={this.props.movingCard}
                        cards={this.props.cards}
                        selectedCard={this.props.selectedCard}
                        canMoveTo={this.props.canMoveTo}
                        canAttack={this.props.canAttack}
                        />
                        <CardSlot 
                        id={`${this.props.id}-s3`} 
                        canMoveHere={canMoveHere} 
                        canAttackHere={canAttackHere}
                        cardSlotProps={this.props.cardSlotProps} 
                        movingCard={this.props.movingCard}
                        cards={this.props.cards}
                        selectedCard={this.props.selectedCard}
                        canMoveTo={this.props.canMoveTo}
                        canAttack={this.props.canAttack}
                        />   
                        <CardSlot 
                        id={`${this.props.id}-s4`} 
                        canMoveHere={canMoveHere} 
                        canAttackHere={canAttackHere}
                        cardSlotProps={this.props.cardSlotProps} 
                        movingCard={this.props.movingCard}
                        cards={this.props.cards}
                        selectedCard={this.props.selectedCard}
                        canMoveTo={this.props.canMoveTo}
                        canAttack={this.props.canAttack}
                        />
                        <div className="empty"></div>
                        <CardSlot 
                        id={`${this.props.id}-s5`} 
                        canMoveHere={canMoveHere} 
                        canAttackHere={canAttackHere}
                        cardSlotProps={this.props.cardSlotProps} 
                        movingCard={this.props.movingCard}
                        cards={this.props.cards}
                        selectedCard={this.props.selectedCard}
                        canMoveTo={this.props.canMoveTo}
                        canAttack={this.props.canAttack}
                        />  
                        <CardSlot 
                        id={`${this.props.id}-s6`} 
                        canMoveHere={canMoveHere} 
                        canAttackHere={canAttackHere}
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

export default CityBattlefield2;