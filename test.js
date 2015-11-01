'use strong';

const alex = require('alex');
const {DiagnosticSeverity} = require('vscode-languageserver');
const VFile = require('vfile');
const vFileMessagesToVSCodeDiagnostics = require('.');
const {test} = require('tape');

test('vFileMessagesToVSCodeDiagnostics()', t => {
  t.plan(8);

  t.strictEqual(
    vFileMessagesToVSCodeDiagnostics.name,
    'vFileMessagesToVSCodeDiagnostics',
    'should have a function name.'
  );

  t.deepEqual(
    vFileMessagesToVSCodeDiagnostics(alex('He is a video game maniac.').messages),
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
        severity: DiagnosticSeverity.Warning
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
        severity: DiagnosticSeverity.Warning
      }
    ],
    'should convert VFile#messages to VS Code diagnostics.'
  );

  const file = new VFile();
  file.quiet = true;
  file.fail('foo');

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
        severity: DiagnosticSeverity.Error
      }
    ],
    'should regard lines as 0 when the message doesn\'t have any position info.'
  );

  t.deepEqual([], [], 'should return an empty array when it takes an empty array.');

  t.throws(
    () => vFileMessagesToVSCodeDiagnostics(1),
    /TypeError.*1 is not an array\. Expected an array of VFileMessage objects\./,
    'should throw a type error when it takes non-array value.'
  );

  t.throws(
    () => vFileMessagesToVSCodeDiagnostics(file.messages.concat(['foo'])),
    /TypeError.*The array includes invalid value\(s\): foo \(index: 1\)\./,
    'should throw a type error when the array includes a non-VFileMessage value.'
  );

  t.throws(
    () => vFileMessagesToVSCodeDiagnostics(file.messages.concat([8, 9])),
    /TypeError.*8 \(index: 1\) and 9 \(index: 2\)\. All items in the array must be VFileMessage objects\./,
    'should throw a type error when the array includes non-VFileMessage values.'
  );

  t.throws(
    () => vFileMessagesToVSCodeDiagnostics(),
    /TypeError.*undefined is not an array\. Expected an array of VFileMessage objects\./,
    'should throw a type error when it takes no arguments.'
  );
});