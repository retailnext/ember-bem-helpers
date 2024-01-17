'use strict';

const { addonV1Shim } = require('@embroider/addon-shim');
const BemAstTransform = require('./src/lib/bem-ast-transform.js');
const extracted = addonV1Shim(__dirname);

extracted.setupPreprocessorRegistry = function (type, registry) {
  // Skip if we're setting up this addon's own registry
  if (type !== 'parent') {
    return;
  }

  let pluginObj = this._buildPlugin();
  pluginObj.parallelBabel = {
    requireFile: __filename,
    buildUsing: '_buildPlugin',
    params: {},
  };
  registry.add('htmlbars-ast-plugin', pluginObj);
};

extracted._buildPlugin = function () {
  return {
    name: 'ember-bem-helpers',
    plugin: BemAstTransform,
    baseDir() {
      return __dirname;
    },
    cacheKey() {
      return 'ember-bem-helpers';
    },
  };
};

module.exports = extracted;
