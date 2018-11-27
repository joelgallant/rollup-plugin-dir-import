## rollup-plugin-dir-import
[![Build Status](https://travis-ci.com/joelgallant/rollup-plugin-dir-import.svg?branch=master)](https://travis-ci.com/joelgallant/rollup-plugin-dir-import)
[![npm version](https://badge.fury.io/js/rollup-plugin-dir-import.svg)](https://badge.fury.io/js/rollup-plugin-dir-import)

import all modules in a directory

```javascript
import modules from './foldername/*';
// modules is an array of the default exports of all modules in ./foldername

import { files } from './foldername/*';
// files is an object with { [filename without extension]: default exported from filename }
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
