import { Amplify, Auth } from "aws-amplify";
import { type CognitoUser } from '@aws-amplify/auth';

Amplify.configure({
    Auth: {
        region: 'ap-southeast-2',
        userPoolId: 'ap-southeast-2_VGkRejYpD',
        userPoolWebClientId: '2e5uku9jvc98j5tu48nse9q4j4',
    }
});   

export class AuthService{

    public async login(username:string, password:string)
    {
        const result=  await Auth.signIn(username, password);
        return result;
    }
}