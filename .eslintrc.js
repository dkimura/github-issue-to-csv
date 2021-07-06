/** @type {import('@typescript-eslint/experimental-utils').TSESLint.Linter.Config} */
const config = {
  extends: ['@dkimura'],
  parserOptions: {
    project: './tsconfig.json',
  },
}

module.exports = config
