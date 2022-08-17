import type {Config} from '@jest/types';
import {config} from '@audio-analysis/config/jest.config';
 
export default async (): Promise<Config.InitialOptions> => {
    return await config();
};

process.env = Object.assign(process.env, {
    ENVIRONMENT: 'test'
});
