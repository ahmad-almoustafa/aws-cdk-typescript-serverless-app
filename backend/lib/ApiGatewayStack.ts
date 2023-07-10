import * as cdk from 'aws-cdk-lib'
import { AuthorizationType, CognitoUserPoolsAuthorizer, Cors, LambdaRestApi, MethodOptions, ResourceOptions } from "aws-cdk-lib/aws-apigateway";
import { IUserPool } from 'aws-cdk-lib/aws-cognito';
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";

interface ApiGatewayStackProps extends cdk.StackProps{
    lambdaHandler: NodejsFunction;
    userPool:IUserPool;
}
export class ApiGatewayStack extends cdk.Stack{
    constructor(scope: Construct, id: string, props: ApiGatewayStackProps) {
        super(scope, id, props);

        // Create API Gateway
        // LambdaRestApi => higher-level abstraction that automatically sets up the API Gateway with a Lambda proxy integration
        const api = new LambdaRestApi(this, 'CdkAppApi', {
            handler: props.lambdaHandler,
            proxy: false, // Set to true if you want to use proxy integration
        });
      
        // Create CognitoUserPoolsAuthorizer and attach it to the API Gateway
        const authorizer=new CognitoUserPoolsAuthorizer(this,'ProductsApiAuthorizer',{ 
            cognitoUserPools:[props.userPool],
            identitySource:'method.request.header.Authorization',

        });
        authorizer._attachToApi(api);

        // Create a MethodOptions object to define the authorization configuration for an API method
        const optionsWithAuth: MethodOptions = {
            authorizationType: AuthorizationType.COGNITO, // Set the authorization type to Cognito
            authorizer: {
            authorizerId: authorizer.authorizerId, // Specify the authorizer ID using the value from the CognitoUserPoolsAuthorizer instance
            },
        };

        // Create a resource and method
        // endpoint e.g: https://nf0181o10e.execute-api.ap-southeast-2.amazonaws.com/prod/hello  
        
        //enable CORS for your API Gateway in CDK, otherwise we'll get cors error when sending request from the frontend app
        const optionsWithCors: ResourceOptions = {
            defaultCorsPreflightOptions: {
                allowOrigins: Cors.ALL_ORIGINS, // Allow requests from any origin
                allowMethods: Cors.ALL_METHODS, // Allow all HTTP methods
                allowHeaders: ['Authorization'], // Allow Authorization header
            }
        }
        const productsResource = api.root.addResource('products', optionsWithCors);//CORS config applied only the products resources

        productsResource.addMethod('GET',undefined,optionsWithAuth);
        productsResource.addMethod('POST',undefined,optionsWithAuth);
        productsResource.addMethod('PUT',undefined,optionsWithAuth);//Don't forget to add the method you need
        productsResource.addMethod('DELETE',undefined,optionsWithAuth);

    }

}