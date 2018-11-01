import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Amplify from "aws-amplify";
import { Authenticator, SignIn, RequireNewPassword, ForgotPassword, Greetings} from 'aws-amplify-react';
import config from "./config";


import App from './components/app';

Amplify.configure({
    Auth: {
        mandatorySignIn: true,
        region: config.cognito.REGION,
        userPoolId: config.cognito.USER_POOL_ID,
        identityPoolId: config.cognito.IDENTITY_POOL_ID,
        userPoolWebClientId: config.cognito.APP_CLIENT_ID
    }
});

ReactDOM.render(
    <Authenticator>
    <Router>
        <App />
    </Router>
</Authenticator>,
    document.getElementById('root')
);
