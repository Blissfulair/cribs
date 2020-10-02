import React from "react"
import {Grid, Avatar, Typography, Divider} from "@material-ui/core"
import image from "../images/login_bg.png"
import Rating from '@material-ui/lab/Rating';

const Review = ({data, number})=>{
    return(
        <>
        <Grid container spacing={4} alignItems="center">
            <Grid item xs={8}>
                <Rating
                name='kls'
                defaultValue={5}
                
                style={{fontSize:15, color:'#000000', margin:'15px 0'}}
                />
                <Typography>
                Luqman Business traveler Oct 16, 2019 Flat. Stayed 3 nights in Oct 2019
                </Typography>
            </Grid>
            <Grid item xs={4}>
                <Grid container justify="flex-end">
                    <Avatar style={{height:60,width:60}} src={image} alt="reviewer"/>
                </Grid>
            </Grid>
        </Grid>
        {
            data.length-1 !== number && <Divider style={{backgroundColor:'#AAAAAA', marginTop:10}}/>
        }
        </>
    )
}
export default Review;