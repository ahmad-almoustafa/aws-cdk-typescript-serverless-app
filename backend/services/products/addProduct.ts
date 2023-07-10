
import { AttributeValue, DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { v4 } from "uuid";
export const addProduct=async (event:APIGatewayProxyEvent, dynamoDBClient:DynamoDBClient):Promise<APIGatewayProxyResult>=>{
    const randomId=v4();
    if( event.body && process.env.dynamoDBTable ){
        const item=JSON.parse(event.body);
        item.id=randomId;
        
        /**
         * Convert the item to DynamoDB attribute values
         * Record<K, T>: Typescript utility type =>
         * Creates an object type where the keys are of type K and the values are of type T.
         * {S:item.name}=><K,T> 
         * */ 
        let marshalledItem: Record<string, AttributeValue> = {};
        Object.entries(item).forEach(([key, value]) => {
            marshalledItem[key] = marshall(value);
          });
        const params={
            TableName: process.env.dynamoDBTable,        
            /**
             * SDK 3 and typescript you need to specify the data types of attribute values.
             * by default the created DynamoDB table would have Partition key(id:String) => Item must include id
             */
            Item:marshalledItem,
        }

        const command= new PutItemCommand(params);
        const  response = await dynamoDBClient.send(command);
        console.log('response',response);

    }
    return {
        statusCode: 201,
        body: JSON.stringify({message: 'Item Added' , id: randomId})
    }

};