import type {Config} from '@jest/types';

export const config = async (): Promise<Config.InitialOptions> => {
    return {
        verbose: true,
        clearMocks: true,
        resetMocks: true,
        maxWorkers: 1,
        preset: 'ts-jest',
        testEnvironment: 'node',
        moduleNameMapper: {
            '^lodash-es$': 'lodash',
        },
        moduleDirectories: [
            'node_modules/',
            '../../node_modules/'
        ],
        moduleFileExtensions: [
            'js',
            'ts',
            'json'
        ],
        modulePathIgnorePatterns: [
            '.serverless/',
        ],
        collectCoverageFrom: [
            'src/**/*'
        ],
        coveragePathIgnorePatterns: [
            '/node_modules/',
            '.serverless/',
        ],
        testMatch: [
            '**/test/**/*.+(ts)',
            '**/?(*.)+(test).+(ts)'
        ],
        transform: {
            '^.+\\.(ts)$': 'ts-jest',
        },
        globals: {
            'ts-jest': {
                diagnostics: true,
                tsconfig: '../../tsconfig.json',
            },
        },
    };
};
