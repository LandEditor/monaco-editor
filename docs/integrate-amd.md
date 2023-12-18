## Integrating the AMD version of the Monaco Editor

Here is the most basic HTML page that embeds the editor using AMD.

More self-contained samples are available in the [samples folder](../samples/).

```html
<!doctype html>
<html>
	<head>
		<meta content="text/html;charset=utf-8" http-equiv="Content-Type" />
	</head>
	<body>
		<div
			id="container"
			style="width:800px;height:600px;border:1px solid grey"></div>

		<script src="monaco-editor/min/vs/loader.js"></script>
		<script>
			require.config({ paths: { vs: "monaco-editor/min/vs" } });
			require(["vs/editor/editor.main"], function () {
				var editor = monaco.editor.create(
					document.getElementById("container"),
					{
						value: [
							"function x() {",
							'\tconsole.log("Hello world!");',
							"}",
						].join("\n"),
						language: "javascript",
					}
				);
			});
		</script>
	</body>
</html>
```
