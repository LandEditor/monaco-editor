/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import fs from "fs";
import path from "path";
import glob from "glob";

import { REPO_ROOT } from "../utils";

const files = glob.sync("**/package-lock.json", {
	cwd: REPO_ROOT,
	ignore: ["**/node_modules/**", "**/out/**"],
});

for (const file of files) {
	const filePath = path.join(REPO_ROOT, file);

	console.log(`Deleting ${file}...`);

	fs.unlinkSync(filePath);
}
