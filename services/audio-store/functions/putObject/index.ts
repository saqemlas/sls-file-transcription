import {Context} from 'aws-lambda/handler';
import {APIGatewayProxyEventV2, APIGatewayProxyStructuredResultV2} from 'aws-lambda/trigger/api-gateway-proxy';
import {PutObjectCommandInput, PutObjectCommand} from '@aws-sdk/client-s3';
import {getSignedUrl} from '@aws-sdk/s3-request-presigner';
import {s3client} from '@audio-analysis/common/src/aws/s3';
import {logger} from '@audio-analysis/common/src/logger/logger';
import {EnvironmentVars} from '@audio-analysis/common/src/environmentVars';

declare const process: EnvironmentVars;

const bucketName: string = process.env.BUCKET_NAME || '';
const bucketKey = 'aws-logo2.png';

export const handler = async (event: APIGatewayProxyEventV2, context?: Context): Promise<APIGatewayProxyStructuredResultV2> => {
    logger.info('Event', {event});
    const {requestContext, headers} = event;

    const getObjectInput: PutObjectCommandInput = {
        Bucket: bucketName,
        Key: bucketKey
    };

    const getObjectCommand: PutObjectCommand = new PutObjectCommand(getObjectInput);

    const url: string = await getSignedUrl(s3client, getObjectCommand, {expiresIn: 7200});

    return {
        statusCode: 200,
        ...headers,
        body: JSON.stringify({
            id: requestContext.requestId,
            presignedurl: url
        })
    };
};
