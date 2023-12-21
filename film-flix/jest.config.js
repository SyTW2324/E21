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
    "moduleNameMapper": {
        "\\.(css|less|scss|sass)$": "identity-obj-proxy",
        '\\.(jpg|jpeg|png|gif|svg|ico)$': 'identity-obj-proxy'
    },
    "coverageThreshold": {
        "global": {
          "branches": 80,
          "functions": 80,
          "lines": 80,
          "statements": 80
        }
      },
};