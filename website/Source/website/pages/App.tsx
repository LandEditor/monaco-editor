import * as React from "react";

import { DocsPage } from "./DocsPage";
import { Home } from "./home/Home";
import { MonarchPage } from "./MonarchPage";
import { PlaygroundPage } from "./playground/PlaygroundPage";
import { docs, home, monarch, playground } from "./routes";

export class App extends React.Component {
	render() {
		if (home.isActive) {
			return <Home />;
		} else if (playground.isActive) {
			return <PlaygroundPage />;
		} else if (docs.isActive) {
			return <DocsPage />;
		} else if (monarch.isActive) {
			return <MonarchPage />;
		}
		return <>Page does not exist</>;
	}
}
