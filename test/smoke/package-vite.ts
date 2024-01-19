/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as path from "path";
import * as vite from "vite";

async function main() {
	await vite.build({
		root: path.resolve(__dirname, "./vite/"),
		base: "/test/smoke/vite/dist/",
		build: {
			minify: false,
		},
	});
}

main();
