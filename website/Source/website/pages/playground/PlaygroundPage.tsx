import { observer } from "mobx-react";
import * as React from "react";

import { withLoader } from "../../components/Loader";
import { hotComponent } from "../../utils/hotComponent";
import { getNpmVersions } from "./getNpmVersionsSync";
import { PlaygroundModel } from "./PlaygroundModel";
import { PlaygroundPageContent } from "./PlaygroundPageContent";

@withLoader(async () => {
	const search = new URLSearchParams(window.location.search);
	if (
		search.get("source") === "latest-dev" ||
		search.get("compareWith") === "latest-dev"
	) {
		// So that the source class can resolve that value
		await getNpmVersions();
	}
})
@hotComponent(module)
@observer
export class PlaygroundPage extends React.Component {
	private readonly model = new PlaygroundModel();

	componentWillUnmount() {
		this.model.dispose();
	}

	render() {
		return <PlaygroundPageContent model={this.model} />;
	}
}
