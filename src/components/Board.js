import React from "react";
import City from "./City";
import Battlefields from "./Battlefields";
import Delphi from "./Delphi";
import Menu from "./Menu";
import Card from "./Card";
import BoardMap from "../images/BoardMap.jpg";
import BackgroundTrees from "../images/BackgroundTrees.jpg";
//import PropTypes from "prop-types";

class Board extends React.Component {

    render() {
        let movingCard;
        if (this.props.movingCard.card) {
            movingCard = <Card card={this.props.movingCard.card} moving={"moving"} team={this.props.movingCard.card.type} />
        }
        return (
            <>
            <Menu 
            goToPage={this.props.goToPage}
            openCardList={this.props.openCardList}
            openPlayerInfo={this.props.openPlayerInfo}
            />
            <div className="board-map" onMouseMove={this.props.moveMovingCard}>
                <img src={BackgroundTrees} alt="BackgroundTrees" className="background-trees" />
                <img src={BoardMap} alt="BoardMap" className="board-map-image" />
                <div className="moving-card">
                    {movingCard}
                </div>
                <City 
                team="athens-city"
                city="Athens"
                game={this.props.game}
                updateTeam={this.props.updateTeam}
                id="athensCity-t1"
                placeCitizen={this.props.placeCitizen}
                cardSlotProps={this.props.cardSlotProps}
                openCityShop={this.props.openCityShop}
                movingCard={this.props.movingCard}
                cards={this.props.cards}
                selectedCard={this.props.selectedCard}
                canMoveTo={this.props.canMoveTo}
                canAttack={this.props.canAttack}
                canCast={this.props.canCast}
                calculateIncome={this.props.calculateIncome}
                />
                <City 
                team="troy-city"
                city="Troy"
                game={this.props.game}
                updateTeam={this.props.updateTeam}
                id="troyCity-t1"
                placeCitizen={this.props.placeCitizen}
                cardSlotProps={this.props.cardSlotProps}
                openCityShop={this.props.openCityShop}
                movingCard={this.props.movingCard}
                cards={this.props.cards}
                selectedCard={this.props.selectedCard}
                canMoveTo={this.props.canMoveTo}
                canAttack={this.props.canAttack}
                canCast={this.props.canCast}
                calculateIncome={this.props.calculateIncome}
                />
                <City 
                team="sparta-city"
                city="Sparta"
                game={this.props.game}
                updateTeam={this.props.updateTeam}
                id="spartaCity-t1"
                placeCitizen={this.props.placeCitizen}
                cardSlotProps={this.props.cardSlotProps}
                openCityShop={this.props.openCityShop}
                movingCard={this.props.movingCard}
                cards={this.props.cards}
                selectedCard={this.props.selectedCard}
                canMoveTo={this.props.canMoveTo}
                canAttack={this.props.canAttack}
                canCast={this.props.canCast}
                calculateIncome={this.props.calculateIncome}
                />
                <City 
                team="thebes-city"
                city="Thebes"
                game={this.props.game}
                updateTeam={this.props.updateTeam}
                id="thebesCity-t1"
                cardSlotProps={this.props.cardSlotProps}
                placeCitizen={this.props.placeCitizen}
                openCityShop={this.props.openCityShop}
                movingCard={this.props.movingCard}
                cards={this.props.cards}
                selectedCard={this.props.selectedCard}
                canMoveTo={this.props.canMoveTo}
                canAttack={this.props.canAttack}
                canCast={this.props.canCast}
                calculateIncome={this.props.calculateIncome}
                />
                <Battlefields 
                cardSlotProps={this.props.cardSlotProps}
                movingCard={this.props.movingCard}
                cards={this.props.cards}
                selectedCard={this.props.selectedCard}
                canMoveTo={this.props.canMoveTo}
                canAttack={this.props.canAttack}
                canCast={this.props.canCast}
                />
                <Delphi 
                cardSlotProps={this.props.cardSlotProps}
                movingCard={this.props.movingCard}
                cards={this.props.cards}
                selectedCard={this.props.selectedCard}
                canMoveTo={this.props.canMoveTo}
                canAttack={this.props.canAttack}
                canCast={this.props.canCast}
                delphiHeroCards={this.props.delphiHeroCards}
                openBuyModal={this.props.openBuyModal}
                game={this.props.game}
                buyingCard={this.props.buyingCard}
                heroForHire={this.props.heroForHire}
                consultOracle={this.props.consultOracle}
                />
            </div>
            </>
        )
    }
}

export default Board;