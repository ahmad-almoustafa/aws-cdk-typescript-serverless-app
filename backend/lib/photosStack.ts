
import * as cdk from 'aws-cdk-lib';
import { AnyPrincipal, Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { Bucket, HttpMethods, IBucket, ObjectOwnership } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

export class PhotosStack extends cdk.Stack{
    public readonly photosBucket:IBucket;
    constructor(score: Construct, id: string, props?: cdk.StackProps){
        super(score, id, props);

        /**
     
         */
        this.photosBucket=new Bucket(this, 'productPhotosBucket', {
            bucketName: 'product-photos-bucket-demo',
            removalPolicy: cdk.RemovalPolicy.DESTROY,

            cors: [
                {
                allowedMethods: [
                    HttpMethods.HEAD,
                    HttpMethods.GET,
                    HttpMethods.PUT,
                ], // Specify the allowed HTTP methods
                allowedOrigins: ['*'], // Add your allowed origins here 
                allowedHeaders: ['*'], // Allow all headers or specify your desired headers
                },
            ],
            objectOwnership: ObjectOwnership.OBJECT_WRITER,//the bucket owner owns the objects, and the objects can't be overwritten or deleted by any other AWS account.
            //Objects can be public,  Block all public access =>Off
            blockPublicAccess: {
                blockPublicAcls: false,
                blockPublicPolicy: false,
                ignorePublicAcls: false,
                restrictPublicBuckets: false
            }
        })

        new cdk.CfnOutput(this, 'productPhotosBucketName', {
            value: this.photosBucket.bucketName
        });
    }
}