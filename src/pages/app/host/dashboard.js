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
import image from "../../../images/login_bg.png"

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
const HostDashboard = ({classes, state, switchChart, context})=>{
        return (
            <>
                <Grid container  justify="space-between">
                    <Grid item xs={11} md={3}>
                        <Paper classes={{root:classes.user}}>
                            <div className={classes.userInner}>
                                {
                                    context.state.user.photoURL?
                                    <Avatar className={classes.avater} src={context.state.user.photoURL} alt="user"/>
                                    :
                                    <Avatar className={classes.avater} ><Typography variant="h3">{context.state.userData.firstname.charAt(0)+context.state.userData.lastname.charAt(0)}</Typography></Avatar>
                                }
                                <Typography variant="subtitle2" style={{color:'#707070', fontSize:19, marginTop:15, textAlign:'center'}} component="p">Welcome back,</Typography>
                                <Typography  variant="h5" style={{color:'#00A8C8', fontWeight:'bold', fontSize:30, marginBottom:25}}>{context.state.user?context.state.user.displayName:''}</Typography>
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
                    <Grid item md={7}>
                    <Paper classes={{root:classes.impression}}>
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
                        <Chart type="line"/>
                    </Paper>
                    <Paper style={{margin:'30px 0'}} classes={{root:classes.impression}}>
                        <Typography style={{marginBottom:10, fontSize:17,fontWeight:'bold'}} variant="h5">Notification</Typography>
                        <Divider/>
                        <List>
                            <ListItem style={{margin:'12px 0'}}>
                                <Link style={{display:'flex',alignItems:'flex-end'}} to="/">
                                    <Avatar style={{marginRight:15}} src={image}/>
                                    <ListItemText primary={
                                        <p style={{color:'#707070', fontSize:15}}><span style={{color:'#00A8C8'}}>Annabella</span> made a reservation for <span style={{color:'#00A8C8'}}>12 -14 June, confirm</span></p>
                                    }/>
                                </Link>
                            </ListItem>
                            <ListItem style={{margin:'12px 0'}}>
                                <Link style={{display:'flex',alignItems:'flex-end'}} to="/">
                                    <Avatar style={{marginRight:15}} src={image}/>
                                    <ListItemText primary={
                                        <p style={{color:'#707070', fontSize:15}}><span style={{color:'#00A8C8'}}>John</span> Crik left a review <span style={{color:'#00A8C8'}}>see review</span></p>
                                    }/>
                                </Link>
                            </ListItem>
                            <ListItem style={{margin:'12px 0'}}>
                                <Link style={{display:'flex',alignItems:'flex-end'}} to="/">
                                    <Avatar style={{marginRight:15}} src={image}/>
                                    <ListItemText primary={
                                        <p style={{color:'#707070', fontSize:15}}><span style={{color:'#00A8C8'}}>Royce David</span> canceled reservation <span style={{color:'#00A8C8'}}>check details</span></p>
                                    }/>
                                </Link>
                            </ListItem>
                            <ListItem style={{margin:'12px 0'}}>
                                <Link style={{display:'flex',alignItems:'flex-end'}} to="/">
                                    <Avatar style={{marginRight:15}} src={image}/>
                                    <ListItemText primary={
                                        <p style={{color:'#707070', fontSize:15}}><span style={{color:'#00A8C8'}}>John Crik</span> reservation has ended</p>
                                    }/>
                                </Link>
                            </ListItem>
                        </List>
                    </Paper>
                    <Grid container spacing={10}>
                        <Grid item xs={6}>
                            <Paper>
                                <CardContent>
                                    <Typography variant="h5" className={classes.title}>Promotion</Typography>
                                    <Typography variant="subtitle2" component="p" className={classes.body}>Get your apartment noticed by promoting it in 3 steps.</Typography>
                                    <Button className={classes.btn}>Promote</Button>
                                </CardContent>
                            </Paper>
                        </Grid>
                        <Grid item xs={6}>
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
export default HostDashboard;