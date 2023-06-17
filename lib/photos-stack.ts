
import * as cdk from 'aws-cdk-lib';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

export class PhotosStack extends cdk.Stack{
    constructor(score: Construct, id: string, props?: cdk.StackProps){
        super(score, id, props);

        new Bucket(this, 'Photos-Bucket', {
            bucketName: 'photos-bucket-demo',
            removalPolicy: cdk.RemovalPolicy.DESTROY,
        })
    }
}