import React, {Component} from "react";
import {withStyles} from "@material-ui/core/styles"
import {
    Grid,
    Button, 
    Typography,
    Paper,
    Tabs,
    Tab, 
    TextField, 
    Divider, 
    Avatar,
    Box,
    LinearProgress,
} from '@material-ui/core';
import DetailSlide from "../../components/detailSlide";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import OpenInBrowserSharpIcon from '@material-ui/icons/OpenInBrowserSharp';
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
import BusinessIcon from '@material-ui/icons/Business';
import KingBedIcon from '@material-ui/icons/KingBedOutlined';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import BathtubIcon from '@material-ui/icons/BathtubOutlined';
import KitchenIcon from '@material-ui/icons/Kitchen';
import LocalParkingIcon from '@material-ui/icons/LocalParking';
import TvIcon from '@material-ui/icons/Tv';
import WifiIcon from '@material-ui/icons/Wifi';
import Rating from '@material-ui/lab/Rating';
import Calendar from "@material-ui/icons/Today"
import SmokeFreeIcon from '@material-ui/icons/SmokeFree';
import { DatePicker } from "@material-ui/pickers";
import  MapContainer  from "../../components/map";
import Review from "../../components/review"
import { withRouter} from "react-router-dom"
import './../../scss/single.scss'
import AppContext from "../../state/context";
import Splash from "../../components/splash";
import PopUP from "../../components/popup";
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
    },
    position:{
        display:'flex',
        alignItems:'center',
        marginBottom:25
    },
    textTitle:{
        marginLeft:10
    },
    subTitle:{
        color:'#000000',
        fontWeight:'bold',
        margin:'23px 0'
    },
    progressBarTitle:{
        color:'#00B2CE',
        marginTop:20,
        fontSize:13,
        marginBottom:2
    }
})
const BorderLinearProgress = withStyles((theme) => ({
    root: {
      height: 15,
      borderRadius: 8,
    },
    colorPrimary: {
      backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 0 : 700],
    },
    bar: {
      borderRadius: 8,
      backgroundColor: '#00B2CE',
    },
  }))(LinearProgress);

class Single extends Component{
    static contextType = AppContext
    constructor(props){
        super(props)
        this.state={
            value:0,
            property:null,
            checkIn: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
            checkOut:new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
            days:1,
            open:false
        }
        this.propert = null
    }

    handleChange = (event, newValue) => {
      this.setState({value:newValue});
    };

    handleClickOpen = () => {
      this.setState({open:true});
    };
  
    handleClose = () => {
      this.setState({open:false});
    };
    setDays = ()=>{
        let time = this.state.checkOut.getTime()-this.state.checkIn.getTime()
        const days = time/(1000*3600*24)
        if(days>=0)
        this.setState({days:days+1})
        else{
            this.setState({days:1})  
        }
    }
    componentDidMount(){
        const id = this.props.location.pathname.split('crib')[1]
        this.context.getPropertyById(id)
        this.setState({
            property:this.context.state.property,
            checkIn:this.context.state.searchQuery?new Date(this.context.state.searchQuery.checkIn):new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
            checkOut:this.context.state.searchQuery?new Date(this.context.state.searchQuery.checkOut):new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())
        })
    }
    // useEffect(()=>{
        // const id = location.pathname.split('crib')[1]
        // getPropertyById(id)
        // setProperty(state.property)
    // }, [getPropertyById,location.pathname,state.property])
    componentWillUnmount(){
        this.propert=null
    }

    onReserved = (id)=>{
        this.context.reserveCrib(id, this.state.checkIn,this.state.checkOut)
        this.props.history.push('/payment')
    }
    render(){

    const data = [1,3,4,5]
    const {classes} = this.props
    this.propert = this.context.state.property
    const property =this.propert
    const summary = {
        checkIn:this.state.checkIn,
        checkOut:this.state.checkOut,
        nights:this.state.days,
        amount:property?property.amount:0
    }
    if(!Boolean(property))
    return <Splash/>
    return(
            <Grid container justify="center">
                <Grid item xs={11} md={10}>
                    <div id="singlepage" className={classes.container}>
                        <Grid container justify="flex-start" style={{position:'relative'}} spacing={3}>
                            <Grid item xs={12} md={8}>
                                <Grid container>
                                    <Grid item xs={4}>
                                        <div className={classes.background} id="slideTop" style={{ backgroundImage:`url(${property.featuredImage})`}}>
                                            <div className={classes.overlay}></div>
                                        </div>
                                        <div className={classes.background} id="slideBottom" style={{ backgroundImage:`url(${property.images[0]})`}}></div>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <div className={classes.background} id="slide-cover">
                                            <div className={classes.overlay1}></div>
                                            <DetailSlide content={[property.featuredImage, ...property.images]}/>
                                        </div>
                                    </Grid>
                                </Grid>
                                <Paper elevation={0} className={classes.root}>
                                <Tabs
                                    value={this.state.value}
                                    onChange={this.handleChange}
                                   
                                    centered
                                >
                                    <a href="#overview">
                                        <Tab label="Overview"/>
                                    </a>
                                    <a href="#amenities">
                                        <Tab label="Amenities" />
                                    </a>
                                    <a href="#reviews">
                                        <Tab label="Reviews & Location" />
                                    </a>
                                   <a href="#location">
                                    <Tab label="Location"/>
                                   </a>
                                </Tabs>
                                <Box p={3}>
                                    <Typography style={{marginBottom:30}} variant="h4" id="overview">{property.name}</Typography>
                                    <Grid container spacing={2}>
                                        <Grid item xs={5}>
                                            <div className={classes.position} > 
                                            <BusinessIcon htmlColor="#00A8C8" fontSize="large"/>
                                            <Typography className={classes.textTitle}  variant="subtitle1" component="p">{property.type}</Typography>
                                            </div>
                                            <div className={classes.position}>
                                                <KingBedIcon htmlColor="#00A8C8" fontSize="large"/> 
                                                <Typography className={classes.textTitle} variant="subtitle1" component="p">{property.bedroom} Bedrooms</Typography>
                                            </div>
                                        </Grid>
                                        <Grid item xs={7}>
                                            <div className={classes.position}>
                                                <PeopleOutlineIcon htmlColor="#00A8C8" fontSize="large"/> 
                                                <Typography className={classes.textTitle} variant="subtitle1" component="p">{property.guest} Guests</Typography>
                                            </div>
                                            <div className={classes.position}>
                                                <BathtubIcon htmlColor="#00A8C8" fontSize="large"/> 
                                                <Typography className={classes.textTitle} variant="subtitle1" component="p">{property.bathroom} Bathroms</Typography>
                                            </div>
                                        </Grid>
                                    </Grid>
                                    <Divider/>
                                    <Typography variant="subtitle1" component="p" style={{margin:'15px 0', fontSize:15, wordWrap:'break-word'}}>
                                        {
                                            property.description
                                        }
                                    </Typography>
                                    
                                    <Typography className={classes.subTitle} id="amenities">
                                            Amenities
                                    </Typography>
                                    <Grid container>

                                        <Grid item xs={5}>
                                            <div className={classes.position} style={{textDecoration:property.kitchen?'none':'line-through'}} > 
                                            <KitchenIcon htmlColor="#00A8C8" fontSize="large"/>
                                            <Typography className={classes.textTitle}  variant="subtitle1" component="p">Kitchen</Typography>
                                            </div>
                                            <div className={classes.position} style={{textDecoration:property.wifi?'none':'line-through'}}>
                                                <WifiIcon htmlColor="#00A8C8" fontSize="large"/> 
                                                <Typography className={classes.textTitle} variant="subtitle1" component="p">WiFi</Typography>
                                            </div>
                                            <div className={classes.position} style={{textDecoration:property.smoke?'none':'line-through'}}>
                                                <SmokeFreeIcon htmlColor="#00A8C8" fontSize="large"/> 
                                                <Typography className={classes.textTitle} variant="subtitle1" component="p">Smoke Alarm</Typography>
                                            </div>
                                        </Grid>
                                        <Grid item xs={7}>
                                            <div className={classes.position} style={{textDecoration:property.parking?'none':'line-through'}}>
                                                <LocalParkingIcon htmlColor="#00A8C8" fontSize="large"/> 
                                                <Typography className={classes.textTitle} variant="subtitle1" component="p">Free parking on premises</Typography>
                                            </div>
                                            <div className={classes.position} style={{textDecoration:property.cable?'none':'line-through'}}>
                                                <TvIcon htmlColor="#00A8C8" fontSize="large"/> 
                                                <Typography className={classes.textTitle} variant="subtitle1" component="p">Cable TV</Typography>
                                            </div>
                                            <div className={classes.position} style={{textDecoration:property.smoke?'none':'line-through'}}>
                                                <SmokeFreeIcon htmlColor="#00A8C8" fontSize="large"/> 
                                                <Typography className={classes.textTitle} variant="subtitle1" component="p">Carbon Monoxide alarm</Typography>
                                            </div>
                                        </Grid>
                                    </Grid>
                                    <Divider/>
                                    <Typography className={classes.subTitle}>Bedrooms</Typography>
                                    <Grid container id='bedrooms'>
                                        <Grid item xs={5}>
                                            <div className={classes.position} style={{marginBottom:5}}>
                                                <KingBedIcon htmlColor="#00A8C8" fontSize="large"/> 
                                                <Typography className={classes.textTitle} variant="subtitle1" component="p">Room 1</Typography>
                                            </div>
                                            <Typography style={{marginLeft:32}} variant="caption" component="p">1 King Bed</Typography>                                        
                                        </Grid>
                                        <Grid item xs={7}>
                                            <div className={classes.position} style={{marginBottom:5}}>
                                                <KingBedIcon htmlColor="#00A8C8" fontSize="large"/> 
                                                <Typography className={classes.textTitle} variant="subtitle1" component="p">Room 2</Typography>
                                            </div>
                                            <Typography style={{marginLeft:32}} variant="caption" component="p">1 King Bed</Typography>
                                        </Grid>
                                    </Grid>

                                    <Typography className={classes.subTitle}>Bathroom</Typography>
                                    <Grid container id="bathroom">
                                        <Grid item xs={5}>
                                            <div className={classes.position} style={{marginBottom:5}}>
                                                <BathtubIcon htmlColor="#00A8C8" fontSize="large"/> 
                                                <Typography className={classes.textTitle} variant="subtitle1" component="p">Room 1</Typography>
                                            </div>
                                            <Typography style={{marginLeft:32}} variant="caption" component="p">1 King Bed</Typography>                                        
                                        </Grid>
                                        <Grid item xs={7}>
                                            <div className={classes.position} style={{marginBottom:5}}>
                                                <BathtubIcon htmlColor="#00A8C8" fontSize="large"/> 
                                                <Typography className={classes.textTitle} variant="subtitle1" component="p">Room 2</Typography>
                                            </div>
                                            <Typography style={{marginLeft:32}} variant="caption" component="p">1 King Bed</Typography>
                                        </Grid>
                                    </Grid>
                                    <Divider style={{marginTop:20}}/>

                                    <Typography className={classes.subTitle}>Accessibility</Typography>
                                    <Grid container id="accessibility" spacing={3}>
                                        <Grid item xs={5}>
                                            <Typography className={classes.textTitle} style={{marginLeft:0}} variant="subtitle1" component="p">GETTING INSIDE</Typography>  
                                            <Typography variant="caption" component="p">Well-lit path to entrance Step-free path to entrance</Typography>                                    
                                        </Grid>
                                        <Grid item xs={5}>
                                            <Typography className={classes.textTitle} style={{marginLeft:0}} variant="subtitle1" component="p">MOVING AROUND THE SPACE</Typography>
                                            <Typography variant="caption" component="p">No stairs or steps to enter Wide hallways</Typography>
                                        </Grid>
                                    </Grid>

                                    {/* <Grid container id="availability">
                                        <Grid item>
                                        <Typography className={classes.subTitle}>Availability</Typography>
                                        <Typography>Enter your trip dates for accurate pricing and availability</Typography>
                                        </Grid>
                                    </Grid> */}
                                </Box>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Paper className={classes.payment}>
                                    <Grid container justify="center">
                                        <Grid item xs={11}>
                                            <Grid style={{marginTop:10}} container>
                                                <Grid item xs={9}>
                                                    <div>
                                                        <Typography style={{color:'#00A8C8', fontWeight:'bold',display:'inline-flex'}} variant="h5">‎₦{property.amount}</Typography> avg/night
                                                    </div>
                                                    <Typography variant="subtitle2" style={{fontSize:12, marginTop:15}} component="p">
                                                        {property.guest} Guests | {property.bedroom} Bedrooms | {property.bedroom} beds | {property.bathroom} Baths
                                                    </Typography>
                                                    <Typography style={{fontSize:12}} variant="subtitle2" component="p">
                                                        Excellent 4.7/5 Good for families
                                                    </Typography>
                                                    <Rating
                                                    name='kls'
                                                    defaultValue={4}
                                                    
                                                    style={{fontSize:15, color:'#000000', margin:'15px 0'}}
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
                                            <Typography style={{display:'flex', marginBottom:6}} variant="subtitle2" component="p" >Dates Are Available to be Reserved &nbsp;<CheckCircleOutlinedIcon fontSize="small" htmlColor="#0BA4E0"/></Typography>
                                            <form autoComplete="off">
                                               <Grid container spacing={1}>
                                                   <Grid item xs={6}>
                                                        <div className={classes.checkIn}>
                                                            <label htmlFor="check-in">
                                                                <Calendar htmlColor="#00A8C8" fontSize="small" />
                                                            </label>
                                                            <DatePicker
                                                            className="single" 
                                                            id="check-in"
                                                            label="Check-In"
                                                            format="dd/MM/yyyy"
                                                            value={this.state.checkIn}
                                                            onChange={(e)=>{this.setState({checkIn:e}); this.setDays()}}
                                                            />
                                                        </div>
                                                   </Grid>
                                                   <Grid item xs={6}>
                                                        <div className={classes.checkIn}>
                                                            <label htmlFor="check-out">
                                                                <Calendar htmlColor="#00A8C8" fontSize="small" />
                                                            </label>
                                                            <DatePicker
                                                            className="single" 
                                                            id="check-out"
                                                            label="Check-Out"
                                                            format="dd/MM/yyyy"
                                                            value={this.state.checkOut}
                                                            onChange={(e)=>{this.setState({checkOut:e});this.setDays()}}
                                                            />
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
                                                        <Typography variant="h5" style={{color:'#FF9C07',textAlign:'right',fontWeight:'bold'}}>₦{property.amount*this.state.days}</Typography>
                                                        <Typography variant="caption" style={{cursor:'pointer'}} component="p" onClick={this.handleClickOpen}>view details</Typography>
                                                        <PopUP summary={summary} open={this.state.open} handleClose={this.handleClose} />
                                                    </Grid>
                                                </Grid>
                                                <Button onClick={()=>this.onReserved(property.id)} style={{textTransform:'capitalize', backgroundColor:'#00A8C8', width:'100%', borderRadius:44, color:'#fff',padding:'10px 0', fontSize:18,marginTop:15}} variant="contained" disableElevation>
                                                    Reserve Now
                                                </Button>
                                                <Divider style={{marginTop:15, height:3, backgroundColor:'#DCDCDC'}}/>
                                                <Typography variant="h6" style={{textAlign:'center', color:'#000000'}} >Speak to the Host</Typography>
                                                <Grid container style={{marginTop:10,marginBottom:5}}>
                                                    <Grid item xs={3}>
                                                        <Avatar alt={property.hostData.firstname} style={{width:50, height:50}} src={property.hostData.photoURL}/>
                                                    </Grid>
                                                    <Grid item xs={9}>
                                                        <Typography variant="subtitle1"  component="p">{property.hostData.firstname +' '+ property.hostData.lastname}</Typography>
                                                        <Typography variant="caption"  component="p">Contact host</Typography>
                                                    </Grid>
                                                </Grid>
                                            </form>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                            <Grid container id="location" justify="flex-end">
                                <Grid item xs={12} md={10}>
                                    <Paper elevation={0} style={{borderRadius:0, backgroundColor:"#ECECEC", position:'relative', minHeight:1000}}>
                                        <div className="single-map">
                                            <MapContainer/>
                                        </div>
                                        <Grid container spacing={3} justify="center">
                                            <Grid item xs={5}>
                                                <div style={{marginTop:570,marginBottom:26}}>
                                                    <Typography className={classes.progressBarTitle}>Excellent</Typography>
                                                    <BorderLinearProgress variant="determinate" value={30}/>
                                                    <Typography className={classes.progressBarTitle}>Good</Typography>
                                                    <BorderLinearProgress variant="determinate" value={50}/>
                                                    <Typography className={classes.progressBarTitle}>Okay</Typography>
                                                    <BorderLinearProgress variant="determinate" value={15}/>
                                                    <Typography className={classes.progressBarTitle}>Mediocre</Typography>
                                                    <BorderLinearProgress variant="determinate" value={7}/>
                                                </div>
                                                <Grid container >
                                                    <Grid item md={5}>
                                                        <Typography variant="h5" style={{fontWeight:'bold'}}>3.9</Typography>
                                                        <Typography style={{fontSize:12,fontWeight:500, marginBottom:17}} variant="subtitle1" component="p">Neatness</Typography>
                                                        <Typography variant="h5" style={{fontWeight:'bold'}}>4.3</Typography>
                                                        <Typography style={{fontSize:12,fontWeight:500, marginBottom:17}} variant="subtitle1" component="p">Amenities</Typography>
                                                    </Grid>
                                                    <Grid item md={7}>
                                                        <Typography variant="h5" style={{fontWeight:'bold'}}>4.1</Typography>
                                                        <Typography style={{fontSize:12,fontWeight:500, marginBottom:17}} variant="subtitle1" component="p">Customer Service</Typography>
                                                        <Typography variant="h5" style={{fontWeight:'bold'}}>3.6</Typography>
                                                        <Typography style={{fontSize:12,fontWeight:500, marginBottom:17}} variant="subtitle1" component="p">Property Condition</Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={6}>
                                               <Grid container style={{marginTop:80}}>
                                                   <Grid item md={10}>
                                                    {
                                                        
                                                        data.map((item, i)=>{
                                                            return <Review number={i} data={data} key={i}/>
                                                        })
                                                    }
                                                   </Grid>
                                               </Grid>
                                            </Grid>
                                        </Grid>
                                    </Paper>

                                </Grid>
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
            </Grid>
  
    )
}
}
export default withRouter(withStyles(styles)(Single));