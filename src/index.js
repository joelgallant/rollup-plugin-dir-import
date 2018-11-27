const path = require('path');
const fs = require('fs-extra');
const dir = /^(.*)\/\*(\?importer=(.+)){0,1}$/;

module.exports = () => ({
  name: 'dir-import',

  async resolveId(importee, importer) {
    if (importee.match(dir)) {
      return path.join(path.dirname(importer), importee) + `?importer=${importer}`;
    }

    return null;
  },

  async load(id) {
    const match = id.match(dir);

    if (match) {
      const folder = match[1];
      const importer = match[3];
      const files = await fs.readdir(folder);

      let exports = [];
      let namedExports = {};
      let output = '';
      await Promise.all(files
        .filter(file => ['.js', '.ts', '.json', '.jsx', '.tsx'].includes(path.extname(file)))
        .map(async (file) => {
          const name = `a${Math.random().toString(36).substring(7)}`;
          const from = await this.resolveId(path.join(folder, file));

          if (from !== importer) {
            output += `import { default as ${name} } from "${from}";\n`;

            namedExports[path.basename(file, path.extname(file))] = name;
            exports.push(name);
          }
        }));

      output += `export const files = {
        ${Object.entries(namedExports).map(([name, val]) => {
          return `'${name}': ${val}`;
        })}
      };\n`;

      output += `export default [${exports.join(',')}];\n`;

      return output;
    }

    return null;
  },
});
