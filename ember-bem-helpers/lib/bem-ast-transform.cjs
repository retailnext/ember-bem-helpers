'use strict';

module.exports = (env) => {
  const builders = env.syntax.builders;

  return {
    name: 'ember-bem-helpers',
    visitor: {
      Program(node) {
        blockify(node.body, builders);
      },
      MustacheStatement(node) {
        addBlockName(node, builders);
      },
      SubExpression(node) {
        addBlockName(node, builders);
      },
    },
  };
};

function isBlockName(statement) {
  return (
    statement.type === 'MustacheStatement' &&
    (statement.path.original === 'block-name' ||
      statement.path.original === 'blockName')
  );
}

function isBem(statement) {
  return statement.path.original === 'bem';
}

function extractBlockName(statement) {
  return statement.params[0];
}

function blockify(statements, builders) {
  if (statements) {
    const blockNameIndex = statements.findIndex(isBlockName);
    if (blockNameIndex >= 0) {
      const blockName = extractBlockName(statements[blockNameIndex]);
      const trailingStatements = statements.splice(
        blockNameIndex + 1,
        statements.length - (blockNameIndex + 1),
      );

      statements[blockNameIndex] = builders.block(
        builders.path('let'),
        [blockName],
        null,
        builders.program(trailingStatements, ['blockName']),
      );
    }
  }
}

function addBlockName(node, builders) {
  if (isBem(node)) {
    // Add blockName as a first parameter to the {{bem}} helper
    node.params.unshift(builders.path('blockName'));
  }
}
