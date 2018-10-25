import React, {Component, Fragment} from 'react';
import '../assets/css/app.css';
import Routes from "./Routes";
import ButtonAppBar from "./navbar/nav";
import Sidenav from './sidenav';
import Button from '@material-ui/core/Button';
import Amplify, { Auth } from "aws-amplify";

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            isAuthenticated: false,
            isAuthenticating: true,
            userGroup: []
        };
    }
    async componentWillMount() {
        try {
            await Auth.currentSession()
            .then((user)=>{
                    this.setState({userGroup: user.accessToken.payload['cognito:groups']});
                });
                this.userHasAuthenticated(true);
        }
        catch(e) {
            if (e !== 'No current user') {
                alert(e);
            }
        }
        this.setState({ isAuthenticating: false });
    }
    userHasAuthenticated = authenticated => {
        this.setState({ isAuthenticated: authenticated });
    }

    handleLogout = async event => {
        await Auth.signOut();
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
            </div>
        )
    }
}

export default App;
