import { Credentials } from "@aws-sdk/client-cognito-identity";
import { AuthService } from "./AuthService";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

import { PhotosStack } from '../../../backend/outputs.json';



export class DataService{
    private  awsRegion='ap-southeast-2';
    private authService:AuthService;
    constructor(authService:AuthService){
        this.authService=authService;

    }
    public async  addProduct(title:string, price:number, image?:File){

        if (image){
            const uploadUrl = await this.uploadPublicFile(image);
            console.log(uploadUrl);
        }
        return 'test123';
    }


    
    public async uploadPublicFile(file:File) {
        console.log('uploadPublicFile: ',file);
        const credentials=await this.authService.getTemporaryCredentials();
        console.log('credentials: ',credentials);
        const s3Client=new S3Client({
            credentials:credentials,
            region:this.awsRegion,
        });

        /**
         * When you upload an object using the AWS SDK, by default, the Content-Disposition header is set to "attachment". 
         * This instructs the browser to download the object rather than opening it directly in the browser.
         */
        const command = new PutObjectCommand({
            Bucket: PhotosStack.productPhotosBucketName,
            Key: file.name,
            Body: file,
            ACL: "public-read",
            ContentType: 'image/png',
            ContentDisposition: 'inline',
          });

          try {
            const response = await s3Client.send(command);
            return `https://${command.input.Bucket}.s3.${this.awsRegion}.amazonaws.com/${command.input.Key}`

          } catch (error) {
            console.error("Error uploading file:", error);
          }

    }
}