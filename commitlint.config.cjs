module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum':[
        2,
        'always',
        [
            'ci',        // Continuous Integration configuration and pipeline changes
            'test',      // Adding or updating tests
            'build',     // Build system and dependencies changes
            'chore',     // Maintenance tasks and routine updates
            'docs',      // Documentation updates
            'ticket',    // Changes related to a specific ticket/issue
            'release',   // Release version changes
            'feat',      // New feature implementation
            'fix',       // Bug fix
            'hot-fix',   // Critical production bug fix
            'perf',      // Performance improvements
            'refactor',  // Code refactoring without feature or bug changes
            'revert',    // Reverting previous commits
            'style'      // Code style changes (formatting, semicolons, etc)
        ]
    ],
    'subject-case': [0, 'always'],
    'body-case': [0, 'always'],
    'header-max-length': [0, 'always', -1],
    'footer-max-line-length': [0, 'always', -1]
  },
};
