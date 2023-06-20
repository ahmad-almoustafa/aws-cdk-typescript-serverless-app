import { Stack, StackProps } from "aws-cdk-lib";
import { ITable } from "aws-cdk-lib/aws-dynamodb";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import { join } from "path";

interface LambdaStackProps extends StackProps{
    dynamoDBTable: ITable;
}
export class LambdaStack extends Stack {
    public readonly lambdaHandler;
    constructor(scope: Construct, id: string, props: LambdaStackProps) {
        super(scope, id, props);
        /**
         * NodejsFunction from Lambda Node.js Library
         * specifically designed to simplify the creation of Node.js Lambda functions
         * Automatically sets the runtime and handler 
         */
        this.lambdaHandler= new NodejsFunction(this, 'HelloLambda', {
            runtime:Runtime.NODEJS_18_X,//default 16.x
            handler:'handler',//default index.handler
            entry:join(__dirname, '..', 'services', 'hello.ts'),
            environment: {
                dynamoDBTable:props.dynamoDBTable.tableName,
            }
        });
    }
}