export default {
    type: 'module',
    
    testEnvironment: 'node',
    
    testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'],
    
    collectCoverage: true,
    coverageDirectory: 'coverage',
    collectCoverageFrom: [
        'src/**/*.js',
        '!src/database/**',
        '!src/middlewares/**',
        '!**/node_modules/**'
    ],
    
    coverageThreshold: {
        global: {
            branches: 20,
            functions: 20,
            lines: 20,
            statements: 20
        }
    },
    
    coverageReporters: ['text', 'lcov', 'clover', 'html'],
    
    transform: {
        '^.+\\.js$': 'babel-jest'
    },
    
    modulePathIgnorePatterns: ['<rootDir>/dist/'],
    
    testTimeout: 10000
}; 