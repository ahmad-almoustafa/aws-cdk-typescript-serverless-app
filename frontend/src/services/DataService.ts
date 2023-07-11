import { AuthService } from "./AuthService";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

import { PhotosStack, ApiGatewayStack } from '../../../backend/outputs.json';
import {ProductDOT } from "../components/Types";

const ProductsApiUrl = ApiGatewayStack.CdkAppApiEndpoint20A6C893 + 'products'

export class DataService{
    private  awsRegion='ap-southeast-2';
    private authService:AuthService;
    constructor(authService:AuthService){
        this.authService=authService;

    }
    public async  addProduct(title:string, price:number, image?:File):Promise<string>{
        const product: { title: string; price: number; imageURL?: string } = {
            title: title,
            price: price,
          };
      
      
        if (image){ 
            const uploadUrl = await this.uploadPublicFile(image);
            // console.log(uploadUrl);
            product.imageURL=uploadUrl
        }
        const postResult  = await fetch(ProductsApiUrl, {
            method: 'POST',
            body: JSON.stringify(product),
            headers: {
                'Authorization': this.authService.jwtIdToken!
            }
        });
        const postResultJSON= await postResult.json();
      
        return postResultJSON.id;
    }
    
    public async  getProducts():Promise<ProductDOT[]>{
        const postResult  = await fetch(ProductsApiUrl, {
            method: 'GET',
            headers: {
                'Authorization': this.authService.jwtIdToken!
            }
        });
        const getResultJSON= await postResult.json();  
        // console.log('getResultJSON',getResultJSON)
        return getResultJSON;
    }

    
    public async uploadPublicFile(file:File) {
        const credentials=await this.authService.getTemporaryCredentials();
        // console.log('credentials: ',credentials);
        const s3Client=new S3Client({
            //@ts-ignore
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
            await s3Client.send(command);
            return `https://${command.input.Bucket}.s3.${this.awsRegion}.amazonaws.com/${command.input.Key}`

          } catch (error) {
            console.error("Error uploading file:", error);
          }

    }
}