import React from "react";
import {Paper, withStyles,Grid,Typography} from "@material-ui/core"
import {Facebook, Instagram, Twitter} from "@material-ui/icons"
import {Link} from "react-router-dom"
import Subscribe from "./subscribe"
import AppLogo from "./appLogo";
import play from "../images/playstore.svg"
import apple from "../images/apple.svg"
import SocialIcon from "./socialicon"
const styles = (theme)=>({
    container:{
        minHeight:380,
        backgroundColor:'#E9E9E9',
        marginTop:130
    },
    inner:{
        padding:'25px 0 35px 0'
    },
    line:{
        borderLeft:'2px solid #CCCCCC',
        height:'100%'
    },
    list:{
        listStyle:'none',
    },
    listItem:{
        margin:`${theme.spacing(2)}px 0`
    },
    link:{
        color:'#707070',
        textDecoration:'none',
    },
    title:{
        fontSize:'28px'
    },
    subtitle:{
        fontSize:18,
        margin:'15px 0'
    },
    paragraph:{
        fontSize:14,
        color:'#000000'
    },
    social:{
        display:'flex',
        listStyle:'none',
        justifyContent:'space-between',
        margin:'20px 0 30px 0'
    }
})
const Footer = ({classes})=>{
    return(
        <Paper className="footer" classes={{root:classes.container}} square>
            <Grid container classes={{root:classes.inner}}>
                <Grid item xs={false} md={1}/>
                <Grid item xs={12} md={10}>
                    <Typography classes={{root:classes.subtitle}} color="secondary" variant="h4">Beach destinations</Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={7}>
                            <Typography classes={{root:classes.paragraph}}   variant="body1" component="p">
                                Orange Beach | Playa del Carmen Port | Aransas Mau I Bethany beach | rentals Folly beach | rentals Gulf Shores beach | rentals Holden beach rentals | Panama City Beach | Ocean Isle beach rentals | Rehoboth beach rentals | Rosemary beach.
                            </Typography>
                            <Typography classes={{root:classes.subtitle}} variant="h4" color="secondary">
                                Resorts
                            </Typography>
                            <Typography classes={{root:classes.paragraph}} variant="body1" component="p">
                                Big Bear ski resorts | Colorado ski resorts | Massanutten resorts | Panama City Beach resorts | Paradise resorts | Purgatory resorts | Maui resorts Virginia resorts Welk resorts Westgate lakes resorts and spaWintergreen resorts | Disney resortsWisconsin
                            </Typography>
                            <Grid container>
                                <Grid item md={10}>
                                    <Grid container style={{marginTop:40}} alignItems="center">
                                        <Grid item md={4} xs={12}>
                                            <Typography classes={{root:classes.title}} noWrap variant="h2">CRIB NG</Typography>
                                        </Grid>
                                        <Grid item md={4}  xs={12}  >
                                            <Typography classes={{root:classes.title}} variant="h2">Links</Typography>
                                            <ul className={classes.list}>
                                                <li className={classes.listItem} ><Link className={classes.link} to="/">List Property</Link></li>
                                                <li className={classes.listItem} ><Link className={classes.link} to="/">Privacy Policy</Link></li>
                                                <li className={classes.listItem} ><Link className={classes.link} to="/">Community</Link></li>
                                            </ul>
                                        </Grid>
                                        <Grid item md={4}  xs={12}>
                                            <Typography classes={{root:classes.title}} variant="h2">Comapny</Typography>
                                            <ul className={classes.list}>
                                                <li className={classes.listItem} ><Link className={classes.link} to="/">About</Link></li>
                                                <li className={classes.listItem} ><Link className={classes.link} to="/">Carreer</Link></li>
                                                <li className={classes.listItem} ><Link className={classes.link} to="/">Media center</Link></li>
                                            </ul>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={5} style={{display:'flex', alignItems:'flex-end',width:'100%'}} classes={{root:classes.line}}>
                            <div style={{paddingLeft:10, width:'100%'}}>
                                <Typography style={{marginBottom:10}} variant="body1" component="p">
                                    To get updates on discounts. Sign up to our Newsletter.
                                </Typography>
                                <Subscribe/>
                                <Grid container>
                                    <Grid item xs={6} md={4}>
                                    <ul className={classes.social}>
                                        <SocialIcon backgroundColor="#375FA5" href="https://wwww.facebook.com"><Facebook  htmlColor="#fff"/></SocialIcon>
                                        <SocialIcon backgroundColor="#6FAEEB" href="https://wwww.facebook.com"><Twitter  htmlColor="#fff"/></SocialIcon>
                                        <SocialIcon backgroundColor="#FFFFFF" href="https://wwww.facebook.com"><Instagram htmlColor="#375FA5"/></SocialIcon>
                                    </ul>
                                    </Grid>
                                </Grid>
                                <Typography style={{marginBottom:10}} variant="body1" component="p">Download Cribs Mobile App</Typography>
                                <Grid container>
                                    <Grid item xs={12} sm={6} md={10}>
                                        <Grid container>
                                           <Grid item xs={6}>
                                                <AppLogo name="App" image={apple} href="https://wwww.play.google.com/store/apps/details?id=com.givismartatt" target="_blank" />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <AppLogo name="Play" image={play} href="https://wwww.play.google.com/store/apps/details?id=com.givismartatt" target="_blank" />
                                            </Grid>
                                        </Grid> 
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={false} md={1}/>
            </Grid>
        </Paper>
    )
}
export default withStyles(styles)(Footer);