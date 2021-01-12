import React, { useContext } from "react";
import {
    Grid, 
    Paper,
    Avatar,
    Typography
} from '@material-ui/core'
import Chart from "../../components/chart";
import AppContext from "../../state/context";

const RenterDashboard = ({classes, context})=>{
    const {state} = useContext(AppContext)
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
                                <Typography variant="subtitle1" style={{fontWeight:'bold', color:'#046FA7',fontSize:15}} component="p">Hosted Properties</Typography>
                                <Grid container justify="center" alignItems="center" style={{height:'100%'}}>
                                    <Typography variant="h4" style={{fontSize:60,color:'#00A8C8'}} >{state.properties.length}</Typography>
                                </Grid>
                            </Grid>
                            <Grid item xs={7}>
                                <Typography variant="subtitle1" style={{fontWeight:'bold', color:'#046FA7',fontSize:15}} component="p">Activity</Typography>
                                <Chart monthly={context.state.chart.monthly} weekly={context.state.chart.weekly}  yearly={context.state.chart.yearly} type="bar"/>
                            </Grid>
                        </Grid>
                    </Paper>
                    </Grid>
                    </Grid>
            </>
        )
}
export default RenterDashboard;