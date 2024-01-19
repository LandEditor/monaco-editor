define("vs/css", [], {
	load: (name, req, load) => {
		load({});
	},
});

define("vs/nls", [], {
	create: () => ({
		localize: () => "NO_LOCALIZATION_FOR_YOU",
		localize2: () => "NO_LOCALIZATION_FOR_YOU",
		getConfiguredDefaultLocale: () => undefined,
	}),
	localize: () => "NO_LOCALIZATION_FOR_YOU",
	load: (name, req, load) => {
		load({});
	},
});

define(["vs/editor/editor.main"], (api) => {
	global.monaco = api;
});
