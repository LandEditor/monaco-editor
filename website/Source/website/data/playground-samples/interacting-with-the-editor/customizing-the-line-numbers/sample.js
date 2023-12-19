function lineNumbersFunc(originalLineNumber) {
	const map = [
		"O",
		"I",
		"II",
		"III",
		"IV",
		"V",
		"VI",
		"VII",
		"VIII",
		"IX",
		"X",
	];
	if (originalLineNumber < map.length) {
		return map[originalLineNumber];
	}
	return originalLineNumber;
}

const jsCode = [
	'"use strict";',
	"function Person(age) {",
	"	if (age) {",
	"		this.age = age;",
	"	}",
	"}",
	"Person.prototype.getAge = function () {",
	"	return this.age;",
	"};",
].join("\n");

const editor = monaco.editor.create(document.getElementById("container"), {
	value: jsCode,
	language: "javascript",
	lineNumbers: lineNumbersFunc,
});
