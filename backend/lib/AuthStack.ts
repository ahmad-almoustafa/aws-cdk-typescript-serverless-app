import { CfnOutput, Stack, StackProps } from "aws-cdk-lib";
import { UserPool, UserPoolClient } from "aws-cdk-lib/aws-cognito";
import { Construct } from "constructs";
export class AuthStack extends Stack{
    private userPool:UserPool;
    private userPoolClient:UserPoolClient;

    constructor(scope:Construct, id:string, props?:StackProps) {
        super(scope, id, props);
        this.createUserPool();
        this.createUserPoolClient();
    }
    
    private createUserPool(){
         this.userPool=new UserPool(this, 'ProductUserPool', {
            userPoolName:'ProductUserPool',
            selfSignUpEnabled:true,
            signInAliases: {
                username: true,
                email: true
            }
        })
        // Output the User Pool ID
        new CfnOutput(this, 'ProductUserPoolId', {
            value:this.userPool.userPoolId
        })
    }

    private createUserPoolClient(){   
        this.userPoolClient= this.userPool.addClient('ProductUserPoolClient', {
            userPoolClientName:'ProductUserPoolClient',
            authFlows: {
                adminUserPassword: true,
                custom: true,
                userPassword: true,
                userSrp: true
            }
        });
        // Output the User Pool Client ID
        new CfnOutput(this, 'ProductUserPoolClientId', {
            value:this.userPoolClient.userPoolClientId
        })

    }
}
