module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/airbnb'
  ],
  'rules': {
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      'js': 'never',
      'vue': 'never'
    }],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      'optionalDependencies': ['test/unit/index.js']
    }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    "no-param-reassign": ['error', { "props": false }],
    "no-unused-expressions": ['error', { "allowShortCircuit": false, "allowTernary": true }],
    "import/prefer-default-export": 0,
    "prefer-destructuring": ["error", {
      "array": false,
      "object": false
    }, {
      "enforceForRenamedProperties": false
    }]
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
