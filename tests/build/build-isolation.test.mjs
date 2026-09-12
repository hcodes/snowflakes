import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { cpSync, existsSync, mkdtempSync, mkdirSync, readFileSync, readdirSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import { test } from 'node:test';

const root = fileURLToPath(new URL('../../', import.meta.url));

function fixture(t) {
    const directory = mkdtempSync(path.join(tmpdir(), 'snowflakes-build-'));
    t.after(() => rmSync(directory, { recursive: true, force: true }));
    for (const entry of readdirSync(root)) {
        if (['src', 'examples', 'scripts'].includes(entry) || /^(package\.json|.*config.*\.(json|mjs))$/.test(entry)) {
            cpSync(path.join(root, entry), path.join(directory, entry), {
                recursive: true,
                filter: source => path.basename(source) !== 'dist',
            });
        }
    }
    symlinkSync(path.join(root, 'node_modules'), path.join(directory, 'node_modules'), 'dir');
    return directory;
}

function runNpm(directory, args) {
    return spawnSync('npm', args, {
        cwd: directory,
        encoding: 'utf8',
        timeout: 120000,
        env: { ...process.env, npm_config_cache: path.join(directory, '.npm-cache') },
    });
}

function npm(directory, ...args) {
    const result = runNpm(directory, args);
    assert.equal(result.status, 0, `${args.join(' ')} failed:\n${result.stdout}\n${result.stderr}\n${result.error || ''}`);
}

function assertInjected(file) {
    const source = readFileSync(file, 'utf8');
    assert.doesNotMatch(source, /\{(?:MAIN_STYLE|IMAGES_STYLE)\}|\.snowflakes_gid_value/);
    assert.match(source, /data:image\/svg\+xml/);
}

test('library builds and packs without constructor sources', t => {
    const directory = fixture(t);
    rmSync(path.join(directory, 'examples'), { recursive: true });
    npm(directory, 'run', 'build:lib');
    assertInjected(path.join(directory, 'dist/snowflakes.js'));
    for (const file of ['snowflakes.min.js', 'snowflakes.auto.min.js', 'snowflakes.light.min.js', 'snowflakes.esm.js', 'index.d.ts', 'main.css', 'types.css']) {
        assert.ok(existsSync(path.join(directory, 'dist', file)), file);
    }
    rmSync(path.join(directory, 'dist'), { recursive: true });
    npm(directory, 'pack', '--json');
    assertInjected(path.join(directory, 'dist/snowflakes.js'));
    assert.ok(readdirSync(directory).some(file => file.endsWith('.tgz')));
    assert.equal(existsSync(path.join(directory, 'examples')), false);
});

test('broken constructor does not affect library build or typecheck', t => {
    const directory = fixture(t);
    writeFileSync(path.join(directory, 'examples/constructor/src/broken.ts'), 'const broken: string = 42;\n');
    npm(directory, 'run', 'build:lib');
    npm(directory, 'run', 'typecheck:lib');
    assertInjected(path.join(directory, 'dist/snowflakes.js'));
    assert.equal(existsSync(path.join(directory, 'examples/constructor/dist')), false);
    const library = readFileSync(path.join(directory, 'dist/snowflakes.js'), 'utf8');
    const failedBuild = runNpm(directory, ['run', 'build:examples']);
    assert.notEqual(failedBuild.status, 0);
    assert.match(failedBuild.stderr, /broken\.ts/);
    assert.equal(readFileSync(path.join(directory, 'dist/snowflakes.js'), 'utf8'), library);
});

test('examples build without library output and leave existing library files intact', t => {
    const directory = fixture(t);
    npm(directory, 'run', 'build:examples');
    assertInjected(path.join(directory, 'examples/constructor/dist/index.js'));
    assert.ok(existsSync(path.join(directory, 'examples/constructor/dist/index.css')));
    assert.equal(existsSync(path.join(directory, 'dist')), false);
    mkdirSync(path.join(directory, 'dist'));
    const sentinel = path.join(directory, 'dist/snowflakes.js');
    writeFileSync(sentinel, 'existing library output');
    npm(directory, 'run', 'build:examples');
    assert.equal(readFileSync(sentinel, 'utf8'), 'existing library output');
    assert.deepEqual(readdirSync(path.join(directory, 'dist')), ['snowflakes.js']);
});
