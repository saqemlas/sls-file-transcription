import AWSXRay from 'aws-xray-sdk-core';
import {EnvironmentVars} from '../environmentVars';
import {Client} from '@aws-sdk/smithy-client';

declare const process: EnvironmentVars;

const tracedEnvs = ['prod', 'staging', 'test'];

export const xray = <T extends Client<any, any, any, any>>(service: T): Client<any, any, any, any> => {
    if (process.env.IS_LOCAL || tracedEnvs.includes(process.env.ENVIRONMENT!)) {
        return service;
    } else {
        return AWSXRay.captureAWSv3Client(service);
    }
};
