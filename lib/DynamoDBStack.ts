import * as cdk from "aws-cdk-lib";
import { Stack, StackProps } from "aws-cdk-lib";
import { AttributeType, ITable, Table } from "aws-cdk-lib/aws-dynamodb";
import { Construct } from "constructs";

export class DynamoDBStack extends Stack{
    public readonly table:ITable;
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);
        // Create a DynamoDB table
        this.table= new Table(this, 'Products', {
             partitionKey: { name: 'id', type:AttributeType.STRING },
            tableName: 'Products',
            /**
             * DESTROY: The resource will be deleted when the stack is deleted or updated.
             * You can modify the removal policy as per your requirements - default is RETAIN
             */
            removalPolicy: cdk.RemovalPolicy.DESTROY
        })
    }
}