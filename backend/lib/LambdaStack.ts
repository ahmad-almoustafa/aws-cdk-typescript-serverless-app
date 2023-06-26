import { Stack, StackProps } from "aws-cdk-lib";
import { ITable } from "aws-cdk-lib/aws-dynamodb";
import { Effect, PolicyStatement } from "aws-cdk-lib/aws-iam";
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
        this.lambdaHandler= new NodejsFunction(this, 'ProductsLambda', {
            runtime:Runtime.NODEJS_18_X,//default 16.x
            handler:'handler',//default index.handler
            entry:join(__dirname, '..', 'services','products', 'handler.ts'),
            environment: {
                dynamoDBTable:props.dynamoDBTable.tableName,
            }
        });
        
        // Add permissions for dynamodb:PutItem
        const dynamodbPolicy= new PolicyStatement({
            effect:Effect.ALLOW,
            actions:[
                'dynamodb:PutItem',
                'dynamodb:Scan',
                'dynamodb:GetItem',
                'dynamodb:UpdateItem',
                'dynamodb:DeleteItem'
            ],
            resources:[props.dynamoDBTable.tableArn]//Resource Products must be in ARN format or "*".
        });

        this.lambdaHandler.addToRolePolicy(dynamodbPolicy);

    }
}