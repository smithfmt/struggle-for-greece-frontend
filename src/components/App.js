import React from "react";
//import PropTypes from "prop-types";
import firebase from "firebase";
import base, { firebaseApp } from "../base";
import Join from "./Join";
import Host from "./Host";
import Lobby from "./Lobby";
import Play from "./Play";
import Login from "./Login";
import MainMenu from "./MainMenu";

class App extends React.Component {
    state = {
        lobbies: {},
    };

    componentDidMount() {
        this.ref = base.syncState(`open-lobbies`, {
            context: this,
            state: "lobbies"
        });
        this.removeOldLobbies();
    };

    componentDidUpdate() {
        this.location = this.props.match.path;
    };

    componentWillUnmount() {
        base.removeBinding(this.ref);
    };

    authenticate = async provider => {
        const authProvider = new firebase.auth[`${provider}AuthProvider`]();
        return firebaseApp.auth().signInWithPopup(authProvider);
    };
    
    location = this.props.match.path;

    hostLobby = (lobby) => {
        const lobbies = { ...this.state.lobbies }
        lobbies[lobby.slug] = lobby;
        this.location = "/lobby/:lobbyname"
        this.props.history.push(`/lobby/${lobby.slug}`);
        this.setState({ lobbies });
    };

    joinLobby = (lobby) => {
        this.location = "/lobby/:lobbyname"
        this.props.history.push(`/lobby/${lobby.slug}`);
    };

    removeOldLobbies = async () => {
        const now = Date.now();
        const lobbies = {...this.state.lobbies};
        if (lobbies) {Object.entries(lobbies).forEach(lobby => {
                if (!lobby[1].started && ((lobby[1].created + 600000 < now && !lobby[1].playerCount)||lobby[1].created + 7200000 < now)) {
                    const lobbyname = lobby[0]
                    lobbies[lobbyname] = null;
                }
            });
            this.setState({ lobbies });
        };
    };

    goToPage = (page) => {
        this.location = page;
        this.props.history.push(page);
    };

    joinGame = async (lobby1, slot) => {
        const lobby = {...lobby1}
        if (!lobby.players) {lobby.players={}}
        // If the slot is filled, return //
        if (lobby.slots[slot].filled) {return}
        // Determine the player //
        let player = JSON.parse(localStorage.getItem("SFGUser"));
        if (!player) {await this.login({fb: true})};
        player = JSON.parse(localStorage.getItem("SFGUser"));
        if(!player) {
            alert("You need to Signup first!");
            this.goToPage("/login");
        };

        // Update player list in lobby // 
        lobby.players[player.name] = {
            name: player.name,
            slot,
            ready: false
        };

        lobby.slots = {
            p1: {filled: false, ready: false},
            p2: {filled: false, ready: false},
            p3: {filled: false, ready: false},
            p4: {filled: false, ready: false},
        }
        const playersArr = Object.entries(lobby.players);
        lobby.playerCount = playersArr.length;
        playersArr.forEach(playerArr => {
            if (playerArr[1].slot) {
                lobby.slots[playerArr[1].slot].filled = playerArr[0];
                lobby.slots[playerArr[1].slot].ready = playerArr[1].ready;
            }
        });

        // Update state //
        this.updateLobbyState(lobby)
    };
    
    updateLobbyState = (lobby) => {
        const lobbies = {...this.state.lobbies};
        lobbies[lobby.slug] = lobby;
        this.setState({ lobbies });
    };

    simulateJoin = (slug) => {
        const lobby = { ...this.state.lobbies[slug] };
        const slots = lobby.slots;
        let num = 1;
        const slotsKeys = Object.keys(lobby.slots);
        slotsKeys.forEach(slot => {
            if (!slots[slot].filled) {
                slots[slot].filled = `player ${num}`;
                lobby.players[`player ${num}`] = `p${num}`;
                num++;
                slots[slot].ready = true;
                const slotsReady = [lobby.slots.p1.ready, lobby.slots.p2.ready, lobby.slots.p3.ready, lobby.slots.p4.ready];
                lobby.readyCount = slotsReady.reduce((acc, cur) => cur? acc+1 : acc, 0);
            }
        })

        const lobbies = {...this.state.lobbies};
        lobbies[lobby.slug] = {...lobby};
        this.setState({ lobbies });
        if (lobby.readyCount===4) {
            this.startGame(lobby);
        }
    };

    ready = (lobby1, button) => {
        const lobby = {...lobby1};
        const player = lobby.slots[button.id].filled;
        const clicker = JSON.parse(localStorage.getItem("SFGUser"));
        if (player !== clicker.name) {return;}
        if (lobby.players[player].ready) {
            lobby.players[player].ready = false;
            lobby.slots[button.id].ready = false;
        } else {
            lobby.players[player].ready = true;
            lobby.slots[button.id].ready = true;
        }
        const slotsReady = [lobby.slots.p1.ready, lobby.slots.p2.ready, lobby.slots.p3.ready, lobby.slots.p4.ready];
        lobby.readyCount = slotsReady.reduce((acc, cur) => cur? acc+1 : acc, 0);
        this.updateLobbyState(lobby);
        if (lobby.readyCount===4) {this.startGame(lobby)};
    };

    startGame = (lobby) => {
        const lobbies = { ...this.state.lobbies };
        lobbies[lobby.slug].started = true;
        this.setState({ lobbies });
        this.location = "/play/:lobbyname";
        this.props.history.push(`/play/${lobby.slug}`);
    };

    signup = async (user) => {
        let uid;
        if (user.fb) {
            const authData = await this.authenticate("Facebook");
            uid = authData.user.uid
        } else {
            uid = `${Date.now()}player`;
        }
        user.uid = uid;
        user.wins = 0;
        user.losses = 0;
        const userFB = await base.fetch(`users/${user.uid}`, { context: this });
        if (!userFB.uid) {
            await base.post(`users/${user.uid}`, { data: user });
        };
        this.login(user);
    };

    login = async (user) => {
        const users = await base.fetch(`users`, { context: this });
        const userArr = Object.values(users);
        let thisUser;
        if (user.fb) {
            const authData = await this.authenticate("Facebook");
            user.uid = authData.user.uid
            thisUser = JSON.stringify(userArr.filter(u => u.uid === user.uid)[0]);
        } else {
            thisUser = JSON.stringify(userArr.filter(u => u.name === user.name && u.password === user.password)[0]);
        }
        if (!thisUser) {
            alert("You need to sign-in first!");
        } else {
            localStorage.setItem("SFGUser", thisUser);
            this.goToPage("/")
        }
    };

    openGame = (lobby) => {
        const lobbies = {...this.state.lobbies};
        lobbies[lobby.slug] = null;
        this.setState({ lobbies });
    }

    joinGameFromList = (game) => {
        this.location = "/play/:lobbyname";
        this.props.history.push(`/play/${game}`);
    }

    render() {
        const page = this.location;
        if (page === "/") {
            return (
                <MainMenu goToPage={this.goToPage} />
            )
        }
        if (page === "/host") {
            return (
                <Host hostLobby={this.hostLobby} goToPage={this.goToPage} />
            )
        } else if (page === "/join") {
            return (
                <Join 
                lobbies={this.state.lobbies} 
                joinLobby={this.joinLobby} 
                goToPage={this.goToPage} 
                joinGameFromList={this.joinGameFromList}
                />
            )
        } else if (page === "/login") {
            return (
                <Login authenticate={this.authenticate} goToPage={this.goToPage} signup={this.signup} login={this.login} />
            )
        } else if (page === ("/lobby/:lobbyname")) {
            return (
                <Lobby 
                    params={this.props.match.params} 
                    goToPage={this.goToPage} 
                    startGame={this.startGame} 
                    lobbies={this.state.lobbies} 
                    ready={this.ready}
                    simulateJoin={this.simulateJoin}
                    joinGame={this.joinGame}
                    updateLobbyState={this.updateLobbyState}
                />
            )
        } else if (page === ("/play/:lobbyname")) {
            return (
                <Play 
                    params={this.props.match.params}
                    openGame={this.openGame}
                    goToPage={this.goToPage}
                />
            )
        } else {
            return (
            <>
            <h2>404 Page Not Found</h2>
            <button onClick={() => this.goToPage("/")}>Return to Main Menu</button>
            </>
            );
        }
    }
}

export default App;