import React, {Component} from 'react';
import '../assets/css/app.css';
import Routes from "./Routes";
import ButtonAppBar from "./navbar/nav";
// import Login from './login';
// import {Route, Switch} from 'react-router-dom';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            isAuthenticated: false
        };
    }
    userHasAuthenticated = authenticated => {
        this.setState({ isAuthenticated: authenticated });
    }

    render (){
        const childProps = {
            isAuthenticated: this.state.isAuthenticated,
            userHasAuthenticated: this.userHasAuthenticated
        };
        return(
            <div>
                <ButtonAppBar />
                <div className="app">
                    <h1>Welcome to React</h1>
                </div>
                <Routes childProps={childProps} />
                {/* <Switch>
                    <Route childProps={childProps} path="/login" exact component={Login} />
                </Switch> */}
            </div>
        )
    }
}

export default App;
