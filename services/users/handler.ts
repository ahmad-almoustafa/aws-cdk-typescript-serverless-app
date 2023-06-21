import { Handler } from "aws-cdk-lib/aws-lambda";
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda"

/**
 * In AWS Lambda, the event and context parameters are automatically provided by the Lambda service when your function is invoked. 
 * event=> contain information about the event that triggered the Lambda function
 * context=> runtime context in which the function is executed.
 * 
 * npm i -D @types/aws-lambda // to install types
 * APIGatewayProxyEvent: specific event object structure expected from API Gateway.
 * Context: represents the Lambda execution context.
 * 
 * handle external libraries
 *  npm i uuid @types/uuid // to install uuid
 * 
 * Lambda Architecture:
 * Group by API Gateway resource => each resource has a Lambda function that handle all the methods(GET,POST,..etc)
 * 
 */
import { v4 } from 'uuid';
import { listBucketsSDK3 } from "../SDKDemo";

export const handler=async (event:APIGatewayProxyEvent, context:Context) :Promise<APIGatewayProxyResult> =>{
    let message:string='';
    const bucketList=await listBucketsSDK3();
    switch(event.httpMethod){
        case 'GET':
            message=`Hello from GET, dynamoDBTable: ${process.env.dynamoDBTable}, uuid id:  ${v4()}, buckets list: ${JSON.stringify(bucketList)}`;
        break;
        case 'POST':
            message=`Hello from POST, dynamoDBTable: ${process.env.dynamoDBTable}, uuid id:  ${v4()}`;

        break;
    }
    
    const response: APIGatewayProxyResult={
        statusCode:200,
        body:JSON.stringify(message)
    }
    //log to cloudwatch
    console.log(event);
    return response;
}