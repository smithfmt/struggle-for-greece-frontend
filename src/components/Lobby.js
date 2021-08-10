import React from "react";
import PlayerCard from "./PlayerCard";
//import PropTypes from "prop-types";

class Lobby extends React.Component {
    componentDidUpdate() {
        const lobby = this.props.lobbies[this.props.params.lobbyname];
        if (!lobby) {
            return this.props.goToPage("/")
        };
        if (lobby.started) {
            this.props.startGame(lobby);
        }
    }
    render() {
        const lobby = this.props.lobbies[this.props.params.lobbyname];
        let lobbyname = "";
        if (lobby) {lobbyname = lobby.name};
        const user = JSON.parse(localStorage.getItem("SFGUser"));
        let simbut;
        if (user && (user.uid==="CLJxLSE29JSvVUPjYB6y2aGOqVn1" || user.name === "Geoff")) {simbut = <button className="simbut" onClick={() => this.props.simulateJoin(lobby.slug)}>Simulate Players Joining</button>}
        return (
            <>
            <div className="lobby-list">
                <h2 style={{color: "white", fontSize: "2vw"}}>{lobbyname}</h2>
                <PlayerCard team="Athens" join={(e) => this.props.joinGame(lobby, e.currentTarget.id)} id="p1" lobby={lobby} ready={(e) => this.props.ready(lobby, e.currentTarget)} />
                <PlayerCard team="Sparta" join={(e) => this.props.joinGame(lobby, e.currentTarget.id)} id="p2" lobby={lobby} ready={(e) => this.props.ready(lobby, e.currentTarget)} />
                <PlayerCard team="Thebes" join={(e) => this.props.joinGame(lobby, e.currentTarget.id)} id="p3" lobby={lobby} ready={(e) => this.props.ready(lobby, e.currentTarget)} />
                <PlayerCard team="Troy" join={(e) => this.props.joinGame(lobby, e.currentTarget.id)} id="p4" lobby={lobby} ready={(e) => this.props.ready(lobby, e.currentTarget)} />
                {simbut}
            </div>
            <button className="mm-button" onClick={() => this.props.goToPage("/")}>Return to Main Menu →</button>
            </>
        );
    }
}

export default Lobby;