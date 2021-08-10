import React from "react";
import { render } from "react-dom";
import Router from "./components/Router";
import "./css/style.css";
import "./css/board.css";
import "./css/card.css";
import "./css/hud.css";
import "./css/shop.css";

render(<Router />, document.querySelector("#main"));
