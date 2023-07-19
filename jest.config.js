module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!<rootDir>/src/main/**/*',
    '!**/*.d.ts',
    '!<rootDir>/src/domain/usecases/index.ts',
    '!<rootDir>/src/domain/models/index.ts',
    '!<rootDir>/src/presentation/pages/index.ts',
    '!<rootDir>/src/presentation/components/router/index.tsx'
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  transform: {
    '.+\\.(ts|tsx)$': 'ts-jest'
  },
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
    '\\.scss$': 'identity-obj-proxy'
  }
}
