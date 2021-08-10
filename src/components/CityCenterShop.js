import React from "react";
//import PropTypes from "prop-types";
import CityLevelTree from "../images/Icons/CityLevelTree.png"
import FoodIcon from "../images/Icons/FoodIcon.png"
import CoinIcon from "../images/Icons/CoinIcon.png"
import CityLevelButton from "./CityLevelButton";
import CityBuildingShopItem from "./CityBuildingShopItem";

class CityCenterShop extends React.Component {
    
    state = {
        shopOpen: "open",
        levelDisplay: 8,
    };

    closeShop = (e) => {
        if (e.currentTarget===e.target) {
            const shopOpen = "";
            this.props.closeCityShop();
            this.setState({ shopOpen });
        };
    };

    levelCosts = {
        1: {food: 0, money: 0},
        2: {food: 2, money: 2},
        3: {food: 4, money: 4},
        4: {food: 8, money: 8},
        5: {food: 16, money: 16},
        6: {food: 20, money: 20},
        7: {food: 25, money: 25},
        8: {food: 32, money: 32},
        9: {food: 40, money: 40},
        10: {food: 50, money: 50},
    };

    updateLevelDisplay = (level) => {
        const levelDisplay = level;
        this.setState({ levelDisplay })
    };

    render() {
        const game = this.props.game;
        if (!game.teams) return null;
        const user = JSON.parse(localStorage.getItem("SFGUser"));
        let team = Object.keys(game.teams).filter(team => game.teams[team].player===user.name)[0];
        const cityLevel = game.teams[team].level;
        const playerEcon = {food: game.teams[team].food, money: game.teams[team].money}
        const tm = game.teams[team]
        return (
            <>
            <div onClick={this.closeShop} className={`city-shop-modal-outer ${team}-city-shop-out ${this.state.shopOpen}`}>
                <div className={`city-shop-modal-inner ${team}-city-shop-in`}>
                    <div className="city-level-tree">
                    <h2 style={{position: "absolute", top: "-10%"}}><u>City Level</u></h2>
                    <img style={{width: "100%"}} src={CityLevelTree} alt="CityLevelTree" />
                    <CityLevelButton style={{left: "42%", top: "-5%", width: "2.2vw"}} id={10} cityLevel={cityLevel} updateLevelDisplay={this.updateLevelDisplay} cost={this.levelCosts[10]} playerEcon={playerEcon} upLevel={this.props.upLevel} team={team} pericles={this.props.game.teams[team].pericles} />
                    <CityLevelButton style={{left: "55%", top: "6%"}} id={9} cityLevel={cityLevel} updateLevelDisplay={this.updateLevelDisplay} cost={this.levelCosts[9]} playerEcon={playerEcon} upLevel={this.props.upLevel} team={team} pericles={this.props.game.teams[team].pericles} />
                    <CityLevelButton style={{left: "0%", top: "15%"}} id={8} cityLevel={cityLevel} updateLevelDisplay={this.updateLevelDisplay} cost={this.levelCosts[8]} playerEcon={playerEcon} upLevel={this.props.upLevel} team={team} pericles={this.props.game.teams[team].pericles} />
                    <CityLevelButton style={{left: "47%", top: "27%"}} id={7} cityLevel={cityLevel} updateLevelDisplay={this.updateLevelDisplay} cost={this.levelCosts[7]} playerEcon={playerEcon} upLevel={this.props.upLevel} team={team} pericles={this.props.game.teams[team].pericles} />
                    <CityLevelButton style={{left: "0%", top: "30%"}} id={6} cityLevel={cityLevel} updateLevelDisplay={this.updateLevelDisplay} cost={this.levelCosts[6]} playerEcon={playerEcon} upLevel={this.props.upLevel} team={team} pericles={this.props.game.teams[team].pericles} />
                    <CityLevelButton style={{left: "70%", top: "40%"}} id={5} cityLevel={cityLevel} updateLevelDisplay={this.updateLevelDisplay} cost={this.levelCosts[5]} playerEcon={playerEcon} upLevel={this.props.upLevel} team={team} pericles={this.props.game.teams[team].pericles} />
                    <CityLevelButton style={{left: "12%", top: "52%"}} id={4} cityLevel={cityLevel} updateLevelDisplay={this.updateLevelDisplay} cost={this.levelCosts[4]} playerEcon={playerEcon} upLevel={this.props.upLevel} team={team} pericles={this.props.game.teams[team].pericles} />
                    <CityLevelButton style={{left: "85%", top: "60%"}} id={3} cityLevel={cityLevel} updateLevelDisplay={this.updateLevelDisplay} cost={this.levelCosts[3]} playerEcon={playerEcon} upLevel={this.props.upLevel} team={team} pericles={this.props.game.teams[team].pericles} />
                    <CityLevelButton style={{left: "32%", top: "63%"}} id={2} cityLevel={cityLevel} updateLevelDisplay={this.updateLevelDisplay} cost={this.levelCosts[2]} playerEcon={playerEcon} upLevel={this.props.upLevel} team={team} pericles={this.props.game.teams[team].pericles} />
                    <CityLevelButton style={{left: "90%", top: "83%"}} id={1} cityLevel={cityLevel} updateLevelDisplay={this.updateLevelDisplay} cost={this.levelCosts[1]} playerEcon={playerEcon} upLevel={this.props.upLevel} team={team} pericles={this.props.game.teams[team].pericles} /> 
                    <div className="city-level-price">
                        <div className="level-display">
                            {`Level ${this.state.levelDisplay}:`}
                        </div>
                        <div className="level-price-food">
                            {this.levelCosts[this.state.levelDisplay].food} <img src={FoodIcon} alt="FoodIcon" />
                        </div>
                        <div className={"level-price-money"}>
                            {this.levelCosts[this.state.levelDisplay].money} <img src={CoinIcon} alt="CoinIcon" />
                        </div>
                    </div>
                    </div>
                    <div className="city-building-shop">
                        <h2 style={{textAlign: "center"}}>
                            <u>City Buildings</u>
                        </h2>
                        <CityBuildingShopItem 
                            building={{name: "Walls", desc: "a 15 health buffer to your city which only takes 1 dmg from units", id: "walls"}} 
                            cost={
                                (15 - Object.values(tm.modifiers.discount.walls.int).filter(val => val!==null).reduce((acc, {value}) => value + acc, 0) - Object.values(tm.modifiers.discount.buildings.int).filter(val => val!==null).reduce((acc, {value}) => value + acc, 0))*(1-Object.values(tm.modifiers.discount.buildings.multiplier).filter(val => val!==null).reduce((acc, {value}) => value + acc, 0))
                            } 
                            playerEcon={playerEcon} 
                            buildings={game.teams[team].buildings} 
                            buyBuilding={this.props.buyBuilding} 
                            team={team}
                        />
                        <div className="divider" />
                        <CityBuildingShopItem 
                            building={{name: "Barracks", desc: "allows for the training of soldiers", id: "barracks"}} 
                            cost={
                                (5 - Object.values(tm.modifiers.discount.buildings.int).filter(val => val!==null).reduce((acc, {value}) => value + acc, 0))*(1-Object.values(tm.modifiers.discount.buildings.multiplier).filter(val => val!==null).reduce((acc, {value}) => value + acc, 0))
                            } 
                            playerEcon={playerEcon} 
                            buildings={game.teams[team].buildings} 
                            buyBuilding={this.props.buyBuilding} 
                            team={team}
                        />
                        <div className="divider" />
                        <CityBuildingShopItem 
                            building={{name: "Archery Range", desc: "allows for the training of archers", id: "archerRange"}} 
                            cost={
                                (8 - Object.values(tm.modifiers.discount.buildings.int).filter(val => val!==null).reduce((acc, {value}) => value + acc, 0))*(1-Object.values(tm.modifiers.discount.buildings.multiplier).filter(val => val!==null).reduce((acc, {value}) => value + acc, 0))
                            } 
                            playerEcon={playerEcon} 
                            buildings={game.teams[team].buildings} 
                            buyBuilding={this.props.buyBuilding} 
                            team={team}
                        />
                        <div className="divider" />
                        <CityBuildingShopItem 
                            building={{name: "Stables", desc: "allows for the training of horsemen", id: "stables"}} 
                            cost={
                                (12 - Object.values(tm.modifiers.discount.buildings.int).filter(val => val!==null).reduce((acc, {value}) => value + acc, 0))*(1-Object.values(tm.modifiers.discount.buildings.multiplier).filter(val => val!==null).reduce((acc, {value}) => value + acc, 0))
                            } 
                            playerEcon={playerEcon} 
                            buildings={game.teams[team].buildings} 
                            buyBuilding={this.props.buyBuilding} 
                            team={team}
                        />
                        <div className="divider" />
                        <CityBuildingShopItem 
                            building={{name: "Workshop", desc: "allows for the construction of seige engines and equipment", id: "workshop"}} 
                            cost={
                                (15 - Object.values(tm.modifiers.discount.buildings.int).filter(val => val!==null).reduce((acc, {value}) => value + acc, 0))*(1-Object.values(tm.modifiers.discount.buildings.multiplier).filter(val => val!==null).reduce((acc, {value}) => value + acc, 0))
                            } 
                            playerEcon={playerEcon} 
                            buildings={game.teams[team].buildings} 
                            buyBuilding={this.props.buyBuilding} 
                            team={team}
                        />
                    </div>
                </div>
            </div>
            </>
        );
    };
};

export default CityCenterShop;
