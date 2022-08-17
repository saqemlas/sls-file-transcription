import {xray} from './xray';
import {TranscribeClient} from '@aws-sdk/client-transcribe';
import {EnvironmentVars} from '@audio-analysis/common/src/environmentVars';

declare const process: EnvironmentVars;

export const transcribeclient: TranscribeClient = xray(new TranscribeClient({region: process.env.REGION || ''}));
