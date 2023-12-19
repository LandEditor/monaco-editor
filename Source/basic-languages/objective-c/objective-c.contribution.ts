/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { registerLanguage } from "../_.contribution";

declare let AMD: any;
declare let require: any;

registerLanguage({
	id: "objective-c",
	extensions: [".m"],
	aliases: ["Objective-C"],
	loader: () => {
		if (AMD) {
			return new Promise((resolve, reject) => {
				require([
					"vs/basic-languages/objective-c/objective-c",
				], resolve, reject);
			});
		} else {
			return import("./objective-c");
		}
	},
});
