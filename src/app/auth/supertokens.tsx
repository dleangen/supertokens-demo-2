import * as React from "react";
import * as SuperTokens from "supertokens-auth-react";

import * as ThirdPartyEmailPassword from "supertokens-auth-react/recipe/thirdpartyemailpassword";

import { Github, Google } from "supertokens-auth-react/recipe/thirdpartyemailpassword";
import Session from "supertokens-auth-react/recipe/session";

const apiPort = 5001;
const apiDomain = `http://localhost:${apiPort}`;
const websitePort = 4200;
const websiteDomain = `http://localhost:${websitePort}`;

SuperTokens.init({
    appInfo: {
        appName: "SuperTokens Demo App", // TODO: Your app name
        apiDomain, // TODO: Change to your app's API domain
        websiteDomain, // TODO: Change to your app's website domain
        // Add these to function properly with Firebase Functions on the backend
        // TODO: Change to match your own settings
        apiBasePath: '/auth',
        apiGatewayPath: '/supertokens-demo-20220805/us-central1',
        websiteBasePath: '/auth'
    },
    recipeList: [
        ThirdPartyEmailPassword.init({
            signInAndUpFeature: {
                providers: [Github.init(), Google.init()],
            },
            emailVerificationFeature: {
                mode: "REQUIRED",
            },
            onHandleEvent: async (context) => {
              if (context.action === "SESSION_ALREADY_EXISTS") {
                // TODO:
                console.log('Session Already Exists!');
              } else if (context.action === "SUCCESS") {
                let { id, email } = context.user;
                if (context.isNewUser) {
                  // TODO: Sign up
                  console.log('New User');
                } else {
                  // TODO: Sign in
                  console.log('Welcome back!');
                }
              } else {
                console.error('WTF???');
              }
            }
        }),
        Session.init(),
    ],
});

class SuperTokensReactComponent extends React.Component {
    override render() {
        if (SuperTokens.canHandleRoute()) {
            return SuperTokens.getRoutingComponent();
        }
        return "Route not found";
    }
}

export default SuperTokensReactComponent;
