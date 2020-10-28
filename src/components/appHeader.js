import React, { useContext, useRef,useState } from "react"
import AppContext from "../state/context";
import Switch from '@material-ui/core/Switch';
import Avatar from '@material-ui/core/Avatar';
import LogoutModal from "./logout";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Grid,IconButton} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import {Link, withRouter} from "react-router-dom";
import {MiniSearch} from "../components/searchForm"

const AppHeader = ({classes, history})=>{
    const context = useContext(AppContext)
    const [logout, setLogout] = useState(false);
    const [loading, setLoading] = useState(false)
    const prevOpen = useRef(logout);
    
    const logoutRef = useRef(null);
    const toggleLogout = () => {
        setLogout((prevOpen) => !prevOpen);
      };
      const becomeHost = ()=>{
        setLoading(true)
        context.makeHost()
        .then(()=>{
            setLoading(false)
        })
        .catch((e)=>{
            setLoading(false)
        })
    }
    React.useEffect(() => {
        if (prevOpen.current === true && logout === false) {
          logoutRef.current.focus();
        }
    
        prevOpen.current = logout;
      }, [logout]);

    const  changeDashboard=()=>{
            context.chooseDashboard()
            .then((res)=>{
                if(res)
                {
                    if(history.location.pathname.includes('calender') || history.location.pathname.includes('dashboard') || history.location.pathname.includes('withdraw') || history.location.pathname.includes('reviews') || history.location.pathname.includes('property') || history.location.pathname.includes('add-property') || history.location.pathname.includes('edit-property'))
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
            })
      }
      console.log(context.state.dashboard) 
    return(
        <AppBar elevation={0} classes={{root:classes.app}} position="fixed"  color="primary">
        <Toolbar style={{padding:0}}>
            <Grid container justify="center" alignItems="center">
                <Grid item xs={11} lg={10} >
                    <Grid container alignItems="center">
                        <Grid  item xs={7} lg={8}>
                            <Button style={{justifySelf:'flex-start', justifyContent:'flex-start'}} className="mobile-menu" >
                                <MenuIcon/>
                            </Button>
                            {
                                context.state.dashboard?
                                <Grid container alignItems="center">
                                    <Grid lg={1} item>
                                        <Typography className="dashboard-mobile-menu" variant="h5" style={{color:'#707070', fontWeight:'bold', whiteSpace:'nowrap'}}>{process.env.REACT_APP_NAME?process.env.REACT_APP_NAME.toUpperCase():'React App'}</Typography>
                                    </Grid>
                                    <Grid lg={11} item>
                                        <MiniSearch/>
                                    </Grid>
                                </Grid>
                                :
                                <Typography className="dashboard-mobile-menu" variant="h5" style={{color:'#707070', fontWeight:'bold'}}>{process.env.REACT_APP_NAME?process.env.REACT_APP_NAME.toUpperCase():'React App'}</Typography>
                            
                            }

                        </Grid>
                        <Grid item  xs={5} lg={4}> 
                            <Grid container alignItems="center" justify="flex-end">
                                <Typography className="dashboard-mobile-menu" component="div">
                                    {
                                        context.state.dashboard&&
                                        <ul className={classes.menu}>
                                            <li className={classes.menuList}>
                                                <Link style={{color:'#707070'}}  to="/app/inbox">Inbox</Link>
                                            </li>
                                            <li className={classes.menuList}>
                                                <Link style={{color:'#707070', margin:'0 20px'}} to="/app/calender">Booking</Link>
                                            </li>
                                        </ul>
                                    }
                                    {
                                        context.state.userData&&
                                        context.state.userData.role===2?
                                        <Grid component="label" container alignItems="center" spacing={1}>
                                        <Grid item className={!context.state.dashboard?classes.active:classes.inactive}>Hosting</Grid>
                                        <Grid item>
                                            <Switch checked={context.state.dashboard} onChange={()=>{changeDashboard()}} name="checkedC" />
                                        </Grid>
                                        <Grid item className={!context.state.dashboard?classes.inactive:classes.active}>Renting</Grid>
                                        </Grid>
                                        :
                                        <Grid container>
                                            <Button onClick={becomeHost} style={{textTransform:'lowercase', color:'#375FA5'}} variant="text">
                                                {loading?'please wait a minute...':`Become a ${context.state.dashboard?'host':'renter'} on Crib`}
                                            </Button>
                                        </Grid>
                                    }
                                </Typography>
                                <IconButton
                                ref={logoutRef}
                                aria-controls={logout ? 'menu-list-grow' : undefined}
                                aria-haspopup="true"
                                onClick={toggleLogout}
                                style={{marginLeft:40}}
                                >
                                {
                                    context.state.user&&
                                    <>
                                        {
                                            context.state.user.photoURL?
                                            <Avatar style={{ width:25,height:25}} src={context.state.user.photoURL} alt="user"/>
                                            :
                                            <Avatar style={{ width:25,height:25}}  alt="">{context.state.userData.firstname.charAt(0)+context.state.userData.lastname.charAt(0)}</Avatar>
                                        }
                                    </>
                                }
                                </IconButton>
                                <LogoutModal logout={logout} logoutRef={logoutRef} setLogout={setLogout} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Toolbar>
    </AppBar>
    )
}
export default withRouter(AppHeader)