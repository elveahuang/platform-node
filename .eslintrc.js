require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    extends: 'eslint:recommended',
    rules: {
        '@typescript-eslint/no-var-requires': 'off',
    },
};
