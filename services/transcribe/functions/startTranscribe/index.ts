import {Context} from 'aws-lambda/handler';
import {S3CreateEvent} from 'aws-lambda/trigger/s3';
import {logger, setupLogger} from '@audio-analysis/common/src/logger/logger';
import {EnvironmentVars} from '@audio-analysis/common/src/environmentVars';
import {transcribeclient} from '@audio-analysis/common/src/aws/transcribe';
import {StartTranscriptionJobCommand, StartTranscriptionJobCommandInput} from '@aws-sdk/client-transcribe';

declare const process: EnvironmentVars;

const outputBucketName = process.env.BUCKET_NAME || '';

export const handler = async (event: S3CreateEvent, context?: Context): Promise<void> => {
    setupLogger(context);
    logger.info('Event', {event});

    const bucket = event.Records[0]?.s3.bucket.name;
    const key = event.Records[0]?.s3.object.key;
    const fileFormat = event.Records[0]?.s3.object.key.split('.')[1];
    const jobName = `test-${new Date().valueOf()}`;

    if (!bucket || !key || !fileFormat){
        logger.error('bucket or key not included in event');
        return;
    }

    const input: StartTranscriptionJobCommandInput = {
        TranscriptionJobName: jobName,
        LanguageCode: 'en-GB',
        MediaFormat: fileFormat,
        Media: {
            MediaFileUri: `s3://${bucket}/${key}`,
        },
        OutputBucketName: outputBucketName,
        OutputKey: 'text/',
        Settings: {
            MaxSpeakerLabels: 2,
            ShowSpeakerLabels: true,
            MaxAlternatives: 2,
            ShowAlternatives: true,
        },
    };
    
    try {
        await transcribeclient.send(new StartTranscriptionJobCommand(input));
        return;
    } catch(error) {
        logger.error(`Unable to start transcription job ${jobName}`, {error});
        throw new Error('Could not start transcription!');
    }
};
