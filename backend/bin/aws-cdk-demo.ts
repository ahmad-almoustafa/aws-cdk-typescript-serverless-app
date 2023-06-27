#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { AwsCdkDemoStack } from '../lib/aws-cdk-demo-stack';
import { PhotosStack } from '../lib/photos-stack';
import { PhotosHandlerStack } from '../lib/photos-handler-stack';
import { BucketTagger } from './Tagger';
import { LambdaStack } from '../lib/LambdaStack';
import { ApiGatewayStack } from '../lib/ApiGatewayStack';
import { DynamoDBStack } from '../lib/DynamoDBStack';
import { AuthStack } from '../lib/AuthStack';
/**
 * if the app has multiple stacks => 
 * `cdk deploy --all` => deploy all => order is based on the dependency 
 * `cdk deploy PhotosStack` => specify which stacks to use 
 */
const app = new cdk.App();

// new AwsCdkDemoStack(app, 'AwsCdkDemoStack');
// const photosStack= new PhotosStack(app, 'PhotosStack');
// // dependency between stacks => pass photoBucketArn from PhotosStack to PhotosHandlerStack
// new PhotosHandlerStack(app, 'PhotosHandlerStack', { targetBucketArn:photosStack.photoBucketArn});

// // Retrieve the aspect collection from the app
// const aspects=cdk.Aspects.of(app);
// // Apply the BucketTagger aspect
// aspects.add(new BucketTagger({ 'Owner': 'Ahmad', 'key2':'val2' }));

const dynamoDBTable= new DynamoDBStack(app, 'DynamoDBStack');
const lambdaStack= new LambdaStack(app, 'LambdaStack',{dynamoDBTable:dynamoDBTable.table});
const authStack=new AuthStack(app, 'AuthStack');
new ApiGatewayStack(app, 'ApiGatewayStack', { lambdaHandler: lambdaStack.lambdaHandler, userPool:authStack.userPool});



