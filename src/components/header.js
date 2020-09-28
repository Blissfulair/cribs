import React, {useState} from "react"
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {MenuItem, Grid} from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import {Link, withRouter} from "react-router-dom";
import SyncAltIcon from '@material-ui/icons/SyncAlt';
import SearchForm from "../components/searchForm"
import {withStyles} from "@material-ui/core/styles"

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
    }
})
const Header = (props)=>{
        const [anchorEl, setAnchorEl] = useState(null);

        const handleClick = (event) => {
            setAnchorEl(event.currentTarget);
        };
    
        const handleClose = () => {
        setAnchorEl(null);
        };

        const {classes} = props
        console.log(props.location)
    return(
        <AppBar position="fixed"  color="primary">
            <Toolbar style={{padding:0}}>
                <Grid container alignItems="center" justify="center">
                    <Grid item xs={10} className={classes.container}>
                        <Link className={classes.brand} to={'/'}>
                            <Typography style={{color:'#707070'}} variant="h4">CRIB NG</Typography>
                        </Link>
                        <div className={classes.menu}>
                            <div>
                                <Button style={{color:'#046FA7'}} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
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
                                <Link color="textPrimary" to="/">Signup</Link>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </Toolbar>
            {
                props.location.pathname === '/search' || props.location.pathname ==='/single'?
                <>
                    <Toolbar style={{padding:0, backgroundColor:'#f1f1f1'}}>
                        <SearchForm/>
                    </Toolbar>
                    {
                        props.location.pathname === '/search'?
                        <Toolbar style={{padding:0, backgroundColor:'#fff'}}>
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
    )
}
export default withRouter(withStyles(styles)(Header));