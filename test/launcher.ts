import { addUser } from '../services/users/addUser';
import {handler} from '../services/users/handler';
/**
 * Debug lambda functions locally
 * */ 
 handler({
    httpMethod:'POST',
    body:JSON.stringify({firstName:"John ",lastName:"Doe"})  
 } as any,{} as any);
// addUser({} as any);