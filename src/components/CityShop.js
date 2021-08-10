import React from "react";
//import PropTypes from "prop-types";
import ShopCard from "./ShopCard";
import PurchaseCard from "./PurchaseCard";

class CityShop extends React.Component {

    state = {
        card: {},
        buyOpen: "",
        shopOpen: ""
    }

    openShop = () => {
        const shopOpen = "open";
        this.setState({ shopOpen });
    };

    closeShop = (e) => {
        if (e.currentTarget===e.target) {
            const shopOpen = "";
            this.setState({ shopOpen });
        };
    };

    openBuyModal = (card) => {
        const buyOpen = "open";
        this.setState({ card, buyOpen });
    };
    closeBuyModal = (e) => {
        if(e.target===e.currentTarget){
            const buyOpen = "";
            this.setState({ buyOpen });
        };
    };

    buyCard = (card) => {
        const user = JSON.parse(localStorage.getItem("SFGUser"));
        const game = this.props.game;
        const team = Object.keys(game.teams).filter(team => {return game.teams[team].player === user.name})[0]
        if (team !== this.props.game.whoTurn) return;
        const buyOpen = "";
        const shopOpen = "";
        this.setState({ buyOpen, shopOpen });
        this.props.buyingCard(card);
    }

    render() {
        const game = this.props.game;
        if (!game.teams) return null;
        const user = JSON.parse(localStorage.getItem("SFGUser"));
        let team = Object.keys(game.teams).filter(team => game.teams[team].player===user.name)[0];
        return (
            <>
            <button className={`city-shop-button ${this.state.shopOpen}`} onClick={this.openShop}>
                <div className="cstext">$</div>
            </button>
            <PurchaseCard 
                card={this.state.card} 
                team={team}
                openBuyModal={this.openBuyModal}
                closeBuyModal={this.closeBuyModal}
                open={this.state.buyOpen}
                game={game}
                buyCard={this.buyCard}
            />
            <div onClick={this.closeShop} className={`city-shop-modal-outer ${team}-city-shop-out ${this.state.shopOpen}`}>
                <div className={`city-shop-modal-inner ${team}-city-shop-in`}>
                    <div className="shop-container">
                        <div>
                            <ShopCard card={this.props.cards[`${team}Citizen`]} team={team} openBuyModal={this.openBuyModal} />
                            <ShopCard card={this.props.cards[`${team}Soldier`]} team={team} openBuyModal={this.openBuyModal} />
                            <ShopCard card={this.props.cards[`${team}Archer`]} team={team} openBuyModal={this.openBuyModal} />
                            <ShopCard card={this.props.cards[`${team}Horseman`]} team={team} openBuyModal={this.openBuyModal} />
                            <ShopCard card={this.props.cards[`ramSiege`]} team={team} openBuyModal={this.openBuyModal} />  
                        </div>
                        <div>
                            <ShopCard card={this.props.cards[`${team}Hero1`]} team={team} openBuyModal={this.openBuyModal} bought={game.teams[team].bought} />
                            <ShopCard card={this.props.cards[`${team}Hero2`]} team={team} openBuyModal={this.openBuyModal} bought={game.teams[team].bought} />
                            <ShopCard card={this.props.cards[`${team}Hero3`]} team={team} openBuyModal={this.openBuyModal} bought={game.teams[team].bought} />
                            <ShopCard card={this.props.cards[`${team}Hero4`]} team={team} openBuyModal={this.openBuyModal} bought={game.teams[team].bought} />
                            <ShopCard card={this.props.cards[`${team}Hero5`]} team={team} openBuyModal={this.openBuyModal} bought={game.teams[team].bought} />  
                        </div>
                    </div>
                </div>
            </div>
            </>
        );
    };
};

export default CityShop;
