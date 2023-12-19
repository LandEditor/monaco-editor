/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { registerLanguage } from "../_.contribution";

declare let AMD: any;
declare let require: any;

registerLanguage({
	id: "lua",
	extensions: [".lua"],
	aliases: ["Lua", "lua"],
	loader: () => {
		if (AMD) {
			return new Promise((resolve, reject) => {
				require(["vs/basic-languages/lua/lua"], resolve, reject);
			});
		} else {
			return import("./lua");
		}
	},
});
