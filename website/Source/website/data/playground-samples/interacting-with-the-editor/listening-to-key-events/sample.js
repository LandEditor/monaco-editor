const editor = monaco.editor.create(document.getElementById("container"), {
	value: "function hello() {\n\talert('Hello world!');\n}",
	language: "javascript",
});

const myBinding = editor.addCommand(monaco.KeyCode.F9, () => {
	alert("F9 pressed!");
});

// You can't dispose `addCommand`
// If you need to dispose it you might use `addAction` or `registerCommand`
