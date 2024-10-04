/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { initialize } from "monaco-editor-core/esm/vs/editor/editor.worker";

import { worker } from "../../fillers/monaco-editor-core";
import { libFileMap } from "./lib/lib";
import * as ts from "./lib/typescriptServices";
import { create, ICreateData, TypeScriptWorker } from "./tsWorker";

self.onmessage = () => {
	// ignore the first message
	initialize((ctx: worker.IWorkerContext, createData: ICreateData) => {
		return create(ctx, createData);
	});
};

export { TypeScriptWorker, create, initialize, libFileMap, ts };
