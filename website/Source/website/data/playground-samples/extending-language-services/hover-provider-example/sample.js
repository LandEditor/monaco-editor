monaco.languages.register({ id: "mySpecialLanguage" });

monaco.languages.registerHoverProvider("mySpecialLanguage", {
	provideHover: (model, position) => xhr("./playground.html").then((res) => ({
				range: new monaco.Range(
					1,
					1,
					model.getLineCount(),
					model.getLineMaxColumn(model.getLineCount())
				),
				contents: [
					{ value: "**SOURCE**" },
					{
						value:
							`\`\`\`html\n${res.responseText.substring(0, 200)}\n`\`\``,
					},
				],
			})),
});

monaco.editor.create(document.getElementById("container"), {
	value: "\n\nHover over this text",
	language: "mySpecialLanguage",
});

function xhr(url) {
	let req = null;
	return new Promise((c, e) => {
		req = new XMLHttpRequest();
		req.onreadystatechange = () => {
			if (req._canceled) {
				return;
			}

			if (req.readyState === 4) {
				if (
					(req.status >= 200 && req.status < 300) ||
					req.status === 1223
				) {
					c(req);
				} else {
					e(req);
				}
				req.onreadystatechange = () => {};
			}
		};

		req.open("GET", url, true);
		req.responseType = "";

		req.send(null);
	}).catch(() => {
		req._canceled = true;
		req.abort();
	});
}
