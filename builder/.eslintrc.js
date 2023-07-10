module.exports = {
    root: true,
    env: {
        node: true,
        browser: true,
    },
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    extends: [
        'eslint:recommended',
        'plugin:vue/vue3-essential',
        '@vue/eslint-config-typescript',
        '@vue/eslint-config-prettier',
    ],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        'vue/multi-word-component-names': 'off',
    },
};
