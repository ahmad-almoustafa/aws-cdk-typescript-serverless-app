/**
 * npm i aws-sdk  // default sdk version 2
 * 
 * follows the service-client model=>  each AWS service has its own client class (e.g., new AWS.S3(), new AWS.DynamoDB()).
 * 
 */
// import * as AWS from 'aws-sdk';
// import { ListBucketsOutput } from 'aws-sdk/clients/s3';
// export const listBucketsSDK2= async () :Promise<ListBucketsOutput>=>{
//     const s3Client = new AWS.S3();
//     const bucketList= s3Client.listBuckets().promise();
//     return bucketList;
// }



/**
 * SDK 3:  modular and service-specific packages
 * npm install @aws-sdk/client-s3
 * uses service-specific client classes with methods directly related to the service (e.g., new S3Client(), new DynamoDBClient()). * 
 */
import { ListBucketsCommand, S3Client } from "@aws-sdk/client-s3";
export const listBucketsSDK3= async () =>{
    const s3Client=new S3Client({});
    const command= new ListBucketsCommand({});
    const response=await s3Client.send(command);
    return response.Buckets;
}