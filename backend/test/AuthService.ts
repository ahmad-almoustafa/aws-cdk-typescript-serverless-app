import { Amplify, Auth } from "aws-amplify";
import { type CognitoUser } from '@aws-amplify/auth';
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";

const awsRegion='ap-southeast-2';
const userPoolId='ap-southeast-2_c4vYDSoCh';
const identityPoolId='ap-southeast-2:6c1fdba8-5061-43be-87ce-3e7f591330e3';
const userPoolWebClientId= 'e5sb90nka10pkfkmuglfcebl';
Amplify.configure({
    Auth: {
        region: awsRegion,
        userPoolId: userPoolId,
        identityPoolId:identityPoolId,
        userPoolWebClientId: userPoolWebClientId,
        authenticationFlowType: 'USER_PASSWORD_AUTH'

    }
});   

/**
 * The follow:
 * 1- Set up a Cognito User Pool
 * 2- Set up a Cognito Identity Pool, create and attach IAM roles
 * 3- Authenticate the user (username and password)  using CUP 
 * 4- Upon successful authentication => the Cognito User Pool will provide an ID token and an access token
 * 5- Use the ID token to obtain temporary AWS credentials from the Cognito Identity Pool
 */
export class AuthService{

    public async login(username:string, password:string)
    {
        const result=  await Auth.signIn(username, password) as CognitoUser;
        return result;
    }

    public async generateTemporaryCredentials(user: CognitoUser){
        // obtained the ID token from the Cognito User Pool user
        const jwtIdToken=user.getSignInUserSession()?.getIdToken().getJwtToken();
        if(jwtIdToken ){
            const cognitoIdentityPool = `cognito-idp.${awsRegion}.amazonaws.com/${userPoolId}`;
            const identityClient=new CognitoIdentityClient({
                 credentials: fromCognitoIdentityPool({
                    identityPoolId:identityPoolId,
                    logins: {
                        [cognitoIdentityPool]: jwtIdToken
                    } 
                })
            });
            const credentials = await identityClient.config.credentials();
            return credentials;
        }else{
            return null;
        }
 
    }
}



