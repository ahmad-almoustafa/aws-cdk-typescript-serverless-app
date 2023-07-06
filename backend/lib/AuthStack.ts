import { CfnOutput, Stack, StackProps } from "aws-cdk-lib";
import { CfnIdentityPool, CfnUserPoolGroup, UserPool, UserPoolClient } from "aws-cdk-lib/aws-cognito";
import { Construct } from "constructs";
export class AuthStack extends Stack{
    public  userPool:UserPool;
    private userPoolClient:UserPoolClient;
    private identityPool:CfnIdentityPool; //no cdk construct yet (IdentityPool) => CfnIdentityPool

    constructor(scope:Construct, id:string, props?:StackProps) {
        super(scope, id, props);
        this.createUserPool();
        this.createUserPoolClient();
        this.createAdminGroup();
        this.createIdentityPool();
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
        // Output the Product User Pool ID
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
        // Output the Product User Pool Client ID
        new CfnOutput(this, 'ProductUserPoolClientId', {
            value:this.userPoolClient.userPoolClientId
        })

    }

    private createAdminGroup(){
        new CfnUserPoolGroup(this, 'Admins', {
            userPoolId:this.userPool.userPoolId,
            groupName:'Admins',
        })

    }
    
    private createIdentityPool(){
        this.identityPool= new CfnIdentityPool(this, 'ProductIdentityPool', {
            allowUnauthenticatedIdentities: true,
            identityPoolName: 'ProductIdentityPool',
            cognitoIdentityProviders: [{
                clientId:this.userPoolClient.userPoolClientId,
                providerName:this.userPool.userPoolProviderName
            }],  

         });

        // Output the Product Identity Pool ID
        new CfnOutput(this, 'ProductIdentityPoolId', {
            value:this.identityPool.ref
        })
    }
}
