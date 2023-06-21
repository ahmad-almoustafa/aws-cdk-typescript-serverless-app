/**
 * npm i aws-sdk  // default sdk version 2
 * 
 * follows the service-client model=>  each AWS service has its own client class (e.g., new AWS.S3(), new AWS.DynamoDB()).
 * 
 */
import * as AWS from 'aws-sdk';
import { ListBucketsOutput } from 'aws-sdk/clients/s3';
export const listBucketsSDK2= async () :Promise<ListBucketsOutput>=>{
    const s3Client = new AWS.S3();
    const bucketList= s3Client.listBuckets().promise();
    return bucketList;
}

