import React from "react";
import CardSlot from "./CardSlot";
import CitizenIconEmpty from "../images/Icons/CitizenIconEmpty.png";
import CitizenIconFilled from "../images/Icons/CitizenIconFilled.png";
import Farm from "../images/Buildings/Farm.png";
import Mine from "../images/Buildings/Mine.png";
//import PropTypes from "prop-types";

class City extends React.Component {

    asignCitizen = (job, t, speed) => {
        const user = JSON.parse(localStorage.getItem("SFGUser"));
        if (user.name !== this.props.game.teams[this.props.team.split("-")[0]].player) return;
        const team = {...t};
        const citizens = team.citizens;
        if (this.props.movingCard.canPlace && this.props.movingCard.canPlace.city===this.props.team && this.props.movingCard.canPlace.citizen==="Citizen") {
            if (citizens.number<team.level+1) {citizens.number++}
        };
        if (citizens.mine+citizens.farm<citizens.number) {
            citizens[job]++;
            this.props.placeCitizen();
        } else if (job==="farm") {
            if (citizens.mine) {
                citizens.farm++;
                citizens.mine--;
            }
        } else if (job==="mine") {
            if (citizens.farm) {
                citizens.mine++;
                citizens.farm--;
            }
        }
        team.foodIncome = citizens.farm*speed;
        team.moneyIncome = citizens.mine*speed;
        this.props.updateTeam(team, this.props.team.split("-")[0]);
    }

    render() {
        if (!this.props.game.teams || !this.props.game.teams.troy.city) return null;
        const citizens = this.props.game.teams[this.props.team.split("-")[0]].citizens;
        const team = this.props.game.teams[this.props.team.split("-")[0]];
        const farmIconSrc = citizens.farm ? CitizenIconFilled : CitizenIconEmpty;
        const mineIconSrc = citizens.mine ? CitizenIconFilled : CitizenIconEmpty;
        let canPlace="";
        let citizenPlace="";
        if (this.props.movingCard.canPlace && this.props.movingCard.canPlace.city===this.props.team) {
            canPlace="can-place";
            if (this.props.movingCard.canPlace.citizen==="Citizen") {
                if (citizens.number<team.level+1) {
                    citizenPlace = "citizen-place";
                };
            };
        };
        let canMoveHere="";
        if (this.props.canMoveTo && this.props.canMoveTo.includes(this.props.id)) {
            canMoveHere="can-move-here";
        };
        let canAttackHere="";
        if (this.props.canAttack && this.props.canAttack.includes(this.props.id)) {
            canAttackHere="can-attack-here";
        };

        return (
            <div className={`${this.props.team}-container`}>
                <button className={`${this.props.team}-farm farm ${citizenPlace}`} onClick={() => this.asignCitizen("farm", team, this.props.game.gamespeed)}>
                    <div className="icon citizen-icon">
                        {citizens.farm}
                        <img src={farmIconSrc} alt="Citizen" />
                    </div>
                    <img src={Farm} alt="Farm" />
                </button>
                <button className={`${this.props.team}-mine mine ${citizenPlace}`} onClick={() => this.asignCitizen("mine", team, this.props.game.gamespeed)}>
                    <div className="icon citizen-icon">
                        {citizens.mine}
                        <img src={mineIconSrc} alt="Citizen" />
                    </div>
                    <img src={Mine} alt="Mine" />
                </button>
                <div className={this.props.team}>
                    <div className={`${this.props.team}-halfarmy-l halfarmy`}>
                        <CardSlot 
                        canPlace={canPlace} 
                        id={`${this.props.id}-s1`} 
                        cardSlotProps={this.props.cardSlotProps}
                        canMoveHere={canMoveHere}
                        canAttackHere={canAttackHere}
                        movingCard={this.props.movingCard}
                        cards={this.props.cards}
                        selectedCard={this.props.selectedCard}
                        />
                        <CardSlot 
                        canPlace={canPlace} 
                        id={`${this.props.id}-s2`} 
                        cardSlotProps={this.props.cardSlotProps}
                        canMoveHere={canMoveHere}
                        canAttackHere={canAttackHere}
                        movingCard={this.props.movingCard}
                        cards={this.props.cards}
                        selectedCard={this.props.selectedCard}
                        />
                        <CardSlot 
                        canPlace={canPlace} 
                        id={`${this.props.id}-s3`} 
                        cardSlotProps={this.props.cardSlotProps}
                        canMoveHere={canMoveHere}
                        canAttackHere={canAttackHere}
                        movingCard={this.props.movingCard}
                        cards={this.props.cards}
                        selectedCard={this.props.selectedCard}
                        />
                    </div>
                    <div className={`${this.props.team}-halfarmy-r halfarmy`}>
                        <CardSlot 
                        canPlace={canPlace} 
                        id={`${this.props.id}-s4`} 
                        cardSlotProps={this.props.cardSlotProps}
                        canMoveHere={canMoveHere}
                        canAttackHere={canAttackHere}
                        movingCard={this.props.movingCard}
                        cards={this.props.cards}
                        selectedCard={this.props.selectedCard}
                        />
                        <CardSlot 
                        canPlace={canPlace} 
                        id={`${this.props.id}-s5`} 
                        cardSlotProps={this.props.cardSlotProps}
                        canMoveHere={canMoveHere}
                        canAttackHere={canAttackHere}
                        movingCard={this.props.movingCard}
                        cards={this.props.cards}
                        selectedCard={this.props.selectedCard}
                        />
                        <CardSlot 
                        canPlace={canPlace} 
                        id={`${this.props.id}-s6`} 
                        cardSlotProps={this.props.cardSlotProps}
                        canMoveHere={canMoveHere}
                        canAttackHere={canAttackHere}
                        movingCard={this.props.movingCard}
                        cards={this.props.cards}
                        selectedCard={this.props.selectedCard}
                        />  
                    </div>
                    <div className="city-name">
                        <CardSlot 
                        id={`${this.props.id.split("-")[0]}`} 
                        type={"cityCard"}
                        cardSlotProps={this.props.cardSlotProps}
                        game={this.props.game}
                        openCityShop={this.props.openCityShop}
                        canAttackHere={canAttackHere}
                        cards={this.props.cards}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default City;