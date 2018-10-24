import React from 'react';
// import './sidenav.scss';
import { Link } from 'react-router-dom';
import { SideNav, Nav } from 'react-sidenav';
import sidenavItems from './sidenav.json';
import MaterialIcon from 'material-icons-react';
 
const Sidenav = () => (
    <SideNav defaultSelectedPath="1">
    {sidenavItems.map(sidenavItem => {
        return (
            <Nav id={sidenavItem.id} key={sidenavItem.id}>
                <Link to={sidenavItem.navPath} className="nav-item">
                    <MaterialIcon icon={sidenavItem.icon} />
                    {sidenavItem.title}
                </Link>
            </Nav>
        );
    })}
        
    </SideNav>
)

export default Sidenav;