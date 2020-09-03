import React from "react";
import {Paper, Typography} from "@material-ui/core"
import {withStyles} from "@material-ui/core/styles"
const styles=()=>({
    root:{
        height:180,
        width:'100%',
        border: "1.5px solid #CFCFCF",
        borderRadius:25,
        display:'flex',
        justifyContent:'center',
        alignItems:'flex-end'
    },
    image:{
        height:80,
        width:80,
    },
    imageContainer:{
        display:'flex',
        width:'100%',
        justifyContent:'center'
    },
    content:{
        marginBottom:25
    },
    text:{
        marginTop:2,
        fontSize:'1.45rem',
        textAlign:'center'
    }
})
const IconBox = ({classes,name,image})=>{
    return(
        <Paper classes={{root:classes.root}} elevation={2}>
            <div className={classes.content}>
                <div className={classes.imageContainer}> 
                    <img className={classes.image} src={image} alt=""/>
                </div>
                <Typography color="textSecondary" classes={{root:classes.text}}>{name}</Typography>
            </div>
        </Paper>
    )
}
export default withStyles(styles)(IconBox);