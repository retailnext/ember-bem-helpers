'use strict';

module.exports = {
  plugins: ['prettier-plugin-ember-template-tag'],
  overrides: [
    {
      files: '*.{js,gjs,ts,gts}',
      options: {
        singleQuote: true,
      },
    },
  ],
};
