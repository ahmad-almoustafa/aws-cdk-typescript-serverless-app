import { DynamoDBClient, GetItemCommand, ScanCommand } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { unmarshall } from "@aws-sdk/util-dynamodb";
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
            // Unmarshaling: Convert DynamoDB attribute values to JavaScript object
            const unmashalledItem = unmarshall(response.Item)
            // Map the response to APIGatewayProxyResult format
            return {
                statusCode: 200,
                body: JSON.stringify(unmashalledItem)
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
        // Unmarshaling: Convert DynamoDB attribute values to JavaScript object => for all items
        const unmashalledItems = response.Items?.map(item => unmarshall(item));

        // Map the response to APIGatewayProxyResult format
        return {
            statusCode: 200,
            body: JSON.stringify(unmashalledItems)
        };
    }
}