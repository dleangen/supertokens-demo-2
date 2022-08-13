import supertokens from 'supertokens-node';
import {middleware, errorHandler} from 'supertokens-node/framework/express';
import * as express from 'express';
import * as cors from 'cors';
import ThirdPartyEmailPassword from "supertokens-node/recipe/thirdpartyemailpassword";
import Session from "supertokens-node/recipe/session";
const { Google, Github } = ThirdPartyEmailPassword;

const apiPort = 5001;
const apiDomain = `http://localhost:${apiPort}`;
const websitePort = 4200;
const websiteDomain = `http://localhost:${websitePort}`;

console.log('Initializing...');

supertokens.init({
  framework: "express",
  supertokens: {
    // TODO: This is a core hosted for demo purposes. You can use this, but make sure to change it to your core instance URI eventually.
    connectionURI: "https://try.supertokens.com",
    apiKey: "<REQUIRED FOR MANAGED SERVICE, ELSE YOU CAN REMOVE THIS FIELD>",
  },
  appInfo: {
    // learn more about this on https://supertokens.com/docs/thirdpartyemailpassword/appinfo
    appName: "SuperTokens Demo App", // TODO: Your app name
    apiDomain, // TODO: Change to your app's API domain
    websiteDomain, // TODO: Change to your app's website domain,
    // The following seems to be necessary in order to get this working properly on Firebase Functions
    // TODO: Change these entries to match your setup
    websiteBasePath: '/auth',
    apiBasePath: '/',
    apiGatewayPath: '/supertokens-demo-20220805/us-central1/auth',
  },
  recipeList: [
    ThirdPartyEmailPassword.init({
      providers: [
        // We have provided you with development keys which you can use for testing.
        // IMPORTANT: Please replace them with your own OAuth keys for production use.
        Google({
          clientId: "1060725074195-kmeum4crr01uirfl2op9kd5acmi9jutn.apps.googleusercontent.com",
          clientSecret: "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",
        }),
        Github({
          clientId: "467101b197249757c71f",
          clientSecret: "e97051221f4b6426e8fe8d51486396703012f5bd",
        }),
      ],
    }),
    Session.init(), // initializes session features
  ],
});

const app = express();

app.use(
  cors({
    origin: websiteDomain, // TODO: Change to your app's website domain
    allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
    credentials: true,
  })
);

app.use(middleware());

// Add this AFTER all your routes
app.use(errorHandler());

export default app;
