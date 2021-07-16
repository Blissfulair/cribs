import React from "react";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";
import {withStyles} from "@material-ui/core/styles"
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

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
        height:300,
        minWidth:249,
        position:'relative',
        marginBottom:20,
       
    },
    image:{
        borderRadius:16,
        height:'65%',
        width:'100%',
        position:'relative'
    },
    overlay:{
        position:'absolute',
        top:0,
        left:0,
        height:'100%',
        width:'100%',
        opacity: 0.35
    }
})
const Trending = ({classes, color,name, details,favourite})=>{
    return(
        <div style={{ border:'1px solid #0066FF', padding:'20px 8px', borderRadius:16}} >
        <Card className="trending-card" elevation={0} classes={{root:classes.root}}>
            <CardActionArea classes={{root:classes.image}}>
                <CardMedia image={`${process.env.REACT_APP_BACKEND_URL}/${details.featuredImage}`}
                        component="img"
                        alt={details.name}
                        height="100%"
                />
                <div style={{zIndex:34, position:'absolute',height:'94%', width:'98%', top:'3%', left:'1%'}}>
                    {

                            favourite?
                            <FavoriteIcon  style={{fontSize:32}} htmlColor="#C8BB00"/>
                            :
                            <FavoriteBorderIcon  style={{fontSize:32}} htmlColor="#fff"/>
                    }
                    <div style={{position:'absolute', bottom:0}}>
                        <Rating
                        name={name}
                        defaultValue={details.rateValue/details.totalReviewer}
                        precision={0.5}
                        disabled
                        style={{fontSize:20, color:'#fff'}}
                        emptyIcon={<StarBorderIcon htmlColor="#fff" style={{fontSize:20}} />}
                        />
                    </div>
                </div>
                <div className={classes.overlay} style={{backgroundColor:color}}>
                </div>
                <CardContent>
                    <Typography className={classes.para} style={{fontWeight:'bold'}} variant="h5">{details.title}</Typography>
                    <Typography color="textPrimary" className={classes.para} variant="subtitle1" component="p">{details.name}</Typography>
                    <Typography className={classes.para1} variant="subtitle2" component="p">Sleeps 10 - {details.bedroom} BR - {details.bathroom} BA</Typography>
                    <Typography className={classes.para} style={{fontWeight:'bold',display:'inline', marginRight:10}} variant="h6">‎₦{details.amount}</Typography>
                    <span>
                        avg/night
                    </span>
                </CardContent>
            </CardActionArea>
        </Card>
        </div>
    )
}
export default withStyles(styles)(Trending)