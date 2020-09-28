import React from "react";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";
import image from "../images/login_bg.png"
import {withStyles} from "@material-ui/core/styles"
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';

const styles = ()=>({
    para:{
        fontSize:15,
    },
    para1:{
        fontSize:12,
        marginBottom:7
    },
    root:{
        borderRadius:16,
        height:340,
        position:'relative'
    },
    overlay:{
        position:'absolute',
        top:0,
        left:0,
        height:'65%',
        width:'100%',
        opacity: 0.35
    }
})
const Trending = ({classes, rating, color,name})=>{
    return(
        <Card elevation={3} classes={{root:classes.root}}>
            <CardActionArea classes={{root:classes.root}}>
                <CardMedia image={image}
                        component="img"
                        alt="Contemplative Reptile"
                        height="65%"
                />
                <div style={{zIndex:34, position:'absolute',height:'60%', width:'98%', top:'3%', left:'1%'}}>
                    <FavoriteBorderIcon  style={{fontSize:32}} htmlColor="#fff"/>
                    <div style={{position:'absolute', bottom:0}}>
                        <Rating
                        name={name}
                        defaultValue={rating}
                        precision={0.5}
                        
                        style={{fontSize:20, color:'#fff'}}
                        onClick={(value)=>{if(value.target.value !== undefined)console.log(value.target.value)}}
                        ///getLabelText={(value)=>{console.log(value, props.name)}}
                        emptyIcon={<StarBorderIcon htmlColor="#fff" style={{fontSize:20}} />}
                        />
                    </div>
                </div>
                <div className={classes.overlay} style={{backgroundColor:color}}>
                </div>
                <CardContent>
                    <Typography className={classes.para} style={{fontWeight:'bold'}} variant="h5">Ikeja, Lagos, Ng</Typography>
                    <Typography color="textPrimary" className={classes.para} variant="subtitle1" component="p">Mary's Garden</Typography>
                    <Typography className={classes.para1} variant="subtitle2" component="p">Sleeps 10 - 4 BR - 3 BA</Typography>
                    <Typography className={classes.para} style={{fontWeight:'bold',display:'inline', marginRight:10}} variant="h6">‎₦2000</Typography>
                    <span>
                        avg/night
                    </span>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}
export default withStyles(styles)(Trending)