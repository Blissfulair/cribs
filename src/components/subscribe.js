import React from "react";
import {TextField,Button,withStyles}from "@material-ui/core";

const styles = ()=>({
    input:{
        backgroundColor:'#fff',
        "& *":{
            border:'none',
            borderRadius:0
        }
    },
    form:{
        width:'100%',
        display:'grid',
        gridTemplateColumns:'69% 28%',
        gridColumnGap:'3%'
    },
    btn:{
        borderRadius:30,
        color:'#fff',
        textTransform:'capitalize'
    }
})
const Subscribe = ({classes})=>{
    return(
        <form className={classes.form}>
            <TextField variant="outlined" classes={{root:classes.input}} label="Email Address"/>
            <Button classes={{root:classes.btn}} variant="contained" color="secondary">Subscribe</Button>
        </form>
    )
}
export default withStyles(styles)(Subscribe);