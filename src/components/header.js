import React, {useState} from "react"
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {MenuItem, Grid, Select} from '@material-ui/core';
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

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AppHeader from "./appHeader";

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


const Header = (props)=>{
        const [state, setState] = useState({
            left: false,
            top:false
          });
        const [lang, setLang]= useState('en')

        


    
        const handleChange = (e) => {
        setLang(e.target.value);
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
                props.location.pathname.includes('app') || props.location.pathname.includes('admin')?
                <AppHeader classes={classes}/>

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
                                    {/* <Button  style={{color:'#046FA7'}} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
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
                                    </Menu> */}
                                    <Select
                                      value={lang}
                                      onChange={handleChange}
                                    inputProps={{ 'aria-label': 'lang' }}
                                    displayEmpty="EN"
                                    IconComponent={ExpandMoreIcon}
                                    classes={{selectMenu:{color:'#046FA7'}}}
                                    >
                                        
                                    <MenuItem value="en">
                                        EN
                                    </MenuItem>
                                    <MenuItem value='fr'>FR</MenuItem>
                                    <MenuItem value='ge'>GE</MenuItem>
                                    </Select>
                                </div>
                                <div className={classes.menuItems} style={{backgroundColor:'#EB4F1E', borderRadius:'10px'}}>
                                    <Link to="/login">
                                        <Button style={{fontSize:'12px', textTransform:'capitalize',color:'#fff'}} >Host Accommodation</Button>
                                    </Link>
                                </div>
                                <div className={classes.menuItems}>
                                    <Link color="textPrimary" style={{color:'#000000', fontWeight:'bold'}} to="/register">Signup</Link>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </Toolbar>
                {
                    props.location.pathname.includes('search') || props.location.pathname.includes('crib')?
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