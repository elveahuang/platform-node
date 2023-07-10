require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:jsx-a11y/recommended',
        'plugin:prettier/recommended',
    ],
    plugins: ['prettier', 'react', 'react-hooks', 'jsx-a11y'],
    rules: {
        '@typescript-eslint/no-var-requires': 'off',
    },
};
