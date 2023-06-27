import { AuthService } from "./AuthService";

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
    console.log('logged in user JWT token',result.getSignInUserSession().getIdToken().getJwtToken());
}

testAuth();