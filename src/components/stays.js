import React from "react";
import {Link} from 'react-router-dom';
import CardMedia from '@material-ui/core/CardMedia';
import Grow from '@material-ui/core/Grow';
import {withStyles} from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import "./stays.css"

const styles = (theme)=>({
    media: {
        height: '100%',
        // paddingTop: '130%' // 16:9
     },
     card: {
        position: 'relative',
        border: '1px solid #DCDCDC',
     },
     overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        height:'100%',
        width:'100%',
        opacity:0.55,
        color: 'black',
     }
})
const Stays = (props)=>{
    const {classes} = props
    return(
        <Link className="card-link" to={'/'}>
            <Grow in={true} disableStrictModeCompat>
            <div className={classes.card} style={{height:props.height?props.height:340}} > 
                <CardMedia className={classes.media} image={props.image}/>
                <div style={{backgroundColor:props.color}} className={classes.overlay}>
                    <div style={{position:'absolute',bottom:10,display:'flex',justifyContent:'center', width:'100%'}}>
                        <div>
                            <Typography style={{textAlign:'center', color:'#fff', fontSize:'31px', fontWeight:'bold'}} variant="h5">{props.title}</Typography>
                            <Typography style={{textAlign:'center', color:'#fff', fontSize:'18px', fontWeight:'bold'}} variant="subtitle1" component="p">{props.available}+ Availbale</Typography>
                        </div>
                    </div>
                </div>
            </div>
            </Grow>
        </Link>
    )
}
export default withStyles(styles)(Stays);