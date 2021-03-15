import * as cdk from "@aws-cdk/core";
import { LambdaCronStack } from "./src";
import { buildSync } from "esbuild";
import path from "path";

//As far as I can tell, there is no way around forcing this to happen syncronously
//let build: BuildResult = buildSync(options);
let build = buildSync({
  bundle: true,
  entryPoints: [path.resolve(__dirname, "src", "lambda", "index.ts")],
  external: [""], //Any external Depencies
  format: "cjs", //Has to be common for lambda
  outfile: path.join(__dirname, "dist", "index.js"), //Our build
  platform: "node",
  sourcemap: "inline",
  target: "node14",
  metafile: true,
  logLevel: "info",
  minify: true,
});

console.log(build);

//Create the CDK boilerplate
const app = new cdk.App();

//just a convention, not required by cdk itself
const idPrefix = "slscron";

//Scaffold out the CFN for the stack
new LambdaCronStack(app, `${idPrefix}`);

//The file produced by this call is what you want want in git
app.synth();
