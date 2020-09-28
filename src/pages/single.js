import React, {useState} from "react";
import {withStyles} from "@material-ui/core/styles"
import {Grid,Button, Typography,Paper,Tabs,Tab, TextField, Divider, Avatar} from '@material-ui/core';
import image from "../images/login_bg.png"
import DetailSlide from "../components/detailSlide";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import OpenInBrowserSharpIcon from '@material-ui/icons/OpenInBrowserSharp';
import Rating from '@material-ui/lab/Rating';
import Calendar from "@material-ui/icons/Today"
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
        minHeight:500,
        borderRadius:0,
        backgroundColor:'#F8F8F8'
    },
    checkIn:{
        height:'50px',
        display:'flex',
        alignItems:'center',
        backgroundColor:'#fff',
        border: '1px solid #DCDCDC',
        padding:'0px 16px'
    },
    guest:{
        marginTop:17,
        marginBottom:17
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
                                                <Grid item xs={9}>
                                                    <Typography variant='subtitle2' component="p">
                                                        <Typography style={{color:'#00A8C8', fontWeight:'bold',display:'inline-flex'}} variant="h5">‎₦2000</Typography> avg/night
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
                                                <Grid item xs={3}>
                                                    <Grid container spacing={1} alignItems="center">
                                                        <Grid item xs={6}>
                                                            <FavoriteBorderIcon  style={{fontSize:32}} htmlColor="#000000"/>
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <Typography>Save</Typography>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid container spacing={1} alignItems="center">
                                                        <Grid item xs={6}>
                                                            <OpenInBrowserSharpIcon  style={{fontSize:32}} htmlColor="#000000"/>
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <Typography>Share</Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Typography variant="subtitle2" component="p" >Dates Are Available to be Reserved</Typography>
                                            <form autoComplete="off">
                                               <Grid container spacing={1}>
                                                   <Grid item xs={6}>
                                                        <div className={classes.checkIn}>
                                                            <label htmlFor="check-in">
                                                                <Calendar htmlColor="#00A8C8" fontSize="small" />
                                                            </label>
                                                            <TextField className="single" id="check-in" label="Check-in" variant="outlined" />
                                                        </div>
                                                   </Grid>
                                                   <Grid item xs={6}>
                                                        <div className={classes.checkIn}>
                                                            <label htmlFor="check-out">
                                                                <Calendar htmlColor="#00A8C8" fontSize="small" />
                                                            </label>
                                                            <TextField className="single" id="check-out"  label="Check-Out" variant="outlined" />
                                                        </div>
                                                   </Grid>
                                               </Grid>
                                                <div className={classes.guest}>
                                                    <div className={classes.checkIn}>
                                                        <label htmlFor="check-out">
                                                            <Calendar htmlColor="#00A8C8" fontSize="small" />
                                                        </label>
                                                        <TextField className="single" id="guest"  label="Guests" variant="outlined" />
                                                    </div>
                                                </div>
                                                <Grid container spacing={1}>
                                                    <Grid item xs={8}>
                                                        <Typography variant="h5">Total</Typography>
                                                        <Typography variant="caption" component="p">Includes taxes and fees</Typography>
                                                    </Grid>
                                                    <Grid item xs={4}>
                                                        <Typography variant="h5" style={{color:'#FF9C07',textAlign:'right',fontWeight:'bold'}}>₦120,000</Typography>
                                                        <Typography variant="caption"  component="p">view details</Typography>
                                                    </Grid>
                                                </Grid>
                                                <Button style={{textTransform:'capitalize', backgroundColor:'#00A8C8', width:'100%', borderRadius:44, color:'#fff',padding:'10px 0', fontSize:18,marginTop:15}} variant="contained" color="#00A8C8" disableElevation>
                                                    Reserve Now
                                                </Button>
                                                <Divider style={{marginTop:15, height:3, backgroundColor:'#DCDCDC'}}/>
                                                <Typography variant="h6" style={{textAlign:'center', color:'#000000'}} >Speak to the Host</Typography>
                                                <Grid container style={{marginTop:10,marginBottom:5}}>
                                                    <Grid item xs={3}>
                                                        <Avatar alt="host" style={{width:50, height:50}} src={image}/>
                                                    </Grid>
                                                    <Grid item xs={9}>
                                                        <Typography variant="subtitle" color="#000000" component="p">Richard Nachos</Typography>
                                                        <Typography variant="caption"  component="p">Contact host</Typography>
                                                    </Grid>
                                                </Grid>
                                            </form>
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