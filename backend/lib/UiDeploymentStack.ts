import { CfnOutput, RemovalPolicy, Stack, StackProps } from "aws-cdk-lib";
import { Distribution, OriginAccessIdentity } from "aws-cdk-lib/aws-cloudfront";
import { S3Origin } from "aws-cdk-lib/aws-cloudfront-origins";
import { Bucket, BucketAccessControl, IBucket } from "aws-cdk-lib/aws-s3";
import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment";
import { Construct } from "constructs";
interface UiDeploymentStackProps extends StackProps {
    frontendFolderPath: string;
}
export class UiDeploymentStack extends Stack {
    constructor(scope:Construct, id:string, props:UiDeploymentStackProps) {
        super(scope, id, props);

        // Create an S3 bucket
        const deploymentBucket=new Bucket(this, 'UiDeploymentBucket', {
            bucketName: 'product-frontend-bucket',
            // removalPolicy: RemovalPolicy.DESTROY,
            // accessControl: BucketAccessControl.PUBLIC_READ, // allow public read access
            // websiteIndexDocument: "index.html", // Specify the index document for the website

        })
   
        // Define the deployment action using BucketDeployment
        new BucketDeployment(this, 'ProductFrontend', {
            sources: [Source.asset(props.frontendFolderPath)],
            destinationBucket: deploymentBucket,
        })

        // Create cloud front distribution
        const originIdentity = new OriginAccessIdentity(this, 'OriginAccessIdentity');
        deploymentBucket.grantRead(originIdentity);
        const distribution = new Distribution(this, 'ProductDistribution', {
            defaultRootObject: 'index.html',
            defaultBehavior: {
                origin: new S3Origin(deploymentBucket, {
                    originAccessIdentity: originIdentity
                })
            }
        });


        new CfnOutput(this, 'ProductFrontendURL', {
            value: distribution.distributionDomainName
        })
    }
}