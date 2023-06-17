#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { AwsCdkDemoStack } from '../lib/aws-cdk-demo-stack';
import { PhotosStack } from '../lib/photos-stack';
import { PhotosHandlerStack } from '../lib/photos-handler-stack';

/**
 * if the app has multiple stacks => 
 * `cdk deploy --all` => deploy all => order is based on the dependency 
 * `cdk deploy PhotosStack` => specify which stacks to use 
 */
const app = new cdk.App();
//new AwsCdkDemoStack(app, 'AwsCdkDemoStack');
const photosStack= new PhotosStack(app, 'PhotosStack');
// dependency between stacks => pass photoBucketArn from PhotosStack to PhotosHandlerStack
new PhotosHandlerStack(app, 'PhotosHandlerStack', { targetBucketArn:photosStack.photoBucketArn});