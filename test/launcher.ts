import { addUser } from '../services/users/addUser';
import {handler} from '../services/users/handler';
/**
 * Debug lambda functions locally
 * */ 

handler({
   httpMethod:'GET',
   queryStringParameters:{
      id:'9e45cd44-b85b-4e9c-a55e-5b4abd1b299d---'
   }
} as any,{} as any);

// handler({
//     httpMethod:'POST',
//     body:JSON.stringify({firstName:"John ",lastName:"Doe"})  
//  } as any,{} as any);
// addUser({} as any);