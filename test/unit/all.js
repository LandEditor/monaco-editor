const requirejs = require("requirejs");
const jsdom = require("jsdom");
const glob = require("glob");
const path = require("path");

requirejs.config({
	baseUrl: "",
	paths: {
		"vs/fillers/monaco-editor-core":
			"out/languages/amd-tsc/fillers/monaco-editor-core-amd",
		"vs/basic-languages": "out/languages/amd-tsc/basic-languages",
		vs: "./node_modules/monaco-editor-core/dev/vs",
	},
	nodeRequire: require,
});

const tmp = new jsdom.JSDOM("<!DOCTYPE html><html><body></body></html>");
global.AMD = true;
global.document = tmp.window.document;
global.navigator = tmp.window.navigator;
global.self = global;
global.document.queryCommandSupported = () => false;
global.UIEvent = tmp.window.UIEvent;

global.window = {
	location: {},
	navigator: tmp.window.navigator,
	matchMedia: () => ({
		matches: false,
		addEventListener: () => {},
	}),
};

requirejs(
	["test/unit/setup"],
	() => {
		glob(
			"out/languages/amd-tsc/basic-languages/*/*.test.js",
			{ cwd: path.join(__dirname, "../../") },
			(err, files) => {
				if (err) {
					console.log(err);
					return;
				}
				requirejs(
					files.map((f) =>
						f
							.replace(/^out\/languages\/amd-tsc/, "vs")
							.replace(/\.js$/, ""),
					),
					() => {
						run(); // We can launch the tests!
					},
					(err) => {
						console.log(err);
					},
				);
			},
		);
	},
	(err) => {
		console.log(err);
		process.exit(1);
	},
);
