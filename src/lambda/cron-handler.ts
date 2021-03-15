import { Handler } from "aws-lambda";

export const handler: Handler = async (event: any, context: any) => {
  const stringedEvent = JSON.stringify(event);
  const stringedContext = JSON.stringify(context);

  console.log("EVENT", stringedEvent);
  console.log("CONTEXT", stringedContext);

  return {
    body: {
      event: stringedEvent,
      context: stringedContext,
    },
    headers: {
      "Content-Type": "text/plain",
    },
    statusCode: 200,
  };
};
