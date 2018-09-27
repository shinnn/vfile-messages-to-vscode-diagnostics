'use strict';

const retext = require('retext');
const retextEquality = require('retext-equality');
const retextProfanities = require('retext-profanities');
const {test} = require('tape');
const VFile = require('vfile');
const vFileMessagesToVSCodeDiagnostics = require('.');
const vFileSort = require('vfile-sort');

// https://github.com/Microsoft/vscode-languageserver-node/blob/v2.6.2/types/src/main.ts#L130-L147
const ERROR = 1;
const WARNING = 2;

test('vFileMessagesToVSCodeDiagnostics()', async t => {
	t.deepEqual(
		vFileMessagesToVSCodeDiagnostics(vFileSort(await retext()
		.use(retextEquality)
		.use(retextProfanities)
		.process('He is a video game maniac.')).messages),
		[
			{
				message: '`He` may be insensitive, use `They`, `It` instead',
				range: {
					start: {
						character: 0,
						line: 0
					},
					end: {
						character: 2,
						line: 0
					}
				},
				severity: WARNING
			},
			{
				message: '`maniac` may be insensitive, use `fanatic`, `zealot`, `enthusiast` instead',
				range: {
					end: {
						character: 25,
						line: 0
					},
					start: {
						character: 19,
						line: 0
					}
				},
				severity: WARNING
			}
		],
		'should convert VFile#messages to VS Code diagnostics.'
	);

	const file = new VFile();
	file.message('foo');
	file.messages[0].fatal = true;

	t.deepEqual(
		vFileMessagesToVSCodeDiagnostics(file.messages),
		[
			{
				message: 'foo',
				range: {
					end: {
						line: 0,
						character: 0
					},
					start: {
						line: 0,
						character: 0
					}
				},
				severity: ERROR
			}
		],
		'should regard lines as 0 when the message doesn\'t have any position info.'
	);

	t.deepEqual([], [], 'should return an empty array when it takes an empty array.');

	t.throws(
		() => vFileMessagesToVSCodeDiagnostics({'not an': 'array'}),
		/^TypeError.*Expected <Iterable<VFileMessage>> except for <string\|Map>, but got \{ 'not an': 'array' \}\./u,
		'should throw a type error when it takes non-array value.'
	);

	t.throws(
		() => vFileMessagesToVSCodeDiagnostics(file.messages.concat(['foo'])),
		/^TypeError.*Expected every item to be a VFileMessage, but included 'foo'\./u,
		'should throw a type error when the array includes a non-VFileMessage value.'
	);

	t.throws(
		() => vFileMessagesToVSCodeDiagnostics(),
		/^TypeError.*Expected <Iterable<VFileMessage>> except for <string\|Map>, but got undefined\./u,
		'should throw a type error when it takes no arguments.'
	);

	t.end();
});
