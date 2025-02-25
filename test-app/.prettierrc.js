'use strict';

module.exports = {
  plugins: ['prettier-plugin-ember-template-tag'],
  overrides: [
    {
      files: '*.{js,gjs,mjs,ts,gts}',
      options: {
        singleQuote: true,
      },
    },
  ],
};
