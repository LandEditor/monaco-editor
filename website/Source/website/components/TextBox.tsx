import { observer } from "mobx-react";
import * as React from "react";
import { IReference } from "../utils/ref";
import { Form } from "./bootstrap";

@observer
export class TextBox extends React.Component<{
	value: IReference<string>;
	style?: React.CSSProperties;
}> {
	render() {
		const { value } = this.props;
		return (
			<Form.Control
				value={value.get()}
				onChange={(v) => value.set(v.currentTarget.value)}
				style={this.props.style}
			/>
		);
	}
}
