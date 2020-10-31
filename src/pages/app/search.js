import React, {Component} from "react";
import {withStyles} from "@material-ui/core/styles"
import {Select, FormControl,Grid,MenuItem, Typography,Paper} from '@material-ui/core';
import Searchs from "../../components/search"
import Splash from "../../components/splash"
import Explore from "../../components/explore";
import  MapContainer  from "../../components/map";
import {withRouter} from "react-router-dom"
import Context from "../../state/context"
import benin from "../../images/benin.jpeg"
import abuja from "../../images/abuja.jpg"
import lagos from "../../images/lagos.jpg"
import kano from "../../images/kano.jpeg"
import { getFavs } from "../../helpers/helpers";
const styles = theme =>({
    container:{
        paddingTop:100
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
    map:{
        position:'sticky',
        height:400,
        width:'100%',
        borderRadius:0
    }
})
class Search extends Component{
    static contextType = Context
    constructor(props){
        super(props)
        this.state={
            age:'',
            isLoading:true,
            checkIn:new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
            checkOut:new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
            guest:1,
            favourites:[]
        }
    }
    componentDidMount(){
        const url =this.props.history.location.search.replace(/%20/g, ' ');
        const params = url.split('&')
        const address = params.filter(address=>address.includes('location')).toString().split('=')[1];
        const checkin = params.filter(checkin=>checkin.includes('check-in')).toString().split('=')[1];
        const checkOut = params.filter(checkOut=>checkOut.includes('check-out')).toString().split('=')[1];
        const guest = params.filter(guest=>guest.includes('guest')).toString().split('=')[1];
        const type = params.filter(type=>type.includes('type'))
        const city = params.filter(city=>city.includes('city'))
        const favourites = getFavs()
        if(address !== undefined){
 
            const data = {
                location:address,
                checkIn:checkin,
                checkOut,
                guest
            }
            this.context.setSearch(data)
            this.context.onLoadSearch(data)
            .then(()=>{
                this.setState({
                    isLoading:false,
                    checkOut:checkOut,
                    checkIn:checkin,
                    favourites:favourites
                })
            })
            .catch((er)=>{
                this.setState({
                    isLoading:false,
                    checkOut:checkOut,
                    checkIn:checkin
                })
            })
        }
        else if(type.length>0){
            const ty = type[0].split('=')[1]
            this.context.getPropertiesByType(ty)
            .then(()=>{
                this.setState({
                    isLoading:false,
                    favourites:favourites
                })
            })
        }
        else if(city.length>0){
            const cy = city[0].split('=')[1]
            this.context.getPropertiesByCity(cy)
            .then(()=>{
                this.setState({
                    isLoading:false,
                    favourites:favourites
                })
            })
        }
    }
    componentDidUpdate(prevProps){
        if(prevProps.history.location !== this.props.history.location){
            const url =this.props.history.location.search.replace(/%20/g, ' ');
            const params = url.split('&')
            const address = params.filter(address=>address.includes('location')).toString().split('=')[1];
            const checkin = params.filter(checkin=>checkin.includes('check-in')).toString().split('=')[1];
            const checkOut = params.filter(checkOut=>checkOut.includes('check-out')).toString().split('=')[1];
            const guest = params.filter(guest=>guest.includes('guest')).toString().split('=')[1];
                const data = {
                    location:address,
                    checkIn:checkin,
                    checkOut,
                    guest
                }
                this.context.setSearch(data)
                this.context.onLoadSearch(data)
                .then(()=>{
                    this.setState({
                        isLoading:false,
                        checkOut:checkOut,
                        checkIn:checkin
                    })
                })
                .catch((er)=>{
                    this.setState({
                        isLoading:false,
                        checkOut:checkOut,
                        checkIn:checkin
                    })
                })
        }
    }


     handleChange = (event) => {
      this.setState({age:event.target.value});
    };

    render(){
    const {classes} = this.props
    const {state} = this.context

    return(
        <>
            {
                this.state.isLoading&&
                    <Splash />
            }
            <Grid container justify="center">
                <Grid item xs={11} md={10}>
                    <div id="search-page" className={classes.container}>
                        <Grid container justify="flex-start" style={{position:'relative'}} spacing={3}>
                            <Grid item xs={12} md={6}>

                                {
                                    state.results.length>0?
                                    <>
                                    <Grid container justify="space-between">
                                    <Grid item>
                                        <p className={classes.text}>1 -30 of 200</p>
                                    </Grid>
                                    <Grid item>
                                        <FormControl classes={{root:classes.formControl}}>
                                            <p className={classes.text}>Sort:</p>
                                            <Select
                                            value={this.state.age}
                                            onChange={this.handleChange}
                                            displayEmpty
                                            classes={{root:classes.input}}
                                            >
                                            <MenuItem value={10}>Ascending</MenuItem>
                                            <MenuItem value={20}>Descending</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                    {
                                        state.results.map((result,index)=>{
                                            if(this.context.state.searchQuery){
                                            const checkOut = result.bookedDates.filter(item=>new Date(item.seconds*1000).toDateString() === new Date(this.context.state.searchQuery.checkOut).toDateString())
                                            const checkIn = result.bookedDates.filter(item=>new Date(item.seconds*1000).toDateString() === new Date(this.context.state.searchQuery.checkIn).toDateString())
                                            if(checkIn.length<1 && checkOut.length<1)
                                                return(
                                                    <Searchs favourite={this.state.favourites.includes(result.id)} content={result}   name={`rating${index}`} key={index}/>
                                                )
                                            else return ''
                                             }
                                             else{
                                                return(
                                                    <Searchs favourite={this.state.favourites.includes(result.id)} content={result}   name={`rating${index}`} key={index}/>
                                                ) 
                                             }
                                        })
                                    }
                                
                                </>
                                    :
                                    <Grid container justify="space-between">
                                    <Grid style={{marginTop:40}} item>
                                        <p className={classes.text} style={{fontSize:19, color:'#7E7E7E'}}>No crib matches the search</p>
                                    </Grid>
                                </Grid>
                                }
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Paper elevation={0} classes={{root:classes.map}}>
                                    <MapContainer/>
                                </Paper>
                            </Grid>
                        </Grid>
                        <Typography variant="h4" classes={{root:classes.title}}>Explore Cribs by City</Typography>
                        <Grid style={{position:'relative'}} container>
                        <Explore content={[{name:'Lagos City',image:lagos, description:'440+ VERIFIED STAYS Book sunny lofts, beachfront flats, and more', link:'/app/search?city=lagos'},{name:'Abuja City',image:abuja, description:'440+ VERIFIED STAYS Book sunny lofts, beachfront flats, and more',link:'/app/search?city=abuja'},{name:'Kano City', image:kano, description:'440+ VERIFIED STAYS Book sunny lofts, beachfront flats, and more',link:'/app/search?city=kano'},{name:'Benin City',image:benin, description:'440+ VERIFIED STAYS Book sunny lofts, beachfront flats, and more',link:'/app/search?city=benin'}]}/>
                        </Grid>
                    </div>
                </Grid>
            </Grid>
        </>
    )
}
}
export default withRouter(withStyles(styles)(Search));