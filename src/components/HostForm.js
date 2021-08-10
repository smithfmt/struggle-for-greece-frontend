import React from "react";
//import PropTypes from "prop-types";
import { getFunName, slugify } from "../helpers";

class HostForm extends React.Component {
    nameRef = React.createRef();
    cityRef = React.createRef();
    gamespeedRef = React.createRef();

    createLobby = (e) => {
        e.preventDefault();
        const now = Date.now();
        const lobby = {
            name: this.nameRef.current.value,
            slug: slugify(this.nameRef.current.value),
            city: this.cityRef.current.value,
            gamespeed: this.gamespeedRef.current.value,
            created: now,
            playerCount: 0,
            started: false,
            slots: {
                p1: {
                    filled: false,
                    ready: false
                },
                p2: {
                    filled: false,
                    ready: false
                },
                p3: {
                    filled: false,
                    ready: false
                },
                p4: {
                    filled: false,
                    ready: false
                },
            }
        }
        this.props.hostLobby(lobby);
    }
    
    render() {
        return (
            <form className="host-form" onSubmit={this.createLobby}>
                <label className="host-form-label" >Lobby Name: </label>
                <input 
                    className="host-form-item"
                    id="name1"
                    name="name" 
                    ref={this.nameRef} 
                    type="text" 
                    required 
                    placeholder="Name" 
                    defaultValue={getFunName()}
                />
                <label className="host-form-label" >City Asignment: </label>
                <select className="host-form-item" name="city-assign" id="city" required ref={this.cityRef}>
                    <option value="random">Random</option>
                    <option value="choice">Choose</option>
                </select>
                <label className="host-form-label" >Gamespeed: </label>
                <select className="host-form-item" name="gamespeed" required ref={this.gamespeedRef}>
                    <option value={1}>Normal</option>
                    <option value={0.5}>Slow (x1/2)</option>
                    <option value={2}>Quick (x2)</option>
                    <option value={4}>Rapid (x4)</option>
                </select>
                <button className="host-button" type="submit">Host Game</button>
            </form>
        );
    }
}

export default HostForm;