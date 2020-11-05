import React, {Component} from "react";
import {withStyles} from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import {Link,withRouter} from "react-router-dom"
import Stays from "../../components/stays";
import Trending from "../../components/trending"
import Explore from "../../components/explore";
import AppContext from "../../state/context";
import house from "../../images/house.png"
import bangalow from "../../images/bangalow.png"
import cottage from "../../images/cottage.png"
import benin from "../../images/benin.jpeg"
import abuja from "../../images/abuja.jpg"
import lagos from "../../images/lagos.jpg"
import kano from "../../images/kano.jpeg"
import { Paper } from "@material-ui/core";
import SlideBanner from "../../components/slideBanner";
import firebase from "../../components/firebase"
import { getFavs } from "../../helpers/helpers";
import Splash from "../../components/splash";
const styles = theme =>({
    loginContainer:{
        backgroundImage:`url(${cottage})`,
        height:'280px',
        width:'100%',
        backgroundRepeat:'no-repeat',
        backgroundSize:'cover',
        backgroundPosition:'bottom',
        borderRadius:25,
        position:'relative',
    },
    containerOverlay:{
        background:'#00A8C8',
        opacity: 0.34, 
        width:'100%', 
        position:'absolute',
        left:0,
        top:0,
        height:'100%',
        borderRadius:25,
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
class More extends Component{
     static contextType = AppContext
    constructor(props){
        super(props)
        this.state={
            favourites:[],
            properties:[],
            loading:true
         }
    }
    // useEffect(()=>{
    //     context.getProperties()
    //     this.setStat       location:context.state.searchQuery?context.state.searchQuery.location:'',
    //         checkIn:context.state.searchQuery?context.state.searchQuery.checkIn:new Date(),
    //         checkOut:context.state.searchQuery?context.state.searchQuery.checkOut:new Date()
    //     })
    // },[context])
    componentDidMount(){
        const condition = this.props.location.search.replace('?', '')
        const properties=[]
        const favourites = getFavs()
        firebase.getMoreProperties(condition,this.context.state.user?this.context.state.user.uid:'')
        .then((props)=>{
            props.forEach(prop=>properties.push({...prop.data(),id:prop.id}))
            this.setState({favourites,properties,loading:false})
        })
    }

     changeHandler=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    //  onSubmit = (e)=>{
    //     e.preventDefault();
    //     this.context.setSearch(this.state);
    //     this.context.searchProperties(this.state.location, this.state.checkIn,this.state.checkOut,this.state.guest,this.props.history)
    // }
    render(){
        const {classes}=this.props
    if(this.state.loading)
        return <Splash/>
    return(
        <Grid id="app-home-page" style={{paddingTop:this.context.state.userData?90:150}} className="home" container justify="center">
            <Grid container justify="center" >
                <Grid item xs={11} md={10} >
                    <Grid container spacing={3}>
                        <Grid item xs={12} lg={8}>
                            <SlideBanner content={[{image:lagos}, {image:bangalow}]}/>
                        </Grid>
                        <Grid item xs={12} lg={4}>
                            <Paper style={{height:200,padding:'20px 8px'}}>
                                {
                                    this.context.state.userData?
                                    <>
                                        <Typography style={{fontSize:40, color:'#707070'}} variant="h3">Hi, {this.context.state.userData.firstname}</Typography>
                                        <Typography style={{color:'#707070', fontSize:15,marginTop:22}} variant="subtitle1" component="p">
                                        Check your inbox so as not to miss clients requests.
                                        </Typography>
                                    </>
                                    :
                                    <>
                                        <Typography style={{fontSize:40, color:'#707070'}} variant="h3">Hi, there!</Typography>
                                        <Typography style={{color:'#707070', fontSize:15,marginTop:22}} variant="subtitle1" component="p">
                                        Login in to access more features..
                                        </Typography>
                                    </>
                                }
                            </Paper>
                        </Grid>
                    </Grid>
                    {
                        this.context.state.user?
                        ''
                        :
                        <>
                            <Typography classes={{root:classes.title}} variant="h3">Where would you like to stay?</Typography>
                            <Grid  container spacing={2}>
                                <Grid item xs={12} sm={6} md={3} lg={3} >
                                <Stays title="House" link={`/app/search?type=house`} height={280} image={house} available={1000} color={'#DF6C08'}/>
                                </Grid>
                                <Grid item xs={12} sm={6} md={3} lg={3}>
                                <Stays title="Bungalows" link={`/app/search?type=bungalows`}  height={280} image={bangalow} available={1000}/>
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={6}>
                                    <div className={classes.loginContainer}>
                                        <div className={classes.containerOverlay}></div>
                                    </div>
                                </Grid>
                            </Grid>
                        </>
                    }

                    {
                        this.state.properties.length>0?
                        <>
                            <Typography classes={{root:classes.title}} variant="h3">Cribs</Typography>
                            <div style={{marginBottom:10}}>
                                <Grid  container spacing={2}>
                                    {
                                        this.state.properties.map((property, i)=>{
                                            return(
                                                <Grid item xs={12} sm={6} md={3} lg={3} >
                                                    <Link to={`/app/crib/${property.id}`}>
                                                        <Trending favourite={this.state.favourites.includes(property.id)} details={property} name={i===0?'one':i===1?'two':i===2?'three':'four'} color={i===0?'#00C1C8':i===1?'#08191A':i===2?'#EE2B72':'#C8BB00'}/>
                                                    </Link>
                                                </Grid>
                                            )
                                        })
                                    }
                                </Grid>
                            </div>

                        </>
                        :''
                    }


                <Typography variant="h4" classes={{root:classes.title}}>Explore Cribs by City</Typography>
                <Grid style={{position:'relative'}} container>
                <Explore content={[{name:'Lagos City',image:lagos, description:'440+ VERIFIED STAYS Book sunny lofts, beachfront flats, and more', link:'/app/search?city=lagos'},{name:'Abuja City',image:abuja, description:'440+ VERIFIED STAYS Book sunny lofts, beachfront flats, and more',link:'/app/search?city=abuja'},{name:'Kano City', image:kano, description:'440+ VERIFIED STAYS Book sunny lofts, beachfront flats, and more',link:'/app/search?city=kano'},{name:'Benin City',image:benin, description:'440+ VERIFIED STAYS Book sunny lofts, beachfront flats, and more',link:'/app/search?city=benin'}]}/>
                </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}
}
export default withRouter(withStyles(styles)(More));