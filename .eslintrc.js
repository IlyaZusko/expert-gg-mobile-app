module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'universe/native',
    'plugin:prettier/recommended',
  ],
  plugins: ['prettier'],
  rules: {
    'linebreak-style': 0,
    indent: ['error', 2],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'prettier/prettier': 'error',
    'prefer-arrow-callback': 'off',
    'arrow-body-style': 'off',
    curly: ['error', 'multi-line'],
    'no-empty': 0,
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
  },
};
