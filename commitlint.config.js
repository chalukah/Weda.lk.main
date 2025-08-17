export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      1, // Changed from 2 (error) to 1 (warning)
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'build',
        'ci',
        'chore',
        'revert',
        'update', // Added common variations
        'add',
        'remove',
        'change',
        'wip', // work in progress
      ],
    ],
    'subject-case': [1, 'never', ['sentence-case', 'start-case', 'pascal-case']], // Changed to warning
    'type-empty': [0], // Disabled
    'subject-empty': [0], // Disabled
  },
}
