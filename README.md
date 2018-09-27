# vfile-messages-to-vscode-diagnostics

[![npm version](https://img.shields.io/npm/v/vfile-messages-to-vscode-diagnostics.svg)](https://www.npmjs.com/package/vfile-messages-to-vscode-diagnostics)
[![Build Status](https://travis-ci.org/shinnn/vfile-messages-to-vscode-diagnostics.svg?branch=master)](https://travis-ci.org/shinnn/vfile-messages-to-vscode-diagnostics)
[![Coverage Status](https://img.shields.io/coveralls/shinnn/vfile-messages-to-vscode-diagnostics.svg)](https://coveralls.io/github/shinnn/vfile-messages-to-vscode-diagnostics)

Convert [`VFile#messages`](https://github.com/vfile/vfile#vfilemessages) into an `Array` of [VS Code](https://code.visualstudio.com/) [diagnostic](https://github.com/Microsoft/vscode-languageserver-node/blob/release/types/3.13.0/types/src/main.ts#L452)s

```javascript
const VFile = require('vfile');
const vFileMessagesToVSCodeDiagnostics = require('vfile-messages-to-vscode-diagnostics');

vFileMessagesToVSCodeDiagnostics(new VFile().message('warning!', {line: 10, column: 2}));
/* =>
  [{
    message: 'warning!',
    severity: 2,
    range: {
      start: {line: 9, character: 1},
      end: {line: 9, character: 1}
    }
  }]
*/
```

## Installation

[Use](https://docs.npmjs.com/cli/install) [npm](https://docs.npmjs.com/getting-started/what-is-npm).

```
npm install vfile-messages-to-vscode-diagnostics
```

## API

```javascript
const vFileMessagesToVSCodeDiagnostics = require('vfile-messages-to-vscode-diagnostics');
```

### vFileMessagesToVSCodeDiagnostics(*messages*)

*messages*: `<Iterable<VFileMessage>>` except for `string` and `Map`  
Return: `Diagnostics[]`

```javascript
const VFile = require('vfile');
const vFileMessagesToVSCodeDiagnostics = require('vfile-messages-to-vscode-diagnostics');

const file = new VFile();
file.message('warning1');
file.message('warning2', {
  position: {
    start: {line: 23, column: 5},
    end: {line: 23, column: 11}
  }
});

vFileMessagesToVSCodeDiagnostics(file.messages);
/* =>
  [{
    message: 'warning1',
    severity: 2,
    range: {
      start: {line: 0, character: 0},
      end: {line: 0, character: 0}
    }
  }, {
    message: 'warning2',
    severity: 2,
    range: {
      start: {line: 22, character: 4},
      end: {line: 22, character: 10}
    }
  }]
*/
```

## License

[ISC License](./LICENSE) © 2018 Shinnosuke Watanabe
