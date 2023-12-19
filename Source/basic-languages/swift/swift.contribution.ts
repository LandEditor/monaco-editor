/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { registerLanguage } from "../_.contribution";

declare let AMD: any;
declare let require: any;

registerLanguage({
	id: "swift",
	aliases: ["Swift", "swift"],
	extensions: [".swift"],
	mimetypes: ["text/swift"],
	loader: () => {
		if (AMD) {
			return new Promise((resolve, reject) => {
				require(["vs/basic-languages/swift/swift"], resolve, reject);
			});
		} else {
			return import("./swift");
		}
	},
});
