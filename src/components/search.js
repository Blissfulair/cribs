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
        color:'#000000'
    },
    para1:{
        fontSize:12,
        marginBottom:7,
        color:'#000'
    },
    root:{
        borderRadius:16,
        height:220,
        position:'relative',
        display:'flex',
        backgroundColor:'#FCFBFB',
    },
    overlay:{
        position:'absolute',
        top:0,
        left:0,
        height:'100%',
        width:'100%',
        opacity: 0.35,
        backgroundColor:'#C8BB00'
    },
    media:{
        width:'45%',
        height:'100%',
        position: 'absolute',
        left: 0
    }
})
const Search = ({classes, rating, color,name,props})=>{
    return(
        <Card elevation={3} style={{margin:'15px 0'}} classes={{root:classes.root}}>
            <CardActionArea classes={{root:classes.root}} onClick={()=>props.push('/single')}>
                <div className={classes.media}>
                    <CardMedia image={image}
                            component="img"
                            alt="Contemplative Reptile"
                            height="100%"
                    />
                    <div style={{zIndex:34, position:'absolute',height:'100%', width:'98%', top:'3%', left:'1%'}}>
                        <FavoriteBorderIcon  style={{fontSize:32}} htmlColor="#fff"/>
                    </div>
                    <div className={classes.overlay}>
                    </div>
                </div>
                <div>
                    <CardContent style={{position:'absolute',left:'45%', top:0}}>
                        <Typography className={classes.para} style={{fontWeight:'bold'}} variant="h5">Ikot, Calabar, Ng</Typography>
                        <Typography  className={classes.para} variant="subtitle1" component="p">Mary's Garden</Typography>
                        <Typography className={classes.para1} style={{marginBottom:30}}  variant="subtitle2" component="p">3 Guests | 3 Bedrooms | 3 beds | 2 Baths</Typography>
                        <Typography className={classes.para1} variant="subtitle2" component="p">Excellent 4.7/5 Good for families</Typography>
                        <Typography>
                            <Rating
                                name={name}
                                defaultValue={rating}
                                precision={0.5}
                                
                                style={{fontSize:20, color:'#000000'}}
                                onClick={(value)=>{if(value.target.value !== undefined)console.log(value.target.value)}}
                                ///getLabelText={(value)=>{console.log(value, props.name)}}
                                emptyIcon={<StarBorderIcon htmlColor="#000000" style={{fontSize:20}} />}
                                />
                        </Typography>
                        
                        <Typography className={classes.para} style={{fontWeight:'bold',display:'inline', marginRight:10}} variant="h6">‎₦2000</Typography>
                        <span style={{color:'#000000'}}>
                            avg/night
                        </span>
                    </CardContent>
                </div>
            </CardActionArea>
        </Card>
    )
}
export default withStyles(styles)(Search)