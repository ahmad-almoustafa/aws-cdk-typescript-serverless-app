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
import { addProduct } from "./addProduct";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { getTableDescription } from "./getTableDescription";
import { getProducts } from "./getProducts";
import { updateProduct } from "./updateProduct";
import { deleteProduct } from "./deleteProduct";
import { addCorsHeader } from "../Utils";

//DynamoDBClient here so it can be reused in all methods
const dynamoDBClient = new DynamoDBClient({});
export const handler=async (event:APIGatewayProxyEvent, context:Context) :Promise<APIGatewayProxyResult> =>{
    let message:string='';
    let response:APIGatewayProxyResult;
    //get table info
    //await getTableDescription(dynamoDBClient);
    try{
        switch(event.httpMethod){
            case 'GET':
                response=  await getProducts(event,dynamoDBClient);// need to wait to get the response
     
              
            break;
            case 'POST':
                 response=  await addProduct(event,dynamoDBClient);
          
            break;
            case 'PUT':
                response= await  updateProduct(event,dynamoDBClient);
                
            break;
            case 'DELETE':
                response=  await deleteProduct(event,dynamoDBClient);
            
            break;
            default:
                return {
                  statusCode: 404,
                  body: JSON.stringify('Not Found'),
                };
        
        }
           addCorsHeader(response);
           return response;
    }catch( error){
        console.log(error);
        return {
            statusCode:500,
            body:JSON.stringify(error)
        }      
    }
}