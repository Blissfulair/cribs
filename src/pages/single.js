import React, {useState} from "react";
import {withStyles} from "@material-ui/core/styles"
import {Select, FormControl,Grid,MenuItem, Typography,Paper,Tabs,Tab} from '@material-ui/core';
import image from "../images/login_bg.png"
import DetailSlide from "../components/detailSlide";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import OpenInBrowserSharpIcon from '@material-ui/icons/OpenInBrowserSharp';
import Rating from '@material-ui/lab/Rating';
const styles = theme =>({
    container:{
        paddingTop:140
    },
    formControl: {
        minWidth: 120,
        flexDirection:'row',
        alignItems:'flex-start',
      },
    input:{
        paddingTop:0,
        marginLeft:10
    },
    text:{
        color:'#070000'
    },
    title:{
        margin:'40px 0 20px 0',
        fontSize:'28px'
    },
    background:{
        backgroundSize:'cover',
        backgroundPosition:'center',
        position:'relative'
    },
    overlay:{
        backgroundColor:'#C8BB00',
        opacity: 0.35,
        position:'absolute',
        top:0,
        left:0,
        width:'100%',
        height:'100%'
    },
    overlay1:{
        backgroundColor:'#000000',
        opacity: 0.41,
        position:'absolute',
        top:0,
        left:0,
        width:'100%',
        height:'100%',
        zIndex:3
    },
    root: {
        flexGrow: 1,
        borderRadius:0,
        marginTop:30
      },
    payment:{
        height:500,
        borderRadius:0,
        backgroundColor:'#F8F8F8'
    }
})
const Single = ({classes})=>{
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    return(
            <Grid container justify="center">
                <Grid item xs={11} md={10}>
                    <div className={classes.container}>
                        <Grid container justify="flex-start" style={{position:'relative'}} spacing={3}>
                            <Grid item xs={12} md={8}>
                                <Grid container>
                                    <Grid item xs={4}>
                                        <div className={classes.background} style={{ height:200, backgroundImage:`url(${image})`}}>
                                            <div className={classes.overlay}></div>
                                        </div>
                                        <div className={classes.background} style={{ height:200, backgroundImage:`url(${image})`}}></div>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <div className={classes.background} style={{height:400}}>
                                            <div className={classes.overlay1}></div>
                                            <DetailSlide content={[1,1,1,1]}/>
                                        </div>
                                    </Grid>
                                </Grid>
                                <Paper elevation={0} className={classes.root}>
                                <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    indicatorColor="#00A8C8"
                                    textColor="#00A8C8"
                                    centered
                                >
                                    <Tab label="Overview" />
                                    <Tab label="Amenities" />
                                    <Tab label="Reviews & Location" />
                                    <Tab label="Location"/>
                                </Tabs>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Paper className={classes.payment}>
                                    <Grid container justify="center">
                                        <Grid item xs={11}>
                                            <Grid style={{marginTop:10}} container>
                                                <Grid item xs={10}>
                                                    <Typography variant='subtitle2' component="p">
                                                        <Typography>‎₦2000</Typography>avg/night
                                                    </Typography>
                                                    <Typography variant="subtitle2" component="p">
                                                        3 Guests | 3 Bedrooms | 3 beds | 2 Baths
                                                    </Typography>
                                                    <Typography variant="subtitle2" component="p">
                                                        Excellent 4.7/5 Good for families
                                                    </Typography>
                                                    <Rating
                                                    name='kls'
                                                    defaultValue={4}
                                                    
                                                    style={{fontSize:20, color:'#000000'}}
                                                    />
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <FavoriteBorderIcon  style={{fontSize:32}} htmlColor="#000000"/>
                                                    <Typography>Save</Typography>
                                                    <div>
                                                    <OpenInBrowserSharpIcon  style={{fontSize:32}} htmlColor="#000000"/>
                                                    <Typography>Share</Typography>
                                                    </div>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
            </Grid>
  
    )
}
export default withStyles(styles)(Single);