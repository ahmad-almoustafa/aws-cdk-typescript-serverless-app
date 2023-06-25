import { DynamoDBClient, UpdateItemCommand } from "@aws-sdk/client-dynamodb"
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"

export const updateUser= async (event: APIGatewayProxyEvent, dynamoDBClient: DynamoDBClient): Promise<APIGatewayProxyResult> => {
    const id  = event.queryStringParameters?.id;
    if(process.env.dynamoDBTable && event.body && id){// all args are provided
        const item = JSON.parse(event.body)
        const params = {
            TableName: process.env.dynamoDBTable,
            Key:   { id: { S: id } }, //Key is capitalized
            /**
             * specifies the update operation to be performed on the item.
             * In this case, it uses the SET action to update the attributes firstName and lastName.
             * :firstName and :lastName are placeholders for the actual values to be updated,
             * and they will be replaced with the corresponding values in the ExpressionAttributeValues object.
             */
            UpdateExpression: "SET firstName = :firstName, lastName = :lastName", // Update expression
            /**
             * provides the actual values to be substituted in the UpdateExpression.
             */
            ExpressionAttributeValues: {
              ":firstName": { S: item.firstName }, // Attribute values in the update expression
              ":lastName": { S: item.lastName },
            },
            /**
             * UpdateItem operation determines which attributes of the item should be returned as the result of the update.
             * "ALL_NEW" =>response will include all attributes of the item after the update.
             * "UPDATED_NEW"=> response will include only the attributes that were modified by the update.
             */
            ReturnValues: "ALL_NEW", // Return the updated item
        }
        const updateItemCommand = new UpdateItemCommand(params)
        const response = await dynamoDBClient.send(updateItemCommand)
        console.log('response', response)
        // Map the response to APIGatewayProxyResult format
        return {
            statusCode: 204,
            body: JSON.stringify(response.Attributes)// Return the updated item's attributes
        };
     
    }
    return {
        statusCode: 404,
        body: JSON.stringify('Not Found'),
    };
}