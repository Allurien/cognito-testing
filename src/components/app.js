import React, {Component, Fragment} from 'react';
import '../assets/css/app.css';
import Routes from "./Routes";
import ButtonAppBar from "./navbar/nav";
import Sidenav from './sidenav';
import Button from '@material-ui/core/Button';
import Amplify, { Auth } from "aws-amplify";
// import Login from './login';
// import {Route, Switch} from 'react-router-dom';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            isAuthenticated: false,
            isAuthenticating: true
        };
    }
    async componentWillMount() {
        console.log('state', this.state);
        try {
            await Auth.currentSession();
            this.userHasAuthenticated(true);
        }
        catch(e) {
            if (e !== 'No current user') {
                alert(e);
            }
        }
        this.setState({ isAuthenticating: false });
        console.log('state', this.state);
    }
    userHasAuthenticated = authenticated => {
        this.setState({ isAuthenticated: authenticated });
    }
    handleLogout = event => {
        this.userHasAuthenticated(false);
    }
    render (){
        const childProps = {
            isAuthenticated: this.state.isAuthenticated,
            userHasAuthenticated: this.userHasAuthenticated
        };
        return(
            !this.state.isAuthenticating &&
            <div>
                <Sidenav />
                <ButtonAppBar />
                {this.state.isAuthenticated
                ? <Button href="/" color="inherit" onClick={this.handleLogout}>Logout</Button>
                : <Button href="/login" color="inherit">Login</Button>
                }
                <Routes childProps={childProps} />
                {/* <Switch>
                    <Route childProps={childProps} path="/login" exact component={Login} />
                </Switch> */}
            </div>
        )
    }
}

export default App;
