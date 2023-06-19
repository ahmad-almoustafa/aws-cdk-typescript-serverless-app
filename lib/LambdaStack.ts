import { Stack, StackProps } from "aws-cdk-lib";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import { join } from "path";

export class LambdaStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);
        /**
         * NodejsFunction
         * specifically designed to simplify the creation of Node.js Lambda functions
         * Automatically sets the runtime and handler 
         */
        new NodejsFunction(this, 'HelloLambda', {
            runtime:Runtime.NODEJS_18_X,//default 16.x
            handler:'handler',//default index.handler
            entry:join(__dirname, '..', 'services', 'hello.ts')
        });
    }
}