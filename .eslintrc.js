module.exports = {
  extends: 'airbnb',
  parser: 'babel-eslint',
  env: {
    jest: true,
  },
  rules: {
    'arrow-parens': ['error', 'as-needed'],
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.js', '.jsx'],
      },
    ],
    curly: ['error', 'all'],
    'global-require': 'off',
    'no-console': [
      'error',
      {
        allow: ['warn', 'error'],
      },
    ],
    'no-use-before-define': [
      'error',
      {
        variables: false,
      },
    ],
    'import/no-extraneous-dependencies': 'off',
    'import/extensions': 'off',
    'import/no-named-as-default': 'off',
    'import/no-unresolved': 'off',
    'import/newline-after-import': 'off',
    'import/prefer-default-export': 'off',
    'operator-linebreak': ['error', 'after'],
    'object-curly-newline': 'off',
    'jsx-a11y/href-no-hash': 'off',
    'jsx-a11y/img-has-alt': 'off',
    'react/require-default-props': 'off',
    'space-before-function-paren': 0,
    'react/forbid-prop-types': 'off',
  },
};
