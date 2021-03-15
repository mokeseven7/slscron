# Serverless Lambda Cron 

Proof of concept creating a scheduled "cronjob" that invovkes a lambda on a shcedule. 

The deployment uses ts-node and ESbuild to bundle assets before they are uploaded to s3 and bound the lambda as its execution code. 


You can build the dist with 
```bash
npm run build
```

And you can deploy the app with 

```
npm run deploy
```

The deploy command needs ts-node and esbuid.