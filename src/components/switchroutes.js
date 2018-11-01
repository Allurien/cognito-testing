import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import routingItems from './mainRouting.json';

class RouteSwitcher extends Component {
constructor(props){
    super(props);
    this.state ={
        userGroup: this.props.userGroup
    }
}
    switchRoute(userGroup){
        console.log(userGroup);
        return(
            routingItems.map(routingItem => {
                if(routingItem.groups.includes(userGroup)){
                    return (
                        <Route path={routingItem.navPath} />
                    );
                }
            })
        )
    }
    render(){
        return(
            <Switch>
                {this.switchRoute(this.state.userGroup[0]).bind(this)}
            </Switch>
        )
    }
}
export default RouteSwitcher;