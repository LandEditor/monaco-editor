import * as ReactDOM from "react-dom";
import "./bootstrap.scss";
import { App } from "./pages/App";
import "./style.scss";

const elem = document.createElement("div");
elem.className = "root";
document.body.append(elem);
ReactDOM.render(<App />, elem);
