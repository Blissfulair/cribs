import React from "react";
import {Link} from 'react-router-dom';
import CardMedia from '@material-ui/core/CardMedia';
import image from "../logo.svg"
import {withStyles} from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"

const styles = (theme)=>({
    cardLink:{
        height:200,
        width:'98%'
    },
    media: {
        height: 0,
        paddingTop: '60%' // 16:9
     },
     card: {
        position: 'relative'
     },
     overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        height:'100%',
        width:'100%',
        opacity:0.35,
     }
})
const City = (props)=>{
    const {classes} = props
    return(
        <Link className={classes.cardLink} to={'/'}>
            <div className={classes.card}>
                <CardMedia className={classes.media} image={image}/>
                <div style={{backgroundColor:props.color}} className={classes.overlay}>
                    <div style={{position:'absolute',bottom:10,display:'flex',justifyContent:'center', width:'100%'}}>
                        <div style={{width:'90%', margin:'0 auto 20px'}}>
                            <Typography style={{textAlign:'center', color:'#fff', fontSize:'30px'}} variant="h5">{props.name}</Typography>
                            <Typography style={{ color:'#fff', fontSize:'12px'}} variant="subtitle1" component="p">{props.description}</Typography>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}
export default withStyles(styles)(City);