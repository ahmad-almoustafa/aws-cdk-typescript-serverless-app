import * as cdk from "aws-cdk-lib";
import { Stack, StackProps } from "aws-cdk-lib";
import { AttributeType, Table } from "aws-cdk-lib/aws-dynamodb";
import { Construct } from "constructs";

export class DynamoDBStack extends Stack{
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);
        // Create a DynamoDB table
        new Table(this, 'Users', {
             partitionKey: { name: 'id', type:AttributeType.STRING },
            tableName: 'Users',
            /**
             * DESTROY: The resource will be deleted when the stack is deleted or updated.
             * You can modify the removal policy as per your requirements - default is RETAIN
             */
            removalPolicy: cdk.RemovalPolicy.DESTROY
        })
    }
}