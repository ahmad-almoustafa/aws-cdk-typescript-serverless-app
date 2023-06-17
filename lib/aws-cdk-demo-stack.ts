import * as cdk from 'aws-cdk-lib';
import { Duration } from 'aws-cdk-lib';
import { CfnBackupPlan } from 'aws-cdk-lib/aws-backup';
import { Bucket, CfnBucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

//if you want to use a construct beyond the Level 1 and Level 2 => you need to define and implement your own custom Level 3 construct 
export class customL3Bucket extends Construct {
  constructor(scope: Construct, id: string, expirationInDays: number) {
    super(scope, id);
    new CfnBucket(this, id, {
      bucketName: id.toLowerCase(),//Bucket name should not contain uppercase characters
      lifecycleConfiguration: {
        rules: [{
          expirationInDays: expirationInDays,
          status: 'Enabled',
        }]
      }
    });
  }

}
export class AwsCdkDemoStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    /**
     * level 1 construct 
     * lower level => more flexibility and control
     * directly represents the AWS CloudFormation resource type AWS::S3::Bucket => one-to-one mapping
     * explicitly define all the properties and their corresponding CloudFormation attributes.
     */
    new CfnBucket(this, 'AWS-CDK-L1-Bucket', {
      bucketName: 'aws-cdk-l1-bucket',
      lifecycleConfiguration: {
        rules: [{
          expirationInDays: 1,
          status: 'Enabled',
        }]
      }
    });

    /**
     * CfnParameter is a construct that represents a CloudFormation parameter 
     * These parameters can be passed during the deployment=>e.g 'cdk deploy --parameters duration=4'
     */
    const duration= new cdk.CfnParameter(this, 'duration', {
      default:1,
      type: 'Number',
    });
    /**
     * level 2 construct 
     * higher level => more  abstracted and developer-friendly 
     * It abstracts away many of the low-level details and provides simplified methods and properties for common bucket configurations.
     * used for most S3 bucket scenarios
     */
    const l2Bucket=new Bucket(this, 'AWS-CDK-L2-Bucket', {
      bucketName: 'aws-cdk-l2-bucket',
      lifecycleRules: [{
        expiration: Duration.days(duration.valueAsNumber),
      }]
    })

    // define CloudFormation output => will be shown in the CloudFormation output section + will be logged on the app local console
    new cdk.CfnOutput(this, 'L2BucketName', {
      value: l2Bucket.bucketName,
    })



    //level 3 construct => define your own
    const l3Bucket = new customL3Bucket(this, 'AWS-CDK-L3-Bucket', 1);

  }


}
