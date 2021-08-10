import React from "react";
import base from "../base";
import LobbyCard from "./LobbyCard";
import GameCard from "./GameCard";
//import PropTypes from "prop-types";

class Join extends React.Component {

    state = {
        games: []
    }

    componentDidMount() {
        this.fetchGames();
    }

    fetchGames = async () => {
        const games = await base.fetch(`open-games`, { context: this });
        this.setState({ games })
    };

    render() {
        const user = JSON.parse(localStorage.getItem("SFGUser"));
        const games = this.state.games
        return (
            <>
            <h2 className="page-title">Join</h2>
            <div className="join-page">
                <div className="join-lobby-list">
                    <h2>Open Lobbies:</h2> 
                    {Object.keys(this.props.lobbies)
                    .filter(lobby => {return !this.props.lobbies[lobby].started})
                    .map(lobby => {return <LobbyCard lobby={this.props.lobbies[lobby]} joinLobby={this.props.joinLobby} key={lobby} />})
                    }
                </div>
                <div className="join-game-list">
                    <h2>Your Games:</h2> 
                    {Object.keys(games)
                    .filter(game => {return Object.keys(games[game].players).includes(user.name)})
                    .map(game => {return <GameCard game={game} joinGameFromList={this.props.joinGameFromList} />})
                    }
                </div>
            </div>
            <button className="mm-button" onClick={() => this.props.goToPage("/")}>Return to Main Menu →</button>
            </>
            
        );
    }
}

export default Join;