import { expect, test } from '@jest/globals';
import ts from 'typescript';
import { resolve } from 'node:path';

test('public options reject misspelled properties', () => {
    const fileName = resolve('tests/public-types-fixture.ts');
    const source = `import type { SnowflakesParams } from '../src/ts/types';
const valid: SnowflakesParams = { minSize: 10, width: 0 };
const invalid: SnowflakesParams = { minSzie: 10 };
void valid; void invalid;`;
    const options = {
        strict: true,
        noEmit: true,
        skipLibCheck: true,
        types: [],
        target: ts.ScriptTarget.ES2020,
        module: ts.ModuleKind.ESNext,
        moduleResolution: ts.ModuleResolutionKind.Bundler,
    };
    const host = ts.createCompilerHost(options);
    const original = host.getSourceFile;
    host.getSourceFile = (name, ...args) => name === fileName
        ? ts.createSourceFile(name, source, ts.ScriptTarget.Latest, true)
        : original(name, ...args);
    const program = ts.createProgram([fileName], options, host);
    const errors = ts.getPreEmitDiagnostics(program);
    expect(errors).toHaveLength(1);
    expect(ts.flattenDiagnosticMessageText(errors[0].messageText, '\n')).toMatch(/minSzie/);
    expect([2353, 2561]).toContain(errors[0].code);
});
