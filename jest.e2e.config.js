/** @type {import('jest').Config} */
const config = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      tsconfig: 'tsconfig.json',
    }],
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testMatch: ['**/__tests__/e2e/**/*.test.ts'],
  testTimeout: 30000,
  setupFilesAfterEnv: ['<rootDir>/__tests__/e2e/setup.ts'],
}

module.exports = config
