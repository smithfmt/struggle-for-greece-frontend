import React from "react";
import CardSlot from "./CardSlot";
//import PropTypes from "prop-types";

class CityBattlefield extends React.Component {

    render() {
        let canMoveHere="";
        if (this.props.canMoveTo && this.props.canMoveTo.includes(`${this.props.id}`)) {
            canMoveHere="can-move-here";
        };
        let canAttackHere="";
        if (this.props.canAttack && this.props.canAttack.includes(this.props.id)) {
            canAttackHere="can-attack-here";
        };
        let canCastHere="";
        if (this.props.canCast && this.props.canCast.includes(`${this.props.id}`)) {
            canCastHere="can-cast-here";
        };
        return (
            <div className={`city-battlefield-container-${this.props.pos}`}>
                <div className={`city-battlefield-${this.props.pos[this.props.pos.length-1]}`} id={this.props.id} >
                    {["-s1","-s2","-s3","-s4","-s5","-s6"].map(id => {return (
                        <CardSlot 
                        id={`${this.props.id}${id}`} 
                        canMoveHere={canMoveHere} 
                        canAttackHere={canAttackHere}
                        canCastHere={canCastHere}
                        cardSlotProps={this.props.cardSlotProps} 
                        movingCard={this.props.movingCard}
                        cards={this.props.cards}
                        selectedCard={this.props.selectedCard}
                        key={`${this.props.id}${id}`}
                        />
                    )})}
                </div>
            </div>
        )
    }
}

export default CityBattlefield;