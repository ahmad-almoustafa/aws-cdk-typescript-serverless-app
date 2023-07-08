import { AuthService } from "./AuthService";
import { ListBucketsCommand, S3Client } from "@aws-sdk/client-s3";
 /**
  * 1- create and activate user in the AWS console: cognito 
  * test_user_name
  * M;ki9!1wY2*Hn
  * 
  * 2- change the status from force password to confirmed:
  * aws cognito-idp admin-set-user-password --user-pool-id ap-southeast-2_VGkRejYpD --username test_user_name --password 'Mki9!1wY2Hn' --permanent
  * Note: the password value contains special characters that need to be properly escaped or enclosed in quotation marks =>''
  * 
  * 
  **/ 
async function testAuth(){
    const authService=new AuthService();
    const result= await authService.login('test_user_name','Mki9!1wY2Hn');
    // console.log('logged in user JWT token',result.getSignInUserSession().getIdToken().getJwtToken());

    const credentials= await authService.generateTemporaryCredentials(result);
    console.log('credentials: ',credentials);

    const buckets= await listBucketsSDK3(credentials);
    console.log('buckets: ',buckets);

}

const listBucketsSDK3= async (credentials:any) =>{
    const s3Client=new S3Client({credentials: credentials});
    const command= new ListBucketsCommand({});
    const response=await s3Client.send(command);
    return response.Buckets;
}

testAuth();