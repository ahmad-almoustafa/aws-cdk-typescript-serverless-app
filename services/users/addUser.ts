
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { v4 } from "uuid";
export const addUser=async (event:APIGatewayProxyEvent, dynamoDBClient:DynamoDBClient):Promise<APIGatewayProxyResult>=>{
    const randomId=v4();
    if( event.body && process.env.dynamoDBTable ){
        const Item=JSON.parse(event.body);
        const params={
            TableName: process.env.dynamoDBTable,        
            /**
             * SDK 3 and typescript you need to specify the data types of attribute values.
             * by default the created DynamoDB table would have Partition key(id:String) => Item must include id
             */
            Item:{
                id:{S:randomId},
                firstName: {S:Item.firstName},
                lastName: {S:Item.lastName},
            }
        }

        const command= new PutItemCommand(params);
        const  response = await dynamoDBClient.send(command);
        console.log('response',response);

    }
    return {
        statusCode: 201,
        body: JSON.stringify(`Item Added , id ${randomId}`)
    }

};