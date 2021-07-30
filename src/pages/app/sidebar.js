import React from "react";
import {NavLink,withRouter} from "react-router-dom";
import "./sidebar.css";
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
// import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import EventOutlinedIcon from '@material-ui/icons/EventOutlined';
import AccountBalanceWalletOutlinedIcon from '@material-ui/icons/AccountBalanceWalletOutlined';
// import AccountTreeOutlinedIcon from '@material-ui/icons/AccountTreeOutlined';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import {connect} from "react-redux";
import { chooseDashboard } from "../../state/actions";
import { changeRole } from "../../apis/server";
import { Grid, Switch } from "@material-ui/core";
const Sidebar = ({dashboard,user,chooseDashboard,history})=>{
    const [open, setOpen]=React.useState(false)
    const handClick = React.useCallback((e)=>{
        const dashboardDom = document.getElementsByClassName('dashboard');
        const mobileBtn = document.getElementById('mobile-menu');
        if(dashboardDom.length>0 && mobileBtn){
            if(mobileBtn.contains(e.target)){

                if(!open)
                dashboardDom[0].classList.replace('close', 'open')
                else
                dashboardDom[0].classList.replace('open', 'close')
                setOpen(!open)
            }
            
            else if(dashboardDom[0].contains(e.target))
            {
                dashboardDom[0].classList.replace('open', 'close')
                setOpen(false)
            }
        }
       
    },[open])
    
    const  changeDashboard=()=>{
        chooseDashboard(!dashboard)
        changeRole(user.id, {role:!dashboard})
        .then((res)=>{
        })
        .catch((e)=>{
            console.log(e)
        })
            if(dashboard)
            {
                if(history.location.pathname.includes('calendar') || history.location.pathname.includes('inbox') || history.location.pathname.includes('dashboard') || history.location.pathname.includes('withdraw') || history.location.pathname.includes('reviews') || history.location.pathname.includes('property') || history.location.pathname.includes('add-property') || history.location.pathname.includes('edit-property'))
                history.push('/app/home')
                else
                history.push(history.location.pathname+history.location.search)
            }
            else
            {
                if(history.location.pathname.includes('crib') || history.location.pathname.includes('search') || !history.location.pathname.includes('payment') || history.location.pathname.includes('history'))
                history.push('/app/dashboard')
                else
                history.push(history.location.pathname+history.location.search)
            }
  }
    React.useEffect(()=>{
        document.addEventListener('click', handClick)
        return ()=>{
            document.removeEventListener('click', handClick)
        }
    },[open,handClick])
    return(
        <>
            <div className="sidebar">
                <div className="sidebar-menu">
                    <ul className="s-menu">
                    {
                                        user&&
                                        <Grid component="label" className="switches" container alignItems="center" spacing={1}>
                                        <Grid item >Switch to Renting</Grid>
                                        <Grid item>
                                            <Switch checked={dashboard} onChange={()=>{changeDashboard()}} name="checkedC" />
                                        </Grid>
                                        </Grid>
                                    }
                        <NavLink onClick={Sidebar.active} activeClassName="is-active" to="/app/dashboard"><li><DashboardOutlinedIcon/> Dashboard</li></NavLink>
                            {
                                dashboard&&
                                <NavLink onClick={Sidebar.active} activeClassName="is-active"  id="properties" to="/app/property"><li><HomeOutlinedIcon/> Property </li></NavLink>
                            }
                        
                            {/* <NavLink onClick={Sidebar.active}  activeClassName="is-active"  id="inboxes" to="/app/inbox">
                            <li>
                                <EmailOutlinedIcon/>
                                Inbox
                                <span className="i-num">2</span>
                                
                             </li>
                            </NavLink> */}

                        
                        <NavLink  onClick={Sidebar.active}  activeClassName="is-active" to="/app/calendar"><li><EventOutlinedIcon/>Calendar</li></NavLink>
                            {
                                dashboard&&
                                <>
                                    <NavLink  onClick={Sidebar.active}  activeClassName="is-active"  to="/app/withdraws"><li><AccountBalanceWalletOutlinedIcon/>Payments</li></NavLink>
                                    {/* <NavLink  onClick={Sidebar.active}  activeClassName="is-active"  to="/app/reviews"><li><AccountTreeOutlinedIcon/>Reviews</li></NavLink> */}
                                </>
                            }
                        <NavLink onClick={Sidebar.active}  activeClassName="is-active" id="profiles"  to="/app/profile"><li><PersonOutlineOutlinedIcon/>Profile</li></NavLink>
                        <NavLink onClick={Sidebar.active}  activeClassName="is-active"   to="/app/settings"><li><SettingsOutlinedIcon/>Settings</li></NavLink>
                    </ul>
                </div>
            </div>
        </>
    )
}

  

  const mapStateToProps=state=>({
      dashboard:state.dashboard,
      user:state.user
  })
  const mapDispatchToProps=dispatch=>({
      chooseDashboard:(payload)=>dispatch(chooseDashboard(payload))
  })
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Sidebar));