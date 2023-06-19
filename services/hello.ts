
/**
 * In AWS Lambda, the event and context parameters are automatically provided by the Lambda service when your function is invoked. 
 * event=>  contain information about the event that triggered the Lambda function
 * context=> runtime context in which the function is executed.
 */
exports.handler=async (event:any, context:any)=>{
    console.log('Received event:', JSON.stringify(event));
    console.log('Function name:', context.functionName);
    return {
        statusCode:200,
        body:JSON.stringify('Hello From Lambda!')
    }
}