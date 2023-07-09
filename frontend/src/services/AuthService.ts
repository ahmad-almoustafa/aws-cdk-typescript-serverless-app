export class AuthService{
    public async login(username: string, password: string): Promise<object| undefined>{
        return {
            user:'Test User',
        }
    }
    public  getProfileName():string{
        return 'Test User'
    }
}