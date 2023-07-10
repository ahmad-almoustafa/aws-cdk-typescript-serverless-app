import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda"

export const hasAdminGroup=(event:APIGatewayEvent):boolean=>{
    //For Cognito authorizers
    const groups=event.requestContext.authorizer?.claims['cognito:groups'];
    if(groups){
        return groups.includes('Admins');
    }
    return false;
}


export function addCorsHeader(arg: APIGatewayProxyResult) {
    if(!arg.headers) {
        arg.headers = {}
    }
    arg.headers['Access-Control-Allow-Origin'] = '*';
    arg.headers['Access-Control-Allow-Methods'] = '*';
}