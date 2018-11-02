import React, {Component} from 'react';
import { withRouter, Switch, Route, Redirect } from "react-router-dom";
import '../assets/css/app.css';
import Sidenav from './sidenav';
import Button from '@material-ui/core/Button';
import { Auth } from "aws-amplify";
import RouteSwitcher from './switchroutes';
import ContactAdmin from './contact-admin';
import Home from './home';
import Admins from './admins';
import OrgAdmin from './midLevel';
import Users from './users';
import AddUser from './add-user/add-user';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            userGroup: [],
            loggedIn: false
        };
        AWS.config.region = 'us-east-2'; // Region
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'us-east-2:cf60b0de-94d4-4ad8-9933-84266ceb57e0',
});
    }
    componentWillMount(){
        this.userAuth();
        // var cognitoidentity = new AWS.CognitoIdentity();
        // var params = {
        //     IdentityPoolId: 'us-east-2:cf60b0de-94d4-4ad8-9933-84266ceb57e0',
        //     AccountId: '932171880994',
        //     Logins: {
        //         'cognito-idp.us-east-2.amazonaws.com/us-east-2_bE2hNqmyh': result.getIdToken().getJwtToken(),
        //     }
        // };
        // const identity_id = cognitoidentity.getId(params, function(err, data) {
        //         if (err) console.log(err, err.stack); // an error occurred
        //         else     console.log(data);           // successful response
        // }
        // )
        // console.log('id', identity_id);
    }
    componentWillReceiveProps(){
        this.userAuth();
    }
    async userAuth(){
        await Auth.currentSession()
        .then((user)=>{
            this.setState({userGroup: user.accessToken.payload['cognito:groups'], loggedIn: true});
        });
    }

    handleLogout = async event => {
        await Auth.signOut();
    }
    checkAdmins(){
        return this.state.userGroup.some((item)=>{return item === "Admins"})
    }
    checkOrgAdmin(){
        return this.state.userGroup.some((item)=>{return item === "Admins" || item === "OrgAdmin"})
    }
    render(){
        return (
            <div className="App">
                <Button href="/" style={{ flex: 1 }} color="inherit" onClick={this.handleLogout}>Logout</Button>
                <Switch>
                    {this.state.userGroup === undefined ? <ContactAdmin /> : null }
                    <Route exact path="/" component={Home}/>
                    <Route path="/users" component={Users}/>
                    <Route path="/admins" component={Admins} />
                    <Route path="/org-admin" component={OrgAdmin}/>
                    <Route path="/add-user" component={AddUser}/>
                </Switch>
            </div>
        );
    }
}

export default withRouter(App);
