import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import playwright from 'eslint-plugin-playwright';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    files: ['**/*.ts'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      playwright.configs['flat/recommended'],
      prettier
    ],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json'
      }
    },
    rules: {
      'no-console': ['error', { allow: ['warn', 'error', 'table'] }],
      'no-debugger': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      curly: 'error',
      'no-throw-literal': 'error',
      'no-unused-expressions': 'error',
      'no-return-await': 'off',
      '@typescript-eslint/return-await': ['error', 'always'],
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { vars: 'all', args: 'after-used' }],
      '@typescript-eslint/no-shadow': 'error',
      '@typescript-eslint/member-ordering': [
        'error',
        { default: ['static-field', 'instance-field', 'static-method', 'instance-method'] }
      ],
      'playwright/no-skipped-test': 'warn',
      'playwright/expect-expect': 'off'
    }
  },
  {
    ignores: ['test-results/', 'playwright-report/', 'node_modules/', 'dist/']
  }
);
