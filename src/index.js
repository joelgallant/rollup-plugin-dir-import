const path = require('path');
const fs = require('fs-extra');
const dir = /^(.*)\/\*(\?importer=(.+)){0,1}$/;

module.exports = () => {
  return {
    name: 'dir-import',
    async resolveId(importee, importer) {
      if (importee.match(dir)) {
        return path.join(path.dirname(importer), importee) + `?importer=${importer}`;
      }

      return null;
    },
    async load(id, ...rest) {
      const match = id.match(dir);

      if (match) {
        const folder = match[1];
        const importer = match[3];
        const files = await fs.readdir(folder);

        let exports = [];
        let output = '';
        await Promise.all(files
          .filter(file => ['.js', '.ts', '.json', '.jsx', '.tsx'].includes(path.extname(file)))
          .map(async (file) => {
            const name = `a${Math.random().toString(36).substring(7)}`;
            const from = await this.resolveId(path.join(folder, file));

            if (from !== importer) {
              output += `import { default as ${name} } from "${from}";\n`;
              exports.push(name);
            }
          }));

        output += `export default [${exports.join(',')}];\n`;

        return output;
      }

      return null;
    }
  };
};
