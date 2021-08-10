import React from "react";
//import PropTypes from "prop-types";
import ResourceBar from "./ResourceBar";
import CityShop from "./CityShop";
import CityCenterShop from "./CityCenterShop";
import EndTurn from "./EndTurn";

class Hud extends React.Component {

    render() {
        let shop = <CityShop game={this.props.game} cards={this.props.cards} buyingCard={this.props.buyingCard}/>
        if (this.props.shopType==="cityCenter") {
            shop = <CityCenterShop game={this.props.game} cards={this.props.cards} closeCityShop={this.props.closeCityShop} upLevel={this.props.upLevel} buyBuilding={this.props.buyBuilding} />
        }
        return (
            <>
            <ResourceBar game={this.props.game} />
            {shop}
            <EndTurn endTurn={this.props.endTurn} game={this.props.game} />
            </>
        )
    }
}

export default Hud;