// jest.config.js
// eslint-disable-next-line import/no-anonymous-default-export
export default {
    setupFilesAfterEnv: ['./src/setupTests.ts'],
    testEnvironment: 'node',
    roots: ['./src'],
    testPathIgnorePatterns: ['./src/streamingPlatformIcons'],
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
    moduleDirectories: ["node_modules", "src"],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node', 'lcov', 'clover', 'text'],
    testRetry: 3,
    "moduleNameMapper": {
        "\\.(css|less|scss|sass)$": "identity-obj-proxy",
        '\\.(jpg|jpeg|png|gif|svg|ico)$': 'identity-obj-proxy',
        "^src/(.*)$": "<rootDir>/src/$1"
    },
    "collectCoverage": true,
    "coverageReporters": ["lcov"],
    "collectCoverageFrom": [
        "src/**/*.{js,jsx,ts,tsx}",
        "!src/**/*.test.{js,jsx,ts,tsx}",
        "!src/streamingPlatformIcons/HBO.js",
        "!src/streamingPlatformIcons/amazonPrime.js",
        "!src/streamingPlatformIcons/disneyPlus.js",
        "!src/streamingPlatformIcons/hulu.js",
        "!src/streamingPlatformIcons/netflix.js",
        "!src/streamingPlatformIcons/platformLogos.js",
    ],
    "coverageThreshold": {
        "global": {
          "branches": 4,
          "functions": 14,
          "lines": 24,
          "statements": 29
        }
      },
};