const fs = require('fs');
const { rollup } = require('rollup');
const plugin = require('../src/index');

process.chdir('__test_assets__');

test('plugin', async () => {
  const bundle = await rollup({
    input: 'entry.js',
    plugins: [plugin()]
  });

  const { code } = await bundle.generate({ format: 'cjs' });

  const exports = {};
  new Function('exports', code)(exports);

  expect(exports.modules.length).toBe(3);
  expect(exports.modules[0]).toEqual({ a: true });
  expect(exports.modules[1]).toEqual({ b: 'foo' });
  expect(exports.modules[2]).toEqual({ c: 'bar' });
});
