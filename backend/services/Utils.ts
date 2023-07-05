import { APIGatewayEvent } from "aws-lambda"

export const hasAdminGroup=(event:APIGatewayEvent):boolean=>{
    //For Cognito authorizers
    const groups=event.requestContext.authorizer?.claims['cognito:groups'];
    if(groups){
        return groups.includes('Admins');
    }
    return false;
}