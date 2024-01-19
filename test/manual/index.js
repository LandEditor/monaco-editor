/// <reference path="../../out/monaco-editor/monaco.d.ts" />
define(["require", "./samples"], (require, SAMPLES) => {
	const domutils = require("vs/base/browser/dom");

	let model = monaco.editor.createModel("", "plaintext");

	monaco.languages.typescript.typescriptDefaults.setInlayHintsOptions({
		includeInlayParameterNameHints: "all",
		includeInlayParameterNameHintsWhenArgumentMatchesName: true,
		includeInlayFunctionParameterTypeHints: true,
		includeInlayVariableTypeHints: true,
		includeInlayPropertyDeclarationTypeHints: true,
		includeInlayFunctionLikeReturnTypeHints: true,
		includeInlayEnumMemberValueHints: true,
	});

	const editor = monaco.editor.create(document.getElementById("container"), {
		model: model,
		glyphMargin: true,
		renderWhitespace: true,
	});

	editor.addCommand(
		monaco.KeyMod.CtrlCmd | monaco.KeyCode.F9,
		(ctx, args) => {
			alert("Command Running!!");
			console.log(ctx);
		},
	);

	editor.addAction({
		id: "my-unique-id",
		label: "My Label!!!",
		keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.F10],
		contextMenuGroupId: "navigation",
		contextMenuOrder: 2.5,
		run: (ed) => {
			console.log(`i'm running => ${ed.getPosition()}`);
		},
	});

	let currentSamplePromise = null;
	const samplesData = {};
	SAMPLES.sort((a, b) => a.name.localeCompare(b.name)).forEach((sample) => {
		samplesData[sample.name] = () => {
			if (currentSamplePromise !== null) {
				currentSamplePromise.cancel();
				currentSamplePromise = null;
			}
			currentSamplePromise = sample.loadText().then((modelText) => {
				currentSamplePromise = null;
				updateEditor(sample.mimeType, modelText, sample.name);
			});
		};
	});
	const examplesComboBox = new ComboBox("Template", samplesData);

	const modesData = {};
	monaco.languages.getLanguages().forEach(function (language) {
		modesData[language.id] = updateEditor.bind(this, language.id);
	});
	const modesComboBox = new ComboBox("Mode", modesData);

	const themesData = {};
	themesData["vs"] = () => {
		monaco.editor.setTheme("vs");
	};
	themesData["vs-dark"] = () => {
		monaco.editor.setTheme("vs-dark");
	};
	themesData["hc-black"] = () => {
		monaco.editor.setTheme("hc-black");
	};
	const themesComboBox = new ComboBox("Theme", themesData);

	// Do it in a timeout to simplify profiles
	window.setTimeout(() => {
		let START_SAMPLE = "Y___DefaultJS";

		const url_matches = location.search.match(/sample=([^?&]+)/i);
		if (url_matches) {
			START_SAMPLE = url_matches[1];
		}

		if (location.hash) {
			START_SAMPLE = location.hash.replace(/^\#/, "");
			START_SAMPLE = decodeURIComponent(START_SAMPLE);
		}

		samplesData[START_SAMPLE]();
		examplesComboBox.set(START_SAMPLE);

		createOptions(editor);
		createToolbar(editor);
	}, 0);

	function updateEditor(mode, value, sampleName) {
		if (sampleName) {
			window.location.hash = sampleName;
		}

		if (typeof value !== "undefined") {
			const oldModel = model;
			model = monaco.editor.createModel(value, mode);
			editor.setModel(model);
			if (oldModel) {
				oldModel.dispose();
			}
		} else {
			monaco.editor.setModelLanguage(model, mode);
		}

		modesComboBox.set(mode);
	}

	function createToolbar(editor) {
		const bar = document.getElementById("bar");

		bar.appendChild(examplesComboBox.domNode);

		bar.appendChild(modesComboBox.domNode);

		bar.appendChild(themesComboBox.domNode);

		bar.appendChild(
			createButton("Dispose all", (e) => {
				editor.dispose();
				editor = null;
				if (model) {
					model.dispose();
					model = null;
				}
			}),
		);

		bar.appendChild(
			createButton("Remove Model", (e) => {
				editor.setModel(null);
			}),
		);

		bar.appendChild(
			createButton("Dispose Model", (e) => {
				if (model) {
					model.dispose();
					model = null;
				}
			}),
		);

		bar.appendChild(
			createButton(
				"Ballistic scroll",
				(() => {
					const friction = 1000; // px per second
					let speed = 0; // px per second
					let isRunning = false;
					let lastTime;
					let r = 0;

					const scroll = () => {
						const currentTime = new Date().getTime();
						const ellapsedTimeS = (currentTime - lastTime) / 1000;
						lastTime = currentTime;

						speed -= friction * ellapsedTimeS;
						r += speed * ellapsedTimeS;
						editor.setScrollTop(r);

						if (speed >= 0) {
							domutils.scheduleAtNextAnimationFrame(scroll);
						} else {
							isRunning = false;
						}
					};

					return (e) => {
						speed += 2000;
						if (!isRunning) {
							isRunning = true;
							r = editor.getScrollTop();
							lastTime = new Date().getTime();
							domutils.runAtThisOrScheduleAtNextAnimationFrame(
								scroll,
							);
						}
					};
				})(),
			),
		);
	}

	function createButton(label, onClick) {
		const result = document.createElement("button");
		result.innerHTML = label;
		result.onclick = onClick;
		return result;
	}

	function createOptions(editor) {
		const options = document.getElementById("options");

		let lineNumbers;
		options.appendChild(
			createOptionToggle(
				editor,
				"lineNumbers",
				() => (lineNumbers === false ? false : true),
				(editor, newValue) => {
					lineNumbers = newValue;
					editor.updateOptions({
						lineNumbers: lineNumbers ? "on" : "off",
					});
				},
			),
		);

		let glyphMargin;
		options.appendChild(
			createOptionToggle(
				editor,
				"glyphMargin",
				() => (glyphMargin === false ? false : true),
				(editor, newValue) => {
					glyphMargin = newValue;
					editor.updateOptions({ glyphMargin: glyphMargin });
				},
			),
		);

		let minimap;
		options.appendChild(
			createOptionToggle(
				editor,
				"minimap",
				() => (minimap === false ? false : true),
				(editor, newValue) => {
					minimap = newValue;
					editor.updateOptions({ minimap: { enabled: minimap } });
				},
			),
		);

		let roundedSelection;
		options.appendChild(
			createOptionToggle(
				editor,
				"roundedSelection",
				() => (roundedSelection === false ? false : true),
				(editor, newValue) => {
					roundedSelection = newValue;
					editor.updateOptions({
						roundedSelection: roundedSelection,
					});
				},
			),
		);

		let scrollBeyondLastLine;
		options.appendChild(
			createOptionToggle(
				editor,
				"scrollBeyondLastLine",
				() => (scrollBeyondLastLine === false ? false : true),
				(editor, newValue) => {
					scrollBeyondLastLine = newValue;
					editor.updateOptions({
						scrollBeyondLastLine: scrollBeyondLastLine,
					});
				},
			),
		);

		let renderWhitespace;
		options.appendChild(
			createOptionToggle(
				editor,
				"renderWhitespace",
				() => (renderWhitespace === true ? true : false),
				(editor, newValue) => {
					renderWhitespace = newValue;
					editor.updateOptions({
						renderWhitespace: renderWhitespace,
					});
				},
			),
		);

		let readOnly;
		options.appendChild(
			createOptionToggle(
				editor,
				"readOnly",
				() => (readOnly === true ? true : false),
				(editor, newValue) => {
					readOnly = newValue;
					editor.updateOptions({ readOnly: readOnly });
				},
			),
		);

		let wordWrap;
		options.appendChild(
			createOptionToggle(
				editor,
				"wordWrap",
				() => (wordWrap === true ? true : false),
				(editor, newValue) => {
					wordWrap = newValue;
					editor.updateOptions({ wordWrap: wordWrap ? "on" : "off" });
				},
			),
		);

		let folding;
		options.appendChild(
			createOptionToggle(
				editor,
				"folding",
				() => (folding === false ? false : true),
				(editor, newValue) => {
					folding = newValue;
					editor.updateOptions({ folding: folding });
				},
			),
		);

		let bracketPairColorizationEnabled = false;
		options.appendChild(
			createOptionToggle(
				editor,
				"bracketPairColorizationEnabled",
				() => (bracketPairColorizationEnabled === false ? false : true),
				(editor, newValue) => {
					bracketPairColorizationEnabled = newValue;
					editor.updateOptions({
						"bracketPairColorization.enabled":
							bracketPairColorizationEnabled,
					});
				},
			),
		);
	}

	function createOptionToggle(editor, labelText, stateReader, setState) {
		const domNode = document.createElement("div");
		domNode.className = "option toggle";

		const input = document.createElement("input");
		input.type = "checkbox";

		const label = document.createElement("label");
		label.appendChild(input);
		label.appendChild(document.createTextNode(labelText));

		domNode.appendChild(label);

		const renderState = () => {
			input.checked = stateReader();
		};

		renderState();
		editor.onDidChangeConfiguration(() => {
			renderState();
		});
		input.onchange = () => {
			setState(editor, !stateReader());
		};

		return domNode;
	}

	function ComboBox(label, externalOptions) {
		this.id = `combobox-${label.toLowerCase().replace(/\s/g, "-")}`;

		this.domNode = document.createElement("div");
		this.domNode.setAttribute(
			"style",
			"display: inline; margin-right: 5px;",
		);

		this.label = document.createElement("label");
		this.label.innerHTML = label;
		this.label.setAttribute("for", this.id);
		this.domNode.appendChild(this.label);

		this.comboBox = document.createElement("select");
		this.comboBox.setAttribute("id", this.id);
		this.comboBox.setAttribute("name", this.id);
		this.comboBox.onchange = function (e) {
			const target = e.target || e.srcElement;
			this.options[target.options[target.selectedIndex].value].callback();
		}.bind(this);

		this.domNode.appendChild(this.comboBox);

		this.options = [];
		for (const name in externalOptions) {
			if (externalOptions.hasOwnProperty(name)) {
				const optionElement = document.createElement("option");
				optionElement.value = name;
				optionElement.innerHTML = name;
				this.options[name] = {
					element: optionElement,
					callback: externalOptions[name],
				};
				this.comboBox.appendChild(optionElement);
			}
		}
	}
	ComboBox.prototype.set = function (name) {
		if (this.options[name]) {
			this.options[name].element.selected = true;
		}
	};
});
