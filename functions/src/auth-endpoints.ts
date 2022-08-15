import supertokens from 'supertokens-node';
import {middleware, errorHandler} from 'supertokens-node/framework/express';
import * as express from 'express';
import * as cors from 'cors';
import ThirdPartyEmailPassword from "supertokens-node/recipe/thirdpartyemailpassword";
import Session from "supertokens-node/recipe/session";
import * as admin from 'firebase-admin';

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
      override: {
        apis: (originalImplementation) => {
          return {
            ...originalImplementation,

            // override the email password sign up API
            emailPasswordSignUpPOST: async function(input) {
              if (originalImplementation.emailPasswordSignUpPOST === undefined) {
                throw Error("Should never come here");
              }

              // TODO: some pre sign up logic

              let response = await originalImplementation.emailPasswordSignUpPOST(input);

              if (response.status === "OK") {
                // TODO: some post sign up logic
              }

              return response;
            },

            // override the email password sign in API
            emailPasswordSignInPOST: async function(input) {
              if (originalImplementation.emailPasswordSignInPOST === undefined) {
                throw Error("Should never come here");
              }

              // TODO: some pre sign in logic

              let response = await originalImplementation.emailPasswordSignInPOST(input);

              if (response.status === "OK") {
                // TODO: some post sign in logic
              }

              return response;
            },

            // override the thirdparty sign in / up API
            thirdPartySignInUpPOST: async function(input) {
              if (originalImplementation.thirdPartySignInUpPOST === undefined) {
                throw Error("Should never come here");
              }

              // TODO: Some pre sign in / up logic

              let response = await originalImplementation.thirdPartySignInUpPOST(input);

              if (response.status === "OK") {
                if (response.createdNewUser) {
                  // TODO: some post sign up logic
                  console.log('New user was created', response);
                } else {
                  // TODO: some post sign in logic
                  // response.custom_token = 'This is my custom token, yay!';
                  console.log('New user was signed in', response);
                }
              }

              return response;
            },
          }
        },
      },
    }),
    Session.init({
      override: {
        functions: function (originalImplementation) {
          console.log('Overloading createNewSession');
          return {
            ...originalImplementation,
            createNewSession: async function (input) {
                const uid = input.userId;
              await admin.auth().updateUser(uid, {emailVerified: true});
                const firebaseToken = await admin.auth().createCustomToken(uid);
                console.log('Created FB Token', firebaseToken);
                input.accessTokenPayload = {
                  ...input.accessTokenPayload,
                  firebaseToken
                };
              return originalImplementation.createNewSession(input);
            },
            refreshSession: async function (input) {
              let session = originalImplementation.refreshSession(input);
              // TODO: update firebase token in session...
              return session;
            }
          };
        },
        apis: (originalImplementation) => {
          return {
            ...originalImplementation,
            signOutPOST: async function (input) {
              let session = await Session.getSession(input.options.req, input.options.res, input.userContext);
              const uid = session.getUserId();
              await admin.auth().revokeRefreshTokens(uid);
              return originalImplementation.signOutPOST!(input);
            },
          }
        },
      },
    }),
  ],
});

const app = express();
admin.initializeApp();

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
