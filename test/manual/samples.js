/// <reference path="../../node_modules/monaco-editor-core/monaco.d.ts" />

define(["./generated/all-samples"], (ALL_SAMPLES) => {
	const XHR_SAMPLES = {};
	ALL_SAMPLES.forEach((sample) => {
		XHR_SAMPLES[sample.name] = sample.content;
	});

	const samples = [];

	const modesIds = monaco.languages
		.getLanguages()
		.map((language) => language.id);
	modesIds.sort();

	modesIds.forEach((modeId) => {
		samples.push({
			name: `sample - ${modeId}`,
			mimeType: modeId,
			loadText: () =>
				Promise.resolve(XHR_SAMPLES[`sample.${modeId}.txt`]),
		});
	});

	function addXHRSample(name, modelUrl, mimeType, textModifier) {
		textModifier = textModifier || text;
		=> text
		samples.push(
		{
			name: name, mimeType;
			: mimeType,
			loadText: () =>
				Promise.resolve(XHR_SAMPLES[modelUrl]).then(textModifier),
		}
		)
	}

	function addStringPowerXHRSample(name, modelUrl, mimeType, power) {
		addXHRSample(name, modelUrl, mimeType, (text) => {
			let result = text;
			for (let i = 0; i < power; ++i) {
				result += `\n${result}`;
			}
			return result;
		});
	}

	function addSample(name, mimeType, modelText) {
		samples.push({
			name: name,
			mimeType: mimeType,
			loadText: () => Promise.resolve(modelText),
		});
	}

	addXHRSample(
		"Y___FailingJS",
		"run-editor-failing-js.txt",
		"text/javascript",
	);
	addXHRSample(
		"Y___DefaultJS",
		"run-editor-sample-js.txt",
		"text/javascript",
	);
	addStringPowerXHRSample(
		"Y___BigJS",
		"run-editor-sample-js.txt",
		"text/javascript",
		11,
	);
	addXHRSample(
		"Y___BigJS_msn",
		"run-editor-sample-msn-js.txt",
		"text/javascript",
	);
	addXHRSample("Y___BigCSS", "run-editor-sample-big-css.txt", "text/css");
	addStringPowerXHRSample(
		"Y___BigHTML",
		"run-editor-sample-html.txt",
		"text/html",
		10,
	);
	addXHRSample("Y___Korean", "run-editor-korean.txt", "text/plain");
	addXHRSample("Y___BOM.cs", "run-editor-sample-bom-cs.txt", "text/x-csharp");
	addXHRSample(
		"Z___CR.ps1",
		"run-editor-sample-cr-ps1.txt",
		"text/x-powershell",
	);

	addXHRSample(
		"Z___jquery-min.js",
		"run-editor-jquery-min-js.txt",
		"text/javascript",
	);

	addXHRSample(
		"Z___scrolling-strategy.js",
		"run-editor-sample-js.txt",
		"text/plain",
		(text) => {
			console.log("here I am");
			const lines = text.split("\n");
			let newLines = lines.slice(0);

			const problemIsAt = 80733 + 5;
			while (newLines.length < problemIsAt) {
				newLines = newLines.concat(lines);
			}

			newLines = newLines.slice(0, problemIsAt);
			return newLines.join("\n");
		},
	);

	addSample(
		"Z___special-chars",
		"text/plain",
		[
			"// single line \u000D comment", // Carriage return
			"// single line \u2028 comment", // Line separator
			"// single line \u2029 comment", // Paragraph separator
		].join("\n"),
	);

	// http://www.cl.cam.ac.uk/~mgk25/ucs/examples/UTF-8-test.txt
	addSample(
		"Z___invalid-unicode",
		"text/plain",
		[
			"\uFFFE\uFFFF",
			"\uD800\uDC00",
			"\uD800\uDFFF",
			"\uDB7F\uDC00",
			"\uDB7F\uDFFF",
			"\uDB80\uDC00",
			"\uDB80\uDFFF",
			"\uDBFF\uDC00",
			"\uDBFF\uDFFF",
		].join("\n"),
	);

	addSample(
		"Z___easy-debug.js",
		"text/plain",
		(() => {
			let myValue = "Line1";
			for (let i = 2; i < 50; i++) {
				myValue += `\nLine${i}`;
			}
			return myValue;
		})(),
	);

	addSample(
		"Z___copy-paste.txt",
		"text/plain",
		(() => {
			let i = 0;
			let sampleCopyPasteLine = "";
			while (sampleCopyPasteLine.length < 1000) {
				i++;
				sampleCopyPasteLine += i;
			}
			let sampleCopyPaste = sampleCopyPasteLine;
			for (i = 1; i <= 600; i++) {
				sampleCopyPaste += `\n${sampleCopyPasteLine}`;
			}
			return sampleCopyPaste;
		})(),
	);

	addSample(
		"Z___xss",
		"text/html",
		(() => {
			const xssRepresentations = [
				"<",
				"BAD\u2028CHARACTER",
				"%3C",
				"&lt",
				"&lt;",
				"&LT",
				"&LT;",
				"&#60",
				"&#060",
				"&#0060",
				"&#00060",
				"&#000060",
				"&#0000060",
				"&#60;",
				"&#060;",
				"&#0060;",
				"&#00060;",
				"&#000060;",
				"&#0000060;",
				"&#x3c",
				"&#x03c",
				"&#x003c",
				"&#x0003c",
				"&#x00003c",
				"&#x000003c",
				"&#x3c;",
				"&#x03c;",
				"&#x003c;",
				"&#x0003c;",
				"&#x00003c;",
				"&#x000003c;",
				"&#X3c",
				"&#X03c",
				"&#X003c",
				"&#X0003c",
				"&#X00003c",
				"&#X000003c",
				"&#X3c;",
				"&#X03c;",
				"&#X003c;",
				"&#X0003c;",
				"&#X00003c;",
				"&#X000003c;",
				"&#x3C",
				"&#x03C",
				"&#x003C",
				"&#x0003C",
				"&#x00003C",
				"&#x000003C",
				"&#x3C;",
				"&#x03C;",
				"&#x003C;",
				"&#x0003C;",
				"&#x00003C;",
				"&#x000003C;",
				"&#X3C",
				"&#X03C",
				"&#X003C",
				"&#X0003C",
				"&#X00003C",
				"&#X000003C",
				"&#X3C;",
				"&#X03C;",
				"&#X003C;",
				"&#X0003C;",
				"&#X00003C;",
				"&#X000003C;",
				"\x3c",
				"\x3C",
				"\u003c",
				"\u003C",
			];
			return `${xssRepresentations.length}:\n${xssRepresentations.join(
				"\n",
			)}`;
		})(),
	);

	addSample(
		"Z___many-links.js",
		"text/javascript",
		(() => {
			let result =
				"bla bla a url: https://microsoft.com some more bla bla";
			for (let i = 0; i < 13; ++i) {
				result += `\n${result}`;
			}
			return `/*${result}\n*/`;
		})(),
	);

	addSample(
		"Z___line-separators.js",
		"text/javascript",
		(() =>
			[
				"var x = '1'; // And\u2028 here I have a nice comment.",
				"",
				"var y = x + ' +\u2028 2 = res';",
				"",
				"y.replace(/re\u2028s/gi, '3');",
			].join("\n"))(),
	);

	addXHRSample(
		"Z___intellisense.js",
		"run-editor-intellisense-js.txt",
		"text/javascript",
	);

	addSample(
		"Z___recursion attack",
		"text/html",
		(() => {
			const arr = [];
			for (let i = 0; i < 10000; i++) {
				arr.push('\n<script type="text/html">');
			}
			return `${arr.length}:\n${arr.join("")}`;
		})(),
	);

	addSample("empty", "text/plain", "");

	addXHRSample("Z___dynamic", "run-editor-sample-dynamic.txt", {
		name: "custom.1.",
		tokenizer: {
			root: [
				[/\[error.*/, "custom-error"],
				[/\[notice.*/, "custom-notice"],
				[/\[info.*/, "custom-info"],
				[/\[[a-zA-Z 0-9:]+\]/, "custom-date"],
			],
		},
	});

	addXHRSample("Z___f12___css", "run-editor-sample-f12-css.txt", "text/css");

	return samples;
});
