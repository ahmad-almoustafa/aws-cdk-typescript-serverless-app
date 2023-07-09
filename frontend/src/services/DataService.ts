import { AuthService } from "./AuthService";

export class DataService{
    private authService:AuthService;
    constructor(authService:AuthService){
        this.authService=authService;

    }
    public async  addProduct(title:string, price:number, image?:File){

        const credentials=await this.authService.getTemporaryCredentials();
        console.log('credentials: ',credentials);

        return 'test123';
    }


}