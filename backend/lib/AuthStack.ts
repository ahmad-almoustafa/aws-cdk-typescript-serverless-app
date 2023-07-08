import { CfnOutput, Stack, StackProps } from "aws-cdk-lib";
import { CfnIdentityPool, CfnIdentityPoolRoleAttachment, CfnUserPoolGroup, UserPool, UserPoolClient } from "aws-cdk-lib/aws-cognito";
import { Effect, FederatedPrincipal, PolicyStatement, Role } from "aws-cdk-lib/aws-iam";
import { Construct } from "constructs";
export class AuthStack extends Stack{
    public  userPool:UserPool;
    private userPoolClient:UserPoolClient;
    private identityPool:CfnIdentityPool; //no cdk construct yet (IdentityPool) => CfnIdentityPool
    private authenticatedRole:Role;
    private unauthenticatedRole:Role;
    private adminRole:Role;

    constructor(scope:Construct, id:string, props?:StackProps) {
        super(scope, id, props);
        this.createUserPool();
        this.createUserPoolClient();
        this.createAdminGroup();
        this.createIdentityPool();
        this.createRoles();
        this.attachRoles();
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
    
    /**
     * Create IAM roles constructs to be assumed by the identity pool
     * The identity pool uses IAM roles to authorize users to access AWS resources.
     * Cognito Identity Pool => you typically define at least two IAM roles: authenticated/unauthenticated users
     */
    private createRoles(){
        //This role is assumed by the authenticated user=> who have successfully authenticated with the identity provider such as Cognito User Pools
        this.authenticatedRole = new Role(this, 'CognitoDefaultAuthenticatedRole', {
            /**
             * The FederatedPrincipal is used when the IAM role is assumed by an external identity federation service, such as AWS Cognito or an external identity provider like Google, Facebook, or SAML-based providers.
             */
            assumedBy: new FederatedPrincipal('cognito-identity.amazonaws.com', {
                StringEquals: { 'cognito-identity.amazonaws.com:aud': this.identityPool.ref },
                'ForAnyValue:StringLike': { 'cognito-identity.amazonaws.com:amr': 'authenticated' },
            }, 'sts:AssumeRoleWithWebIdentity')
            
        });
        //with this: every authenticated user will have access to list s3
        this.authenticatedRole.addToPolicy(new PolicyStatement({
            effect: Effect.ALLOW,
            actions: ['s3:listAllMyBuckets'],
            resources: ['*']

        }));

        //This role is assumed by the unauthenticated user=> who have not authenticated with the identity provider such as Cognito User Pools
        this.unauthenticatedRole = new Role(this, 'CognitoDefaultUnauthenticatedRole', {
            assumedBy: new FederatedPrincipal('cognito-identity.amazonaws.com', {
                StringEquals: { 'cognito-identity.amazonaws.com:aud': this.identityPool.ref },
                'ForAnyValue:StringLike': { 'cognito-identity.amazonaws.com:amr': 'unauthenticated' },  
            }, 'sts:AssumeRoleWithWebIdentity')
        });
    }

    /**
     * attach the  created IAM roles to the identity pool using 'CfnIdentityPoolRoleAttachment construct'
     * even though we have specified 'cognito-identity.amazonaws.com:aud': this.identityPool.ref' above, we still need to attach them to the identity pool
     */
    private attachRoles(){
        new CfnIdentityPoolRoleAttachment(this, 'IdentityPoolRoleAttachment', {
            identityPoolId: this.identityPool.ref,
            roles: {
                authenticated: this.authenticatedRole.roleArn,
                unauthenticated: this.unauthenticatedRole.roleArn,
            },
            /**
             * If you don't specify a role mapping, Amazon Cognito will use the default behavior, 
             * which assigns the authenticated user to the authenticated role and the unauthenticated user to the unauthenticated role. 
             */
            roleMappings: {
                adminsMapping: {
                    type: 'Token',
                    ambiguousRoleResolution: 'AuthenticatedRole',
                    identityProvider: `${this.userPool.userPoolProviderName}:${this.userPoolClient.userPoolClientId}`
                }
            }

        });

    }
}
