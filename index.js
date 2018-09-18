'use strict';

const inspect = require('util').inspect;

const filteredArrayToSentence = require('filtered-array-to-sentence');
const isVFileMessage = require('is-vfile-message');

const VFILE_MESSAGE_URL = 'https://github.com/wooorm/vfile#vfilemessage';

module.exports = function vFileMessagesToVSCodeDiagnostics(messages) {
	if (
		messages === null ||
		typeof messages !== 'object' ||
		typeof messages[Symbol.iterator] !== 'function' ||
		messages instanceof Map
	) {
		throw new TypeError(`Expected <Iterable<VFileMessage>> except for <string|Map>, but got ${inspect(messages)}.`);
	}

	const diagnostics = [];

	for (const message of messages) {
		if (!(message instanceof VFileMessage)) {
			throw new TypeError(`Expected every item to be a VFileMessage, but included ${
				inspect(message)
			}.`);
		}

		diagnostics.push({
			message: message.reason,
			// https://github.com/Microsoft/vscode-languageserver-node/blob/v2.6.2/types/src/main.ts#L130-L147
			severity: message.fatal === true ? 1 : 2,
			range: {
				start: {
					line: (message.location.start.line || message.line || 1) - 1,
					character: (message.location.start.column || message.column || 1) - 1
				},
				end: {
					line: (message.location.end.line || message.line || 1) - 1,
					character: (message.location.end.column || message.column || 1) - 1
				}
			}
		});
	}

	return diagnostics;
};
