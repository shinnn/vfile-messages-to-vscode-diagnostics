/*!
 * vfile-messages-to-vscode-diagnostics | MIT (c) Shinnosuke Watanabe
 * https://github.com/shinnn/vfile-messages-to-vscode-diagnostics
*/
'use strict';

const filteredArrayToSentence = require('filtered-array-to-sentence');
const isVFileMessage = require('is-vfile-message');

module.exports = function vFileMessagesToVSCodeDiagnostics(messages) {
  if (!Array.isArray(messages)) {
    throw new TypeError(
      String(messages) +
      ' is not an array. Expected an array of VFileMessage objects.'
    );
  }

  const invalidValues = filteredArrayToSentence(messages, v => !isVFileMessage(v));
  if (invalidValues !== '') {
    throw new TypeError(
      'The array includes invalid value(s): ' +
      invalidValues +
      '. All items in the array must be VFileMessage objects.'
    );
  }

  return messages.map(function makeDiagnostic(message) {
    return {
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
    };
  });
};
