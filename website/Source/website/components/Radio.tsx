import { observer } from "mobx-react";
import * as React from "react";
import { IReference } from "../utils/ref";
import { Form } from "./bootstrap";

@observer
export class Radio<T> extends React.Component<{
	value: IReference<T>;
	current: T;
	id?: string;
}> {
	render() {
		const { value, current } = this.props;
		return (
			<Form.Check
				checked={value.get() === current}
				onChange={() => value.set(current)}
				type="radio"
				id={this.props.id}
			/>
		);
	}
}
