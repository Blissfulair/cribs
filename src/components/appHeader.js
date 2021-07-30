import React, { useRef,useState } from "react"
import Switch from '@material-ui/core/Switch';
import Avatar from '@material-ui/core/Avatar';
import LogoutModal from "./logout";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Grid,IconButton} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles"
//import {MiniSearch} from "../components/searchForm"
import { connect } from "react-redux";
import { chooseDashboard, setUser } from "../state/actions";
import { changeRole, makeHost } from "../apis/server";
const styles = theme=>({
    container:{
        display:'flex',
        alignItems:'center',
        justifyContent:'space-between'
    },
    menu:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        listStyle:'none'
    },
    menuItems:{
        marginLeft:'15px'
    },
    menuList:{
        fontSize:12
    },
    brand:{
        textDecoration:'none'
    },
    searchItem:{
        color:'#979797'
    },
    app:{
        borderTop:'2px solid #00A8C8',
        borderBottom:'2px solid #00A8C8',
        backgroundColor:'#fff',
    },
    active:{
        color:'#00A8C8',
        fontWeight:'bold'
    },
    inactive:{
        color:'#707070'
    },
})
const AppHeader = ({classes, history,user,dashboard, chooseDashboard, setUser})=>{
    const [logout, setLogout] = useState(false);
    const [loading, setLoading] = useState(false)
    const prevOpen = useRef(logout);
    
    const logoutRef = useRef(null);
    const toggleLogout = () => {
        setLogout((prevOpen) => !prevOpen);
      };
      const becomeHost = ()=>{
        setLoading(true)
        makeHost(user.id)
        .then((res)=>{
            chooseDashboard(!dashboard)
            setUser(res.user)

            setLoading(false)
            if(history.location.pathname.includes('crib') || history.location.pathname.includes('search') || !history.location.pathname.includes('payment') || history.location.pathname.includes('history'))
            history.push('/app/dashboard')
            else
            history.push(history.location.pathname+history.location.search)
        })
        .catch((e)=>{
            console.log(e)
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
    return(
        <AppBar elevation={0} classes={{root:classes.app}} position="fixed"  color="primary">
            
        <Toolbar style={{padding:0}}>
            <Grid container justify="center" alignItems="center">
                <Grid item xs={11} lg={10} >
                    <Grid container alignItems="center">
                        <Grid  item xs={7} lg={8}>
                            <Button style={{width:50}} id="mobile-menu" className="mobile-menu" >
                                <MenuIcon/>
                            </Button>
                            {
                             user&&   
                                // context.state.dashboard && context.state.userData.role?
                                !dashboard ?
                                <Grid container alignItems="center">
                                    <Grid lg={1} item>
                                        <Typography className="dashboard-mobile-menu" variant="h5" style={{color:'#707070', fontWeight:'bold', whiteSpace:'nowrap'}}>{process.env.REACT_APP_NAME?process.env.REACT_APP_NAME.toUpperCase():'React App'}</Typography>
                                    </Grid>
                                    {/* <Grid lg={11} item>
                                        <MiniSearch/>
                                    </Grid> */}
                                </Grid>
                                :
                                <Typography className="dashboard-mobile-menu" variant="h5" style={{color:'#707070', fontWeight:'bold'}}>{process.env.REACT_APP_NAME?process.env.REACT_APP_NAME.toUpperCase():'React App'}</Typography>
                            
                            }

                        </Grid>
                        <Grid item  xs={5} lg={4}> 
                            <Grid container alignItems="center" justify="flex-end">
                                {
                                    (history.location.pathname.includes('home') || history.location.pathname.includes('dashboard')) &&
                                    <Typography className="dashboard-mobile-menu" component="div">
                                    {
                                        user&&
                                        user.type==='host'?
                                        <Grid component="label" container alignItems="center" spacing={1}>
                                        <Grid item className={!dashboard?classes.active:classes.inactive}>Renting</Grid>
                                        <Grid item>
                                            <Switch checked={dashboard} onChange={()=>{changeDashboard()}} name="checkedC" />
                                        </Grid>
                                        <Grid item className={!dashboard?classes.inactive:classes.active}>Hosting</Grid>
                                        </Grid>
                                        :
                                        <Grid container>
                                                <Button onClick={becomeHost} style={{textTransform:'lowercase', color:'#375FA5'}} variant="text">
                                                    {loading?'please wait a minute...':`Become a ${!dashboard?'host':'renter'} on Crib`}
                                                </Button>
                                        </Grid>
                                    }
                                </Typography>
                                }

                                <IconButton
                                ref={logoutRef}
                                aria-controls={logout ? 'menu-list-grow' : undefined}
                                aria-haspopup="true"
                                onClick={toggleLogout}
                                style={{marginLeft:40}}
                                >
                                {
                                    user&&
                                    <>
                                        {
                                            user.image?
                                            <Avatar style={{ width:25,height:25}} src={user.image} alt="user"/>
                                            :
                                            <Avatar style={{ width:25,height:25}}  alt="">{user.firstname.charAt(0)+user.lastname.charAt(0)}</Avatar>
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
const mapStateToProps =state=>({
    dashboard:state.dashboard,
    user:state.user
})
const mapDispatchToProps = dispatch => ({
    chooseDashboard: (payload) => dispatch(chooseDashboard(payload)),
    setUser: (payload) => dispatch(setUser(payload))
  });
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(AppHeader)))