import React from "react";
import CardSlot from "./CardSlot";
//import PropTypes from "prop-types";

class DelphiBattlefield extends React.Component {

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
            <div className={`delphi-battlefield-container-${this.props.pos}`}>
                <div className={`delphi-battlefield`} id={this.props.id} >
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
                </div>
            </div>
        );
    };
};

export default DelphiBattlefield;