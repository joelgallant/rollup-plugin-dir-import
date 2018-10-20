## rollup-plugin-dir-import
import all modules in a directory

```javascript
import modules from './foldername/*';

// modules is an array of the default exports of all modules in ./foldername
```

### Usage
```javascript
import importdir from 'rollup-plugin-dir-import';

export default {
  input: 'src/main.js',
  output: {
    file: 'dist/bundle.js',
    format: 'cjs',
  },

  plugins: [
    importdir(),
  ],
};
```
