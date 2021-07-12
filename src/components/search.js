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
import {Link} from "react-router-dom"
import FavoriteIcon from '@material-ui/icons/Favorite';
import { connect } from "react-redux";

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
const Search = ({classes, content, rating,name, favourite, user})=>{
    console.log(content)
    return(
    <Link to={user?`/app/crib/${content._id}`:`/crib/${content._id}`}>
        <Card className="fav-search" elevation={3} style={{margin:'15px 0'}} classes={{root:classes.root}}>
            <CardActionArea classes={{root:classes.root}}>
                <div className={classes.media}>
                    <CardMedia image={`${process.env.REACT_APP_BACKEND_URL}/`+content.featuredImage}
                            component="img"
                            alt={content.name}
                            height="100%"
                    />
                    <div style={{zIndex:34, position:'absolute',height:'100%', width:'98%', top:'3%', left:'1%'}}>
                        {
                            favourite?
                            <FavoriteIcon  style={{fontSize:32}} htmlColor="#EB4F1E"/>
                            :
                            <FavoriteBorderIcon  style={{fontSize:32}} htmlColor="#fff"/>
                        }
                    </div>
                    <div className={classes.overlay}>
                    </div>
                </div>
                <div>
                    <CardContent style={{position:'absolute',left:'45%', top:0}}>
                        <Typography className={classes.para} style={{fontWeight:'bold'}} variant="h5">{content.city}, {content.state}, Ng</Typography>
                        <Typography  className={classes.para} variant="subtitle1" component="p">{content.name}</Typography>
                        <Typography className={classes.para1} style={{marginBottom:30}}  variant="subtitle2" component="p">{content.guest} Guests | {content.bedroom} Bedrooms | {content.bedroom} beds | {content.bathroom} Baths</Typography>
                        <Typography className={classes.para1} variant="subtitle2" component="p">Excellent 4.7/5 Good for families</Typography>
                        <Typography>
                            <Rating
                                name={name}
                                // defaultValue={content.rateValue/content.totalReviewer}
                                defaultValue={5}
                                precision={0.5}
                                disabled
                                style={{fontSize:20, color:'#000000'}}
                                ///getLabelText={(value)=>{console.log(value, props.name)}}
                                emptyIcon={<StarBorderIcon htmlColor="#000000" style={{fontSize:20}} />}
                                />
                        </Typography>
                        
                        <Typography className={classes.para} style={{fontWeight:'bold',display:'inline', marginRight:10}} variant="h6">‎₦{content.amount}</Typography>
                        <span style={{color:'#000000'}}>
                            avg/night
                        </span>
                    </CardContent>
                </div>
            </CardActionArea>
        </Card>
    </Link>
    )
}
const mapStateToProps=state=>({
    user:state.user
})
export default connect(mapStateToProps)(withStyles(styles)(Search))