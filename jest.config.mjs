export default {
    testEnvironment: 'node',
    testMatch: [
        '<rootDir>/tests/unit/**/*.test.ts',
        '<rootDir>/tests/integration/**/*.test.ts',
        '<rootDir>/tests/types/**/*.test.ts',
    ],
    transform: {
        '^.+\\.tsx?$': ['ts-jest', { tsconfig: '<rootDir>/tests/tsconfig.json' }],
    },
};
