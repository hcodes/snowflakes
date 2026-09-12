export default {
    testEnvironment: 'node',
    testMatch: ['<rootDir>/tests/**/*.test.ts'],
    transform: {
        '^.+\\.tsx?$': ['ts-jest', { tsconfig: '<rootDir>/tests/tsconfig.json' }],
    },
};
