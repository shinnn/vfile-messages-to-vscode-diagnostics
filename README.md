# vfile-messages-to-vscode-diagnostics

[![NPM version](https://img.shields.io/npm/v/vfile-messages-to-vscode-diagnostics.svg)](https://www.npmjs.com/package/vfile-messages-to-vscode-diagnostics)
[![Build Status](https://travis-ci.org/shinnn/vfile-messages-to-vscode-diagnostics.svg?branch=master)](https://travis-ci.org/shinnn/vfile-messages-to-vscode-diagnostics)
[![Coverage Status](https://img.shields.io/coveralls/shinnn/vfile-messages-to-vscode-diagnostics.svg)](https://coveralls.io/github/shinnn/vfile-messages-to-vscode-diagnostics)
[![Dependency Status](https://david-dm.org/shinnn/vfile-messages-to-vscode-diagnostics.svg)](https://david-dm.org/shinnn/vfile-messages-to-vscode-diagnostics)
[![devDependency Status](https://david-dm.org/shinnn/vfile-messages-to-vscode-diagnostics/dev-status.svg)](https://david-dm.org/shinnn/vfile-messages-to-vscode-diagnostics#info=devDependencies)

A [Node](https://nodejs.org/) module to convert [VFile#messages](https://github.com/wooorm/vfile#vfilemessages) into an array of [VS Code](https://code.visualstudio.com/) [diagnostic](https://github.com/Microsoft/vscode-extension-vscode/blob/0.10.6/vscode.d.ts#L2220)s

```javascript
const VFile = require('vfile');
const vFileMessagesToVSCodeDiagnostics = require('vfile-messages-to-vscode-diagnostics');

vFileMessagesToVSCodeDiagnostics(new VFile().warn('error!', {line: 10, column: 2}));
/* =>
  [{
    message: 'error!',
    severity: 2,
    range: {
      start: {line: 9, character: 1},
      end: {line: 9, character: 1}
    }
  }]
*/
```

## Installation

[Use npm.](https://docs.npmjs.com/cli/install)

```
npm install vfile-messages-to-vscode-diagnostics
```

## API

```javascript
const vFileMessagesToVSCodeDiagnostics = require('vfile-messages-to-vscode-diagnostics');
```

### vFileMessagesToVSCodeDiagnostics(*messages*)

*messages*: `Object` ([VFile#messages](https://www.npmjs.com/package/vfile#vfile-messages))  
Return: `Array` of [VS Code](https://github.com/microsoft/vscode)'s [Diagnostics](https://code.visualstudio.com/docs/extensionAPI/vscode-api#Diagnostic) instance

It converts an array of [VFileMessage](https://github.com/wooorm/vfile#vfilemessage)s to an array of [Visual Studio Code API](https://code.visualstudio.com/docs/extensionAPI/vscode-api) compatible `Diagnostics` instances.

```javascript
const VFile = require('vfile');
const vFileMessagesToVSCodeDiagnostics = require('vfile-messages-to-vscode-diagnostics');

const file = new VFile();
file.warn('err1');
file.warn('err2', {
  position: {
    start: {line: 23, column: 5},
    end: {line: 23, column: 11}
  }
});

vFileMessagesToVSCodeDiagnostics(file.messages);
/* =>
  [{
    message: 'err1',
    severity: 2,
    range: {
      start: {line: 0, character: 0},
      end: {line: 0, character: 0}
    } 
  }, {
    message: 'err2',
    severity: 2,
    range: {
      start: {line: 22, character: 4},
      end: {line: 22, character: 10}
    }
  }]
*/
```

## License

Copyright (c) 2015 [Shinnosuke Watanabe](https://github.com/shinnn)

Licensed under [the MIT License](./LICENSE).
