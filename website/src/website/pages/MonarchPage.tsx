import * as React from "react";
import { Page } from "../components/Page";

export class MonarchPage extends React.Component<{}, {}> {
	render() {
		return (
			<Page>
				<iframe
					frameBorder={0}
					class="full-iframe"
					src="./monarch-static.html"
				/>
			</Page>
		);
	}
}
