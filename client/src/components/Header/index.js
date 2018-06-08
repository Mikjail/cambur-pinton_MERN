import React, { Component } from 'react';
import { connect } from 'react-redux';
import {SideNav, Button, SideNavItem } from 'react-materialize';
import './Header.css';
class Header extends Component{
    constructor(props){
        super(props);
    }

    renderHeader= ()=>{
       
        return (
        <div id="nav-mobile" className="right">
            
            <i className="large material-icons">
                menu
            </i>
        
          </div>
        )
    }

    render() {
        return (
            <SideNav 
                trigger={this.renderHeader()}
                options={{ closeOnClick: false }}>
                {/* <SideNavItem 
                    userView
                    user={{
                    background: 'img/office.jpg',
                    image: 'img/yuna.jpg',
                    name: 'John Doe',
                    email: 'jdandturk@gmail.com'
                }}
                /> */}
                <SideNavItem className="logIn-section" href='#!icon'>
                    <button className="btn primary center">
                        Log In
                    </button>
                </SideNavItem>
                <SideNavItem href='#!second'>Menu</SideNavItem>
                <SideNavItem divider />
                <SideNavItem subheader>Subheader</SideNavItem>
                <SideNavItem waves href='#!third'>Third Link With Waves</SideNavItem>
          </SideNav>
        )
    }
}

function mapStateToProps({ auth }){
    return { auth}
}

export default connect(mapStateToProps)(Header);