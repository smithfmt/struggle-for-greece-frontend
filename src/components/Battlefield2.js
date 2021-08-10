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
        let canCastHere1="";
        if (this.props.canCast && this.props.canCast.includes(`${this.props.id}-t1`)) {
            canCastHere1="can-cast-here";
        };
        let canCastHere2="";
        if (this.props.canCast && this.props.canCast.includes(`${this.props.id}-t2`)) {
            canCastHere2="can-cast-here";
        };
        return (
            <div className={`battlefield-container-${this.props.pos}`}>
                <div className={`battlefield2-t1`}>
                    {["-s1","-s2","-s3","-s4","-s5","-s6"].map(id => {return (
                        <CardSlot 
                        id={`${this.props.id}-t1${id}`} 
                        canMoveHere={canMoveHere1} 
                        canAttackHere={canAttackHere1}
                        canCastHere={canCastHere1}
                        cardSlotProps={this.props.cardSlotProps} 
                        movingCard={this.props.movingCard}
                        cards={this.props.cards}
                        selectedCard={this.props.selectedCard}
                        key={`${this.props.id}-t1${id}`}
                        />
                    )})}
                </div>
                <div className={`battlefield2-t2`}>
                    {["-s1","-s2","-s3","-s4","-s5","-s6"].map(id => {return (
                        <CardSlot 
                        id={`${this.props.id}-t2${id}`} 
                        canMoveHere={canMoveHere2} 
                        canAttackHere={canAttackHere2}
                        canCastHere={canCastHere2}
                        cardSlotProps={this.props.cardSlotProps} 
                        movingCard={this.props.movingCard}
                        cards={this.props.cards}
                        selectedCard={this.props.selectedCard}
                        key={`${this.props.id}-t2${id}`}
                        />
                    )})}
                        
                </div>
            </div>
        )
    }
}

export default Battlefield2;