import { DynamoDBClient, GetItemCommand, ScanCommand } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export const getUsers=async (event:APIGatewayProxyEvent,dynamoDBClient:DynamoDBClient):Promise<APIGatewayProxyResult>=>{
    const id  = event.queryStringParameters?.id;
    if(id){// id is provided=> get user by id
        const getItemCommand= new GetItemCommand({
             TableName: process.env.dynamoDBTable,
            Key:{
                id:{S:id}
            }
        })
        const response=await dynamoDBClient.send(getItemCommand);
        console.log('response',response.Item);
        if (response.Item){// item found
            // Map the response to APIGatewayProxyResult format
            return {
                statusCode: 200,
                body: JSON.stringify(response.Item)
            };
        }else{
            return {
                statusCode: 404,
                body: JSON.stringify('Not Found'),
            };
        }

    }else{//get all users 
        const scanCommand= new ScanCommand({
             TableName: process.env.dynamoDBTable
        })
        const response=await dynamoDBClient.send(scanCommand);
        console.log('response',response.Items);
        
        // Map the response to APIGatewayProxyResult format
        return {
            statusCode: 200,
            body: JSON.stringify(response.Items)
        };
    }
}