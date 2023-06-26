import * as cdk from 'aws-cdk-lib'
import * as Lambda from 'aws-cdk-lib/aws-lambda';

import { Construct } from 'constructs';

//extends the cdk.StackProps  to pass targetBucketArn
interface PhotosHandlerStackProps extends cdk.StackProps {
    targetBucketArn: string;
}
export class PhotosHandlerStack extends cdk.Stack {
    constructor(scope:Construct, id:string, props: PhotosHandlerStackProps) {
        super(scope, id, props);

        /**
         * Lambda.Function 
         * generic representation of an AWS Lambda function
         * Supports multiple programming languages and runtime environments.
         */
        new Lambda.Function(this, 'PhotosHandler',{
            runtime: Lambda.Runtime.NODEJS_18_X,
            handler: 'index.handler',//name of the file and the function that should be executed => expects an 'index.js'  with an exported function named 'handler'.
            /**
             * In the Node.js runtime, exports.handler is a convention used by AWS Lambda to identify the entry point for your Lambda function. 
             * multi-line string (template literal) => use backticks (` `)
             */
            code:Lambda.Code.fromInline(`
                exports.handler=async(event)=>{
                    console.log("Target Bucket is: " + process.env.TARGET_BUCKET)
                };
            `),
            environment: {
                TARGET_BUCKET: props.targetBucketArn,
            },
        })

    }
}