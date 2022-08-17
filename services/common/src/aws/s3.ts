import {xray} from './xray';
import {S3Client} from '@aws-sdk/client-s3';
import {EnvironmentVars} from '@audio-analysis/common/src/environmentVars';

declare const process: EnvironmentVars;

export const s3client: S3Client = xray(new S3Client({region: process.env.REGION || ''}));
