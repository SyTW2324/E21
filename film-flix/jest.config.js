// jest.config.js
export default {
    setupFilesAfterEnv: ['./src/setupTests.ts'],
    testEnvironment: 'node',
    roots: ['./src'],
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
    moduleDirectories: ["node_modules", "src"],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node', 'lcov', 'clover', 'text'],
    testRetry: 3,
    "moduleNameMapper": {
        "\\.(css|less|scss|sass)$": "identity-obj-proxy",
        '\\.(jpg|jpeg|png|gif|svg|ico)$': 'identity-obj-proxy'
    },
    "collectCoverage": true,
    "coverageReporters": ["lcov"],
    "collectCoverageFrom": [
        "src/**/*.{js,jsx,ts,tsx}",
        "!src/**/*.test.{js,jsx,ts,tsx}"
    ],
    "coverageThreshold": {
        "global": {
          "branches": 10,
          "functions": 10,
          "lines": 10,
          "statements": 10
        }
      },
};