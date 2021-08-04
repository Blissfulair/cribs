import React from "react";
import {
    Grid, 
    Paper,
    Avatar,
    Typography,
    List,
    ListItem,
    Divider,
    ListItemText,
    Card,
    CardContent,
    Button
} from '@material-ui/core'
import {Link} from "react-router-dom"
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import Chart from "../../../components/chart";
import { getMonthInWord } from "../../../helpers/helpers";
import { connect } from "react-redux";
import AppHeader from "../../../components/appHeader"
import "./dashboard.scss"

const Progress = ({value}) => (
    <div style={{
        width: 55,
        height: 55,
        borderRadius: '50%',
        border: '5px solid transparent',
        backgroundSize: '100% 100%, 100% 100%',
        backgroundRepeat: 'no-repeat',
        backgroundImage: `linear-gradient(white, white),linear-gradient(30deg, #046FA7 ${value}%, #00A8C8 ${value}%)`,
        backgroundOrigin: 'content-box, border-box',
        backgroundClip: 'content-box, border-box',
        transform: 'rotate(150deg)'
    }}></div>
)
const HostDashboard = ({classes, state, switchChart, context,user, notifications,chart})=>{
        return (
            <>
                <AppHeader/>
                <Grid container className="dashboard-center" justify="space-between">
                    <Grid item xs={12} md={3}>
                        <Paper classes={{root:classes.user}}>
                            <div className={classes.userInner}>
                                {
                                    user.image?
                                    <Avatar className={classes.avater} src={process.env.REACT_APP_BACKEND_URL+'/'+user.image} alt="user"/>
                                    :
                                    <Avatar className={classes.avater} ><Typography variant="h3">{user.firstname.charAt(0)+user.lastname.charAt(0)}</Typography></Avatar>
                                }
                                <Typography variant="subtitle2" style={{color:'#707070', fontSize:19, marginTop:15, textAlign:'center'}} component="p">Welcome back,</Typography>
                                <Typography  variant="h5" style={{color:'#00A8C8', fontWeight:'bold', fontSize:30, marginBottom:25}}>{user?user.firstname:''}</Typography>
                                <Grid container spacing={3} justify="space-between">
                                    <Grid item xs={5}>
                                        <Typography variant="subtitle2" style={{color:'#046FA7', fontSize:12, fontWeight:'bold', marginBottom:10}} component="p">Overview</Typography>
                                        <Progress value={20}/>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <List>
                                            <ListItem classes={{root:classes.list}}><FiberManualRecordIcon style={{fontSize:12, color:'#0477AC', marginRight:10}}/> Happy Clients</ListItem>
                                            <ListItem classes={{root:classes.list}}><FiberManualRecordIcon style={{fontSize:12, color:'#00A4C1', marginRight:10}}/> Rented</ListItem>
                                        </List>
                                    </Grid>
                                </Grid>
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item md={7} xs={12}>
                    <Paper classes={{root:classes.impression}} className='impression'>
                        <Grid container style={{marginBottom:15}}>
                            <Grid item xs={6}>
                                <Typography variant="subtitle1" style={{fontWeight:'bold', color:'#707070',fontSize:15}} component="p">Impressions</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Grid container>
                                    <Grid item xs={9}>
                                        <Grid container>
                                            <Grid item>
                                                <Button variant="text" style={{textTransform:'capitalize', color:state.chart === 'week'?'#00A8C8':'#707070',fontSize:11}} onClick={()=>{switchChart('week')}}>Weekly</Button>
                                            </Grid>
                                            <Grid item>
                                                <Button variant="text" style={{textTransform:'capitalize', color:state.chart === 'month'?'#00A8C8':'#707070',fontSize:11}} onClick={()=>{switchChart('month')}}>Monthly</Button>
                                            </Grid>
                                            <Grid item>
                                                <Button variant="text" style={{textTransform:'capitalize', color:state.chart === 'year'?'#00A8C8':'#707070',fontSize:11}} onClick={()=>{switchChart('year')}}>Yearly</Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Chart monthly={chart.monthly} weekly={chart.weekly} filter={state.chart} yearly={chart.yearly} type="line"/>
                    </Paper>
                    <Paper style={{margin:'30px 0'}} classes={{root:classes.impression}}>
                        <Typography style={{marginBottom:10, fontSize:17,fontWeight:'bold'}} variant="h5">Notification</Typography>
                        <Divider/>
                        <List>
                            {
                                notifications.length>0?
                                notifications.map((notification,i)=>{
                                    if(notification.type === 'booking'){
                                        if(notification.status === 'reserved')
                                        return(
                                            <ListItem key={i} style={{margin:'12px 0'}}>
                                                <Link style={{display:'flex',alignItems:'flex-end'}} to="/">
                                                    <Avatar style={{marginRight:15}} src={notification.photoURL?notification.photoURL:''}/>
                                                    <ListItemText primary={
                                                        <p style={{color:'#707070', fontSize:15}}><span style={{color:'#00A8C8'}}>{notification.name}</span> made a reservation for <span style={{color:'#00A8C8'}}>{`${new Date(notification.checkIn.seconds*1000).getDate()} ${getMonthInWord(notification.checkIn.seconds*1000)} - ${new Date(notification.checkOut.seconds*1000).getDate()} ${getMonthInWord(notification.checkOut.seconds*1000)}, ${new Date(notification.checkOut.seconds*1000).getFullYear()}`}</span></p>
                                                    }/>
                                                </Link>
                                            </ListItem>
                                        )
                                    else if(notification.status === 'cancelled')
                                        return(
                                            <ListItem key={i} style={{margin:'12px 0'}}>
                                                <Link style={{display:'flex',alignItems:'flex-end'}} to="/">
                                                    <Avatar style={{marginRight:15}} src={notification.photoURL?notification.photoURL:''}/>
                                                    <ListItemText primary={
                                                        <p style={{color:'#707070', fontSize:15}}><span style={{color:'#00A8C8'}}>{notification.name}</span> canceled reservation <span style={{color:'#00A8C8'}}>check details</span></p>
                                                    }/>
                                                </Link>
                                            </ListItem>
                                        )
                                    else if(notification.status === 'complete')
                                        return(
                                            <ListItem style={{margin:'12px 0'}}>
                                                <Link style={{display:'flex',alignItems:'flex-end'}} to="/">
                                                    <Avatar style={{marginRight:15}} src={notification.photoURL?notification.photoURL:''}/>
                                                    <ListItemText primary={
                                                        <p style={{color:'#707070', fontSize:15}}><span style={{color:'#00A8C8'}}>{notification.name}</span> reservation has ended</p>
                                                    }/>
                                                </Link>
                                            </ListItem>
                                        )
                                    }
                                    else{
                                        const names = notification.name.split(' ')
                                        return(
                                            <ListItem style={{margin:'12px 0'}}>
                                                <Link style={{display:'flex',alignItems:'flex-end'}} to="/">
                                                    <Avatar style={{marginRight:15}} src={notification.photoURL?notification.photoURL:''}/>
                                                    <ListItemText primary={
                                                        <p style={{color:'#707070', fontSize:15}}><span style={{color:'#00A8C8'}}>{names[0]}</span> {names[1]} left a review <span style={{color:'#00A8C8'}}>see review</span></p>
                                                    }/>
                                                </Link>
                                            </ListItem>
                                        )
                                    }
                                    return ''
                                })
                                :
                                <p>No notification yet</p>
                            }
                            


                        </List>
                    </Paper>
                    <Grid container justify="space-between" spacing={12}>
                        <Grid item md={5} xs={12}>
                            <Paper>
                                <CardContent>
                                    <Typography variant="h5" className={classes.title}>Promotion</Typography>
                                    <Typography variant="subtitle2" component="p" className={classes.body}>Get your apartment noticed by promoting it in 3 steps.</Typography>
                                    <Button className={classes.btn}>Promote</Button>
                                </CardContent>
                            </Paper>
                        </Grid>
                        <Grid item md={5} xs={12} className='tips'> 
                            <Card>
                                <CardContent>
                                    <Typography variant="h5" className={classes.title}>Tips</Typography>
                                    <Typography variant="subtitle2" component="p" className={classes.body}>Get your apartment noticed by promoting it in 3 steps.</Typography>
                                    <Button className={classes.btn}>Learn More</Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                    </Grid>
                    </Grid>
            </>
        )
}
const mapStateToProps=state=>({
    user:state.user,
    notifications:state.notifications,
    chart:state.chart
})
export default connect(mapStateToProps)(HostDashboard);