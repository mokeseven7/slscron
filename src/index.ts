import * as lambda from "@aws-cdk/aws-lambda";
import * as cdk from "@aws-cdk/core";
import * as events from "@aws-cdk/aws-events";
import * as targets from "@aws-cdk/aws-events-targets";
import * as desintations from "@aws-cdk/aws-lambda-destinations";

import path from "path";

export class LambdaCronStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string) {
    super(scope, id);

    //The event target, the esbuild outfile gets uploaded to s3
    const cronhandler = new lambda.Function(this, `${this.node.id}-handler`, {
      code: new lambda.AssetCode(path.resolve(__dirname, "../", "dist")),
      handler: "index.cronHander",
      runtime: lambda.Runtime.NODEJS_14_X,
      timeout: cdk.Duration.seconds(300),
    });

    //Passing Your own data into the function
    const eventTarget = new targets.LambdaFunction(cronhandler, {
      event: events.RuleTargetInput.fromObject({
        hello: "world",
      }),
    });

    // See https://docs.aws.amazon.com/lambda/latest/dg/tutorial-scheduled-events-schedule-expressions.html
    const rule = new events.Rule(this, `${this.node.id}-Rule`, {
      schedule: events.Schedule.cron({
        minute: "*/5",
        hour: "*",
        day: "*",
        month: "*",
        year: "*",
      }),
    });

    rule.addTarget(eventTarget);
  }
}
