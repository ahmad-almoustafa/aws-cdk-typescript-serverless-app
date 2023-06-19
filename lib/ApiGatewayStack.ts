import * as cdk from 'aws-cdk-lib'
import { LambdaRestApi } from "aws-cdk-lib/aws-apigateway";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";

interface ApiGatewayStackProps extends cdk.StackProps{
    lambdaHandler: NodejsFunction;
}
export class ApiGatewayStack extends cdk.Stack{
    constructor(scope: Construct, id: string, props: ApiGatewayStackProps) {
        super(scope, id, props);

        // Create API Gateway
        // LambdaRestApi => higher-level abstraction that automatically sets up the API Gateway with a Lambda proxy integration
        const api = new LambdaRestApi(this, 'SampleApi', {
            handler: props.lambdaHandler,
            proxy: false, // Set to true if you want to use proxy integration
        });
      
        // Create a resource and method
        const helloResource = api.root.addResource('hello');
        helloResource.addMethod('GET');
    }

}