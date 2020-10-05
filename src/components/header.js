import React, {useState} from "react"
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {MenuItem, Grid,IconButton} from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import {Link, withRouter} from "react-router-dom";
import SyncAltIcon from '@material-ui/icons/SyncAlt';
import SearchForm from "../components/searchForm"
import {withStyles} from "@material-ui/core/styles"
import MenuIcon from '@material-ui/icons/Menu';
import SideBar from "./drawer"
import SearchIcon from '@material-ui/icons/Search';
import "./../scss/header.scss"
import TopDrawer from "./topDrawer";
import Switch from '@material-ui/core/Switch';
import Avatar from '@material-ui/core/Avatar';
import image from '../images/login_bg.png'
import LogoutModal from "./logout";

const styles = theme=>({
    container:{
        display:'flex',
        alignItems:'center',
        justifyContent:'space-between'
    },
    menu:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    menuItems:{
        marginLeft:'15px'
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


const Header = (props)=>{
        const [anchorEl, setAnchorEl] = useState(null)
        const [state, setState] = useState({
            left: false,
            top:false
          });


        const [logout, setLogout] = React.useState(false);
        const logoutRef = React.useRef(null);
        const prevOpen = React.useRef(logout);
        const toggleLogout = () => {
            setLogout((prevOpen) => !prevOpen);
          };
        

          React.useEffect(() => {
            if (prevOpen.current === true && logout === false) {
              logoutRef.current.focus();
            }
        
            prevOpen.current = logout;
          }, [logout]);

        const [dashboard, setDashboard] = useState(false)
        const handleClick = (event) => {
            setAnchorEl(event.currentTarget);
        };
    
        const handleClose = () => {
        setAnchorEl(null);
        };

        
        const toggleDrawer = (anchor, open) => (event) => {
            if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
              return;
            }
        
            setState({ ...state, [anchor]: open });
          };
        const {classes} = props
    return(
        <>
            {
                props.location.pathname.includes('app')?
                <AppBar elevation={0} classes={{root:classes.app}} position="fixed"  color="primary">
                    <Toolbar style={{padding:0}}>
                        <Grid container justify="center" alignItems="center">
                            <Grid item xs={11} lg={10} >
                                <Grid container alignItems="center">
                                    <Grid  item xs={7} lg={8}>
                                        <Button style={{justifySelf:'flex-start', justifyContent:'flex-start'}} className="mobile-menu" >
                                            <MenuIcon/>
                                        </Button>
                                        <Typography className="dashboard-mobile-menu" variant="h5" style={{color:'#707070', fontWeight:'bold'}}>{process.env.REACT_APP_NAME?process.env.REACT_APP_NAME.toUpperCase():'React App'}</Typography>
                                    </Grid>
                                    <Grid item  xs={5} lg={4}> 
                                        <Grid container alignItems="center" justify="flex-end">
                                            <Typography className="dashboard-mobile-menu" component="div">
                                                <Grid component="label" container alignItems="center" spacing={1}>
                                                    <Grid item className={dashboard?classes.active:classes.inactive}>Hosting</Grid>
                                                    <Grid item>
                                                        <Switch checked={!dashboard} onChange={()=>{setDashboard(!dashboard)}} name="checkedC" />
                                                    </Grid>
                                                    <Grid item className={dashboard?classes.inactive:classes.active}>Renting</Grid>
                                                    </Grid>
                                            </Typography>
                                            <IconButton
                                            ref={logoutRef}
                                            aria-controls={logout ? 'menu-list-grow' : undefined}
                                            aria-haspopup="true"
                                            onClick={toggleLogout}
                                            style={{marginLeft:40}}
                                            >
                                                <Avatar style={{ width:25,height:25}} src={image} alt="jone doe"/>
                                            </IconButton>
                                            <LogoutModal logout={logout} logoutRef={logoutRef} setLogout={setLogout} />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
                :
            <AppBar position="fixed"  color="primary">
                <Toolbar style={{padding:0}}>
                    <div className="mobile-menu">
                        <Button  onClick={toggleDrawer('left',true)}><MenuIcon /></Button>
                        <Button onClick={toggleDrawer('top',true)}><SearchIcon /></Button>
                    </div>
                    <Grid className="header" container alignItems="center" justify="center">
                        <Grid item xs={10} className={classes.container}>
                            <Link className={classes.brand} to={'/'}>
                                <Typography style={{color:'#707070'}} variant="h4">{process.env.REACT_APP_NAME?process.env.REACT_APP_NAME.toUpperCase():'React App'}</Typography>
                            </Link>
                            <SideBar state={state} toggleDrawer={toggleDrawer}/>
                            <TopDrawer classes={classes} location={props.location.pathname} state={state} toggleDrawer={toggleDrawer}/>
                            <div className={classes.menu}>
                                <div>
                                    <Button  style={{color:'#046FA7'}} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                                        EN
                                    </Button>
                                    <Menu
                                        anchorEl={anchorEl}
                                        keepMounted
                                        variant="selectedMenu"
                                        open={Boolean(anchorEl)}
                                        onClose={handleClose}
                                    >
                                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                                        <MenuItem onClick={handleClose}>My account</MenuItem>
                                        <MenuItem onClick={handleClose}>Logout</MenuItem>
                                    </Menu>
                                </div>
                                <div className={classes.menuItems} style={{backgroundColor:'#EB4F1E', borderRadius:'10px'}}>
                                    <Button style={{fontSize:'12px', textTransform:'capitalize',color:'#fff'}} >Host Accommodation</Button>
                                </div>
                                <div className={classes.menuItems}>
                                    <Link color="textPrimary" to="/register">Signup</Link>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </Toolbar>
                {
                    props.location.pathname === '/search' || props.location.pathname ==='/single'?
                    <>
                        <Toolbar className="header-search-form" style={{padding:0, backgroundColor:'#f1f1f1'}}>
                            <SearchForm/>
                        </Toolbar>
                        {
                            props.location.pathname === '/search'?
                            <Toolbar className="header-search-form" style={{padding:0, backgroundColor:'#fff'}}>
                            <Grid container>
                                <Grid item xs={false} md={1}/>
                                <Grid item xs={12} md={5}>
                                    <ul style={{listStyle:'none', display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                                        <li className={classes.searchItem}>Price</li>
                                        <li className={classes.searchItem}>Bedrooms</li>
                                        <li className={classes.searchItem}>Instant Book</li>
                                        <li className={classes.searchItem}>Type of Place</li>
                                        <li style={{padding:'5px 15px',boxShadow: '0px 3px 6px #00000029', borderRadius:10, fontSize:10,display:'flex',alignItems:'center'}} className={classes.searchItem}><SyncAltIcon style={{fontSize:16, color:'#270000'}} />More Filters</li>
                                    </ul>
                                </Grid>
                            </Grid>
                        </Toolbar>
                        :null
                        }
                    </>
                    :null
                }
            </AppBar>
            }
        </>
    )
}
export default withRouter(withStyles(styles)(Header));