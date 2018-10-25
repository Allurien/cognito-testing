import React, {Component} from 'react';
// import './sidenav.scss';
import { Link } from 'react-router-dom';
import { SideNav, Nav } from 'react-sidenav';
import sidenavItems from './sidenav.json';
import MaterialIcon from 'material-icons-react';
import { Auth } from "aws-amplify";

class Sidenav extends Component {
    constructor(props){
        super(props);
        this.state = {
            userGroup: []
        }
    }
    componentWillMount() {
        this.userAuth();
        this.setState({ isAuthenticating: false });
    }
    componentWillReceiveProps(){
        this.userAuth();
    }
    async userAuth(){
        try {
            await Auth.currentSession()
            .then((user)=>{
                    this.setState({userGroup: user.accessToken.payload['cognito:groups']});
                });
        }
        catch(e) {
            if (e !== 'No current user') {
                alert(e);
            }
        }
    }

    render(){
        return(
            <SideNav defaultSelectedPath="1">
                {sidenavItems.map(sidenavItem => {
                    if(sidenavItem.groups.includes(this.state.userGroup[0])){
                        return (
                            <Nav id={sidenavItem.id} key={sidenavItem.id}>
                                <Link to={sidenavItem.navPath} className="nav-item">
                                    <MaterialIcon icon={sidenavItem.icon} />
                                    {sidenavItem.title}
                                </Link>
                            </Nav>
                        );
                    }
                })}
            </SideNav>
        )
    }
}

export default Sidenav;