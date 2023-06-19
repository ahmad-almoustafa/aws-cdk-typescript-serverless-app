import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"

/**
 * In AWS Lambda, the event and context parameters are automatically provided by the Lambda service when your function is invoked. 
 * event=> contain information about the event that triggered the Lambda function
 * context=> runtime context in which the function is executed.
 * 
 * npm i -D @types/aws-lambda // to install types
 * APIGatewayProxyEvent: specific event object structure expected from API Gateway.
 */
exports.handler=async (event:APIGatewayProxyEvent, context:APIGatewayProxyResult)=>{
    
    return {
        statusCode:200,
        body:JSON.stringify('Hello From Lambda!')
    }
}