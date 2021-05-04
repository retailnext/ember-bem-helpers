'use strict';

const BemAstTransform = require('./lib/bem-ast-transform');

module.exports = {
  name: require('./package').name,

  setupPreprocessorRegistry(type, registry) {
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
  },

  _buildPlugin() {
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
  },
};
