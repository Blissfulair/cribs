import React from "react";
import {NavLink} from "react-router-dom";
import "../app/sidebar.css";
import PropTypes from "prop-types"
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
// import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import EventOutlinedIcon from '@material-ui/icons/EventOutlined';
// import AccountTreeOutlinedIcon from '@material-ui/icons/AccountTreeOutlined';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';

let toggle = false;
const Sidebar = ()=>{
    return(
        <>
            <div style={{background:'#000'}} className="sidebar">
                <div className="sidebar-menu">
                    <ul className="s-menu">
                        <NavLink onClick={Sidebar.active} activeClassName="is-active" to="/admin/dashboard"><li><DashboardOutlinedIcon/> Dashboard</li></NavLink>

                        <NavLink onClick={Sidebar.active} activeClassName="is-active"  id="properties" to="/admin/properties"><li><HomeOutlinedIcon/> Property </li></NavLink>

                        
                        <NavLink  onClick={Sidebar.active}  activeClassName="is-active" to="/admin/amenities"><li><EventOutlinedIcon/>Amenities</li></NavLink>
                        <NavLink onClick={Sidebar.active}  activeClassName="is-active"   to="/admin/users"><li><PeopleOutlineIcon/>Users</li></NavLink>
                        <NavLink onClick={Sidebar.active}  activeClassName="is-active" id="profiles"  to="/admin/profile"><li><PersonOutlineOutlinedIcon/>Profile</li></NavLink>
                        <NavLink onClick={Sidebar.active}  activeClassName="is-active"   to="/admin/settings"><li><SettingsOutlinedIcon/>Settings</li></NavLink>
                    </ul>
                </div>
            </div>
        </>
    )
}

Sidebar.active =(e)=>{
    // document.querySelector('.active').classList.remove('active')
    // if(e.target.localName === 'span')
    // e.target.parentElement.parentElement.classList.add('active');
    // else if(e.target.localName === 'a')
    // e.target.parentElement.classList.add('active');
    // else if(e.target.localName === 'li')
    // e.target.classList.add('active');
    if(window){
        if(window.innerWidth < 767){
            const dom = document.querySelector('.s-menu');
            if(!toggle){
                for(let i = 0; i < dom.children.length; i++){
                    dom.children[i].querySelector('li').style.display = "flex"
                    // document.querySelector('.sidebar').style.boxShadow  = "0px 3px 6px #0F134842"
                }
                toggle = true;
            }
            else{
                for(let i = 0; i < dom.children.length; i++){
                    dom.children[i].querySelector('li').style.display = "none"
                }
                dom.querySelector('a[aria-current=page]').firstElementChild.style.display = "flex"
                document.querySelector('.sidebar').style.boxShadow = "none"
                toggle = false;
            }
        }
    }
}
Sidebar.propTypes = {
    siteTitle: PropTypes.string,
  }
  
Sidebar.defaultProps = {
    siteTitle: ``,
  }
  
export default Sidebar;