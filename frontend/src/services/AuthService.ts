import { Amplify,Auth } from 'aws-amplify';
import {AuthStack} from './../../../backend/outputs.json'; // import from cloud formation exported outputs
import { type CognitoUser } from '@aws-amplify/auth';



const awsRegion='ap-southeast-2';
Amplify.configure({
    Auth: {
        region: awsRegion,
        userPoolId: AuthStack.ProductUserPoolId,
        identityPoolId: AuthStack.ProductIdentityPoolId,
        userPoolWebClientId: AuthStack.ProductUserPoolClientId,
        authenticationFlowType: 'USER_PASSWORD_AUTH'

    }
});  
export class AuthService{
    private user: CognitoUser | undefined;
    //login('test_user_name','Mki9!1wY2Hn');
    public async login(username: string, password: string): Promise<object| undefined>{
        this.user= await Auth.signIn(username, password) as CognitoUser;
        return  this.user;
    }
    public  getProfileName():string|undefined{
        return this.user?.getUsername();
    }
}