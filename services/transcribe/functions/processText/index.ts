import {Context} from 'aws-lambda/handler';
import {S3CreateEvent} from 'aws-lambda/trigger/s3';
import {logger, setupLogger} from '@audio-analysis/common/src/logger/logger';
import {s3client} from '@audio-analysis/common/src/aws/s3';
import {GetObjectCommandInput, GetObjectCommand} from '@aws-sdk/client-s3';
import type {Readable} from 'stream';
import {TranscriptionJobOutput} from './types';

export const handler = async (event: S3CreateEvent, context?: Context): Promise<void> => {
    setupLogger(context);
    logger.info('Event', {event});

    const bucketName = event.Records[0]?.s3.bucket.name;
    const keyName = event.Records[0]?.s3.object.key;

    if (!bucketName || !keyName){
        logger.error('bucket or key not included in event');
        return;
    }

    const getObjectInput: GetObjectCommandInput = {
        Bucket: bucketName,
        Key: keyName
    };
    
    try {
        const transcriptionObject = await s3client.send(new GetObjectCommand(getObjectInput));

        const stream = transcriptionObject.Body as Readable

        const buffer: Buffer = await readStream(stream);

        const output: TranscriptionJobOutput = JSON.parse(buffer.toString());

        const text = output.results.transcripts[0]?.transcript;

        if (!text) {
            logger.error('Transcript not included in Job', {output});
            throw new Error('Transcription Job does not include output!');
        }

        logger.info('output', {output: text});
    } catch(error) {
        logger.error(`Unable to get key ${keyName} from bucket ${bucketName}`, {error});
        throw new Error('Could not get object from s3!');
    }


    // TODO

};

const readStream = (file: Readable): Promise<Buffer> => {
    return new Promise<Buffer>((resolve, reject) => {
        const chunks: Buffer[] = [];
        file.on('data', (chunk: Buffer) => chunks.push(chunk));
        file.once('end', () => resolve(Buffer.concat(chunks)));
        file.once('error', reject);
    });
};
