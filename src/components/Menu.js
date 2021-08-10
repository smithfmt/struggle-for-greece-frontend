import React from "react";
//import PropTypes from "prop-types";

class Menu extends React.Component {

    state = {
        open: "open"
    }

    componentDidMount() {
        document.addEventListener('keyup', this.openMenu);
    }
    componentWillUnmount() {
        document.removeEventListener('keyup', this.openMenu);
    }

    open = "";

    openMenu = (e) => {
        if (e.key !== "Escape") return;
        const open = {...this.state.open}
        if (!open) return;
        if (!this.open) {
            this.open = "open"
        } else {
            this.open = "";
        }
        this.setState({ ...open })
    }

    render() {
        
        return (
            <div className={`menu-modal-outer ${this.open}`}>
                <div className="menu-modal-inner">
                    <button className="ingame-menu-button" onClick={() => this.props.goToPage("/")}>Main Menu →</button>
                    <button className="ingame-menu-button" onClick={() => this.props.openCardList()}>View Cards →</button>
                    <button className="ingame-menu-button" onClick={() => this.props.openPlayerInfo()}>Player Stats →</button>
                </div>
            </div>
        )
    }
}

export default Menu;