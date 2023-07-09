import { Amplify,Auth } from 'aws-amplify';
import {AuthStack} from './../../../backend/outputs.json'; // import from cloud formation exported outputs
import { type CognitoUser } from '@aws-amplify/auth';
import { CognitoIdentityClient } from '@aws-sdk/client-cognito-identity';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-providers';



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
    private jwtIdToken:string|undefined;
    private temporaryCredentials:object|undefined|null;
   
    //login('test_user_name','Mki9!1wY2Hn');
    public async login(username: string, password: string): Promise<object| undefined>{
        this.user= await Auth.signIn(username, password) as CognitoUser;
        this.jwtIdToken= this.user.getSignInUserSession()?.getIdToken().getJwtToken();
        return  this.user;
    }
    public  getProfileName():string|undefined{
        return this.user?.getUsername();
    }
   
   public async getTemporaryCredentials(){
        //lazy initializing => if it's already defined return nit otherwise generate it
        if(this.temporaryCredentials){
            return this.temporaryCredentials;
        }else{
            this.temporaryCredentials= await this.generateTemporaryCredentials();
            return this.temporaryCredentials;
        }
   }
    public async generateTemporaryCredentials(){    
        if(this.jwtIdToken ){
            const cognitoIdentityPool = `cognito-idp.${awsRegion}.amazonaws.com/${AuthStack.ProductUserPoolId}`;
            const identityClient=new CognitoIdentityClient({
                 credentials: fromCognitoIdentityPool({
                    clientConfig: {
                        region: awsRegion
                    },
                    identityPoolId:AuthStack.ProductIdentityPoolId,
                    logins: {
                        [cognitoIdentityPool]: this.jwtIdToken
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