import React from "react";
import {
    Grid, 
    Paper,
    Avatar,
    Typography
} from '@material-ui/core'
import Chart from "../../../components/chart";

const Progress = ({value}) => (
    <div style={{
        width: 155,
        height: 155,
        borderRadius: '50%',
        border: '15px solid transparent',
        backgroundSize: '100% 100%, 100% 100%',
        backgroundRepeat: 'no-repeat',
        backgroundImage: `linear-gradient(white, white),linear-gradient(30deg, #046FA7 ${value}%, #00A8C8 ${value}%)`,
        backgroundOrigin: 'content-box, border-box',
        backgroundClip: 'content-box, border-box',
        transform: 'rotate(150deg)'
    }}></div>
)
const RenterDashboard = ({classes, context})=>{
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
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item md={7}>
                    <Paper classes={{root:classes.impression}}>
                        <Grid container style={{marginBottom:15}}>
                            <Grid item xs={5}>
                                <Typography variant="subtitle1" style={{fontWeight:'bold', color:'#046FA7',fontSize:15}} component="p">Overview</Typography>
                                <Grid container justify="center" alignItems="center" style={{height:'100%'}}>
                                    <Progress value={40}/>
                                </Grid>
                            </Grid>
                            <Grid item xs={7}>
                                <Typography variant="subtitle1" style={{fontWeight:'bold', color:'#046FA7',fontSize:15}} component="p">Activity</Typography>
                                <Chart type="bar"/>
                            </Grid>
                        </Grid>
                    </Paper>
                    <Paper style={{margin:'30px 0'}} classes={{root:classes.impression}}>
                        <Grid container>
                            <Grid item lg={4}>
                                <p>Promote Property</p>
                            </Grid>
                            <Grid item lg={4}>
                                <p>Share property link</p>
                            </Grid>
                            <Grid item lg={4}>
                                <p>Refer a friend</p>
                            </Grid>
                        </Grid>
                    </Paper>
                    </Grid>
                    </Grid>
            </>
        )
}
export default RenterDashboard;