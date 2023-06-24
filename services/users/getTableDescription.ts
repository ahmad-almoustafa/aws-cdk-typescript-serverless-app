import { DescribeTableCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";

export const getTableDescription = async ( dynamoDBClient:DynamoDBClient) => {

    if (process.env.dynamoDBTable) {
        // Create the DescribeTable command
        const command = new DescribeTableCommand({TableName: process.env.dynamoDBTable});
        // Send the command to describe the table
        const response = await dynamoDBClient.send(command);
        // Access the TableDescription from the response
        console.log('Table Description:', response.Table);
    }
}