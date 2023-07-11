# CDK,Typescript  Serverless APP

A Serverless APP  built with  AWS(CDK,SDK,Cognito,Lambda,DynamoDB,S3), Typescript and React.


## Getting Started
### Backend

Building AWS using CDK and SDK 

#### Requirements

- NodeJs v18+
- TypeScript
- AWS Account
- AWS CLI
- AWS IAM user for CLI

#### How to run
1- navigate to the backend directory:
```sh
cd backend 
```
2. Configure aws-cli locally with your AWS IAM credentials
```sh
aws configure
```
3. Deploy CDK constructs:

```sh
npm run deploy
```
This will build the CDK construct for the backend on your aws account.

### Frontend

#### How to run
1- navigate to the fronted directory:
```sh
cd frontend 
```
2. Install dependencies

```sh
npm install
```

3. Start the react app

```sh
npm run dev
```
4. Navigate to [http://localhost:5173](http://localhost:5173) in your browser


## Built With

- [TypeScript](https://www.typescriptlang.org/) - A typed superset of JavaScript that compiles to plain JavaScript
- [AWS CDK](https://aws.amazon.com/cdk/) - An infrastructure as code framework for defining cloud resources using familiar programming languages
- [AWS SDK for JavaScript (v3)](https://github.com/aws/aws-sdk-js-v3) - The official JavaScript SDK for AWS services (version 3)
- [AWS Lambda](https://aws.amazon.com/lambda/) - A serverless compute service for running code without provisioning or managing servers
- [Amazon Cognito](https://aws.amazon.com/cognito/) - A fully managed identity provider for user authentication and authorization
- [Amazon DynamoDB](https://aws.amazon.com/dynamodb/) - A fast and flexible NoSQL database service for all applications that need consistent, single-digit millisecond latency at any scale
- [Amazon S3](https://aws.amazon.com/s3/) - A simple storage service that offers industry-leading scalability, data availability, security, and performance
- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [TailwindCSS](https://tailwindcss.com/) - A utility-first CSS framework for rapidly building custom designs

## Author
Ahmad Al Moustafa
<a href="https://www.ahmadalmoustafa.com/" target="_blank">https://www.ahmadalmoustafa.com/</a>
