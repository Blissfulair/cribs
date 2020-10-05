import React, {useState} from "react";
import {withStyles} from "@material-ui/core/styles"
import bg from "../images/login_bg.png"
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography"
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Calendar from "@material-ui/icons/Today"
import People from "@material-ui/icons/PeopleOutline"
import Grid from "@material-ui/core/Grid"
import Container from '@material-ui/core/Container';
import {Link,withRouter} from "react-router-dom"
import Stays from "../components/stays";
import Trending from "../components/trending"
import IconBox from "../components/iconBox";
import trust from "../images/trust.svg"
import jigsaw from "../images/jigsaw.svg"
import focus from "../images/focus.svg"
import Slide from "../components/slider";
import Explore from "../components/explore";
import { DatePicker } from "@material-ui/pickers";
const styles = theme =>({
    loginContainer:{
        backgroundImage:`url(${bg})`,
        height:'100vh',
        width:'100%',
        backgroundRepeat:'no-repeat',
        backgroundSize:'cover',
        backgroundPosition:'bottom',
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    formContainer:{
        width:'100%',
        height:'350px',
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    form:{
        width:'80%',
        height:'60%',
        margin:'0 auto'
    },
    location:{
        height:'50px',
        width:'100%',
        display:'flex',
        backgroundColor:'#fff',
        border:'1px solid #00A3C5',
        boxShadow:'0px 3px 6px #00000029',
        borderRadius:'10px',
        alignItems:'center',
        paddingLeft:'10px'
    },
    row1:{
        display:'flex',
        justifyContent:'space-between',
        alignItems:'center',
        marginTop:'20px'
    },
    checkIn:{
        width:'45%',
        height:'50px',
        display:'flex',
        backgroundColor:'#fff',
        alignItems:'center',
        border:'1px solid #00A3C5',
        boxShadow:'0px 3px 6px #00000029',
        borderRadius:'10px',
        paddingLeft:'10px'
    },
    btn:{
        backgroundColor:'#00A8C8',
        color:'#fff',
        border:'1px solid #00A3C5',
        width:'100%',
        height:'50px',
        display:'flex',
        borderRadius:'25px',
        justifyContent:'center',
        outline:0
    },
    title:{
        margin:'40px 0 20px 0',
        fontSize:'28px'
    },
    stays:{
        display:'grid',

        gridTemplateColumns:'repeat(4, 24%)',
        gridColumnGap:'1.333%'
    },
    link:{
        color:'#707070',
        textDecoration:'none',
        marginLeft:8
    }
})
const Index = (props)=>{
    const {classes} = props
    const [selectedDate, handleDateChange] = useState(new Date());
    return(
        <Grid className="home" container justify="center">
            <Grid item className={classes.loginContainer} >
                <Grid container justify="center">
                    <Grid item xs={10} md={5}>
                        <Paper style={{backgroundColor:'#14adc5a8',minHeight:'350px', width:'100%'}}>
                        <div className={classes.formContainer}>
                            <form className={classes.form} noValidate autoComplete="off">
                                <div className={classes.location}>
                                    <LocationOnIcon htmlColor="#046FA7" fontSize="default"/>
                                    <div style={{width:'100%',height:'90%'}}>
                                        <label htmlFor="location" style={{height:'20%', marginLeft:'10px'}} >Location</label>
                                        <input placeholder="Search anyplace of your choice"  style={{width:'100%',height:'60%',border:'none',padding:'5px 10px 10px 10px', borderRadius:'0 10px 10px 0', outline:0}} />
                                    </div>
                                </div>

                                <div className={classes.row1}>
                                    <div className={classes.checkIn}>
                                        <label style={{cursor:'pointer',marginRight:10}} htmlFor="begin">
                                            <Calendar htmlColor="#046FA7" fontSize="default"/>
                                        </label>
                                        <DatePicker
                                        id="begin"
                                        label="Check In"
                                        format="dd/MM/yyyy"
                                        value={selectedDate}
                                        onChange={handleDateChange}
                                        />
                                    </div>
                                    <div className={classes.checkIn}>
                                        <label style={{cursor:'pointer',marginRight:10}} htmlFor="end">
                                            <Calendar htmlColor="#046FA7" fontSize="default"/>
                                        </label>
                                        <DatePicker
                                        id="end"
                                        label="Check Out"
                                        format="dd/MM/yyyy"
                                        value={selectedDate}
                                        onChange={handleDateChange}
                                        />
                                    </div>
                                </div>
                                
                                <div className={classes.row1}>
                                    <div className={classes.checkIn}>
                                        <People htmlColor="#046FA7" fontSize="default" />
                                    </div>
                                    <div style={{width:'45%'}}>
                                        <button onClick={()=>props.history.push('/search')} className={classes.btn}>Search</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container justify="center" >
                <Grid item xs={11} md={10} >
                <Typography classes={{root:classes.title}} variant="h3">Where would you like to stay?</Typography>
                <Grid  container spacing={2}>
                    <Grid item xs={12} sm={6} md={3} lg={3} >
                    <Stays color={'#DF6C08'}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} lg={3}>
                    <Stays color={'#FFFFFF'}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} lg={3}>
                    <Stays color="#DF0808"/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} lg={3}>
                    <Stays color="#000000"/>
                    </Grid>
                </Grid>
                <Typography classes={{root:classes.title}} variant="h3">Trending Cribs</Typography>
                <div style={{marginBottom:10}}>
                    <Grid  container spacing={2}>
                        {
                            [1,1,1,1].map((val, i)=>{
                                return(
                                    <Grid item xs={12} sm={6} md={3} lg={3} >
                                        <Link to="/single">
                                            <Trending name={i===0?'one':i===1?'two':i===2?'three':'four'} color={i===0?'#00C1C8':i===1?'#08191A':i===2?'#EE2B72':'#C8BB00'}/>
                                        </Link>
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                </div>
                <Link className={classes.link} to={'/'}>See more</Link>

                <div style={{marginTop:50}}>
                    <Typography variant="h4" classes={{root:classes.title}}>Best Cribs Recommended For you</Typography>
                    <Grid style={{position:'relative'}}  container >
                        <Slide content={[1,2,3,4]}/>
                    </Grid>
                </div>
                <Link className={classes.link} to={'/'}>See more</Link>

                <Typography variant="h4" classes={{root:classes.title}} style={{marginTop:90}} align="center">Reasons to Explore With Us</Typography>
                <Container >
                    <Grid container  justify="center" >
                        <Grid item  xs={12} sm={10} md={10}>
                            <Grid container justify="center" spacing={8}>
                            <Grid item xs={12}  sm={4} md={4}>
                            <IconBox image={trust} name="Reliable"/>
                        </Grid>
                        <Grid item xs={12} sm={4} md={4}>
                            <IconBox image={focus} name="Fast"/>
                        </Grid>
                        <Grid item xs={12} sm={4} md={4}>
                            <IconBox image={jigsaw} name="Convenient"/>
                        </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>

                <Typography variant="h4" classes={{root:classes.title}}>Explore Cribs by City</Typography>
                <Grid style={{position:'relative'}} container>
                    <Explore content={[{name:'Lagos City', description:'440+ VERIFIED STAYS Book sunny lofts, beachfront flats, and more'},{name:'Abuja City', description:'440+ VERIFIED STAYS Book sunny lofts, beachfront flats, and more'},{name:'Kano City', description:'440+ VERIFIED STAYS Book sunny lofts, beachfront flats, and more'}]}/>
                </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}
export default withRouter(withStyles(styles)(Index));