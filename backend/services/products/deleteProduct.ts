import { DeleteItemCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import { hasAdminGroup } from "../Utils";

export const deleteProduct= async (event:APIGatewayEvent,dynamoDBClient:DynamoDBClient):Promise<APIGatewayProxyResult>=>{
   if(!hasAdminGroup(event)){
    return{
        statusCode:401,
        body:JSON.stringify('unauthorized access')
    }
   }
    const id=event.queryStringParameters?.id;
    if(process.env.dynamoDBTable && id){
        const params={
            TableName:process.env.dynamoDBTable,
            Key: {id:{S:id}}
        }
        const deleteItemCommand= new DeleteItemCommand(params)
        const result=await dynamoDBClient.send(deleteItemCommand);
        // Map the response to APIGatewayProxyResult format
        return{
            statusCode:200,
            body:JSON.stringify('Item deleted')
        }
    }
    return {
        statusCode:404,
        body:JSON.stringify('Not Found'),
    }
}