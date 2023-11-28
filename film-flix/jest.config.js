// jest.config.js
export default {
    setupFilesAfterEnv: ['./src/setupTests.ts'],
    testEnvironment: 'node',
    roots: ['./src'],
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    "moduleNameMapper": {
        "\\.(css|less|scss|sass)$": "identity-obj-proxy",
        '\\.(jpg|jpeg|png|gif|svg|ico)$': 'identity-obj-proxy'
    },
};