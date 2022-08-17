module.exports = {
  plugins: [
    '@typescript-eslint', 
    'jest', 
    'json-format'
  ],
  overrides: [
    {
      files: '*.ts',
      parser: '@typescript-eslint/parser',
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: './tsconfig.json'
      },
      extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking'
      ],
      rules: {
        quotes: [ 'warn', 'single' ],
        indent: [ 'warn', 4, { FunctionExpression: { parameters: 'first' }, SwitchCase: 1 } ],
        '@typescript-eslint/ban-ts-comment': 'off',
        "@typescript-eslint/no-unsafe-call": "warn",
        '@typescript-eslint/no-unsafe-assignment': 'warn',
        "@typescript-eslint/no-unsafe-member-access": "warn",
        '@typescript-eslint/no-non-null-assertion': 'warn',
        '@typescript-eslint/no-unnecessary-type-assertion': 'warn',
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/unbound-method': 'warn',
        '@typescript-eslint/require-await': 'warn',
        '@typescript-eslint/explicit-function-return-type': 'warn',
        '@typescript-eslint/ban-types': 'warn',
        'eol-last': 'warn',
        'no-console': 'warn',
        'no-undef': 'warn',
        "no-await-in-loop": "off",
        "import/prefer-default-export": "off",
        "prefer-promise-reject-errors": "warn",
      },
      settings: {
        'import/resolver': {
          node: {
            extensions: ['.js', '.ts', '.json']
          }
        },
      },
    },
    {
      files: '*.json',
      settings: {
        "json/json-with-comments-files": [".vscode/**"],
      },
    },
  ],
  env: {
    es6: true,
    jest: true,
    node: true
  },
  root: true,
}
