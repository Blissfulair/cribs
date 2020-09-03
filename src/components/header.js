import React, {useState} from "react"
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {MenuItem, Grid} from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import {Link} from "react-router-dom";
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
    return(
        <AppBar position="fixed"  color="primary">
            <Toolbar style={{padding:0}}>
                <Grid container alignItems="center" justify="center">
                    <Grid item xs={10} className={classes.container}>
                        <div>
                            <Typography style={{color:'#707070'}} variant="h4">CRIB NG</Typography>
                        </div>
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
        </AppBar>
    )
}
export default withStyles(styles)(Header);