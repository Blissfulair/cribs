import React from "react"
import "./splash.css"
import {withStyles} from "@material-ui/core"
const styles = ()=>({
    container:{
        display:'flex',
        backgroundColor:'#fff',
        width:'100%',
        height:'100vh',
        justifyContent:'center',
        alignItems:'center',
        position:'fixed',
        top:0,
        left:0,
        zIndex:-1
    },
})
const Splash =({classes})=>{
    return(
        <div className={classes.container}>
            <div className='app-spinner'>
                
            </div>
        </div>
    )
}
export default withStyles(styles)(Splash);