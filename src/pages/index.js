import React, { Component } from "react";
import '../scss/index.scss';
import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import Container from '@material-ui/core/Container';
import { Link, withRouter } from "react-router-dom"
import Stays from "../components/stays";
import Trending from "../components/trending"
import IconBox from "../components/iconBox";
import trust from "../images/trust.svg"
import jigsaw from "../images/jigsaw.svg"
import focus from "../images/focus.svg"
import Slide from "../components/slider";
import Explore from "../components/explore";
import AppContext from "../state/context";
import house from "../images/house.png"
import bangalow from "../images/bangalow.png"
import condos from "../images/condos.png"
import benin from "../images/benin.jpeg"
import abuja from "../images/abuja.jpg"
import lagos from "../images/lagos.jpg"
import kano from "../images/kano.jpeg"
import cottage from "../images/cottage.png"
import cribs from "../images/cribs.svg"
import SearchIcon from "../images/searchicon.svg"
import CancelIcon from "../images/cancelicon.svg"
import Splash from "../components/splash";
import { getFavs, getDates } from "../helpers/helpers";
import  LocationCard from "../components/Cards/LocationCard";
import { connect } from "react-redux";
import { setTrendingAndBestCribs, storeSearchData} from "../state/actions"
import {HomeSkeleton as Skeleton} from "../components/skeleton/index"
import Head from "../components/head";
import { getTrendingAndBestCribs, searchProperties } from "../apis/server";
import Calendar from "../components/calender";
import Guest from "../components/guest";



const styles = theme => ({

    title: {
        margin: '40px 0 20px 0',
        fontSize: '28px'
    },
    stays: {
        display: 'grid',

        gridTemplateColumns: 'repeat(4, 24%)',
        gridColumnGap: '1.333%'
    },
    link: {
        color: '#707070',
        textDecoration: 'none',
        marginLeft: 8
    }
})


const SearchButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 129px;
    height: 49px;
    background: #005C9F;
    border-radius: 63.5px;
    margin-left: 10px;
    border: 0;
    color: #FCFCFC;
    outline: none;
    cursor:pointer;
`
const SearchButtonText = styled.p`
    font-family: Poppins;
    font-weight: 500;
    font-size: 14px;
    line-height: 21px;
    color: #FCFCFC;
    margin-left: 9px;
`
const Guests = styled.div`
    width: 173px;
    height: 70px;
    background: #FCFCFC;
    border-radius: 42.5px;
    margin-left: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
`


class Index extends Component {
    static contextType = AppContext
    constructor(props) {
        super(props)
        this.state = {
            location: '',
            checkIn: '',
            checkOut: '',
            guest: 0,
            adult:0,
            children:0,
            infant:0,
            loading: false,
            pets:false,
            favourites: [],
            days: 1,
            quickSeach:[],
            quickLoading:false
        }
        this.location = React.createRef()
    }
    componentDidMount() {
        getTrendingAndBestCribs()
        .then(cribs=>{
            this.props.setTrendingAndBestCribs(cribs)
        })
        const favourites = getFavs()
        this.setState({
            favourites: favourites,
        })

    }
    setDays = () => {
        const dates = getDates(this.state.checkIn, this.state.checkOut)
        this.setState({ days: dates.length })
    }
    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    onKeyPres=()=>{
        this.setState({quickLoading:true})
        const data ={
            search:this.state.location,
            limit:4
        }
        searchProperties(data)
        .then(res=>{
            this.setState({quickLoading:false, quickSeach:res})
        }) 
        .catch(e=>{
            this.setState({quickLoading:false})
        })
    }
    onSubmit = (e) => {
        e.preventDefault();
        if(!this.state.location || !this.state.checkOut || !this.state.checkIn)
            return
        this.setState({ loading: true })
        const data = {
            location: this.state.location,
            checkIn: this.state.checkIn,
            checkOut: this.state.checkOut,
            guest: this.state.guest,
            children:this.state.children,
            adult:this.state.adult,
            infant:this.state.infant,
            pet:this.state.pet,
        }
        this.props.storeSearchData(data)
        searchProperties({search:this.state.location})
        .then((res) => {
            this.props.history.push({
                pathname: '/search',
                search: `?location=${this.state.location}&check-in=${this.state.checkIn}&check-out=${this.state.checkOut}&guest=${this.state.guest}`
            })
            this.setState({ loading: false })
        })
        .catch(e => {
            this.setState({ loading: false })
        })
    }
    render() {
        
        const { classes, trendingCribs, bestCribs } = this.props
        
        return (
            <>


                <Grid className="home" container justify="center">
                    {
                        this.state.loading &&
                        <Splash />
                    }

                    <div className="showcase">
                        <Head color="#046FA7" quickSearch={true}/>

                        <div className="showcase__bottom">
                            <img src={cribs} alt="cribs ng for everyone" />

                            <div className="form__wrapper">
                                <LocationCard results={this.state.quickSeach} inputRef={this.location} />
                                <form onSubmit={(e)=>{this.onSubmit(e)}}>
                                    <div className="location">
                                        <input onKeyUp={this.onKeyPres} ref={this.location} value={this.state.location} className='location__input' type="text" name="location" onChange={this.changeHandler} id="" placeholder="Where do you want to lodge?" />
                                        <img
                                            onClick={()=>this.setState({location:''})}
                                            src={CancelIcon}
                                            alt=""
                                            style={{
                                                marginLeft: '5px',
                                                cursor:'pointer'
                                            }} />
                                        <label className='location__text' htmlFor="">Location</label>
                                    </div>

                                    <div className="checkin">
                                        <Calendar
                                            top="145%"
                                            right="-27.5vw"
                                            label="Check In"
                                            format="dd/MM/yyyy"
                                            value={this.state.checkIn}
                                            placeholder="Pick Dates"
                                            onChange={(e) => {
                                                if (Date.parse(e) > Date.parse(this.state.checkOut) ||  this.state.checkOut==='')
                                                    this.setState({ checkIn: e, checkOut: e }, () => { this.setDays() })
                                                else
                                                    this.setState({ checkIn: e }, () => { this.setDays() })
                                            }}
                                        />
                                    </div>

                                    <div className="checkin">
                                        <Calendar
                                            top="145%"
                                            right="-15vw"
                                            label="Check Out"
                                            format="dd/MM/yyyy"
                                            placeholder="Pick Dates"
                                            value={this.state.checkOut}
                                            onChange={(e) => { this.setState({ checkOut: e }) }}
                                        />
                                    </div>

                                    <Guests>
                                        <div>
                                        <Guest
                                            caret="-150%"
                                            top="212%"
                                            right="-15vw"
                                            label="Guests"
                                            placeholder="Select guests"
                                            onChange={(e)=>{this.setState({guest:e.adult+e.children, adult:e.adult,children:e.children, infant:e.infant})}}
                                            onCheck={(e)=>this.setState({pets:e})}
                                            checked={this.state.pets}
                                            adult={this.state.adult}
                                            childrens={this.state.children}
                                            infant={this.state.infant}
                                        />
                                        </div>
                                    </Guests>
                                    <SearchButton  type="submit" >
                                        <img src={SearchIcon} alt="" />
                                        <SearchButtonText>Search</SearchButtonText>
                                    </SearchButton>
                                </form>
                            </div>
                        </div>

                    </div>

                    <Grid container justify="center" >
                        <Grid item xs={11} md={10} >
                           
                                {
                                    this.props.propertyTypes.length>=2&&
                                    <>
                                    <Typography classes={{ root: classes.title }} className="head-title" variant="h3">Where would you like to stay?</Typography>
                                    <Grid container spacing={2}>
                                    <Slide>
                                            <Grid item xs={12} sm={6} md={3} lg={3} >
                                                <Stays title={this.props.propertyTypes[0].name} link={`/search?type=${this.props.propertyTypes[0].name}`} image={house} available={1000} color={'#DF6C08'} />
                                            </Grid>
                                            <Grid item xs={12} sm={6} md={3} lg={3}>
                                                <Stays title={this.props.propertyTypes[1].name}  link={`/search?type=${this.props.propertyTypes[1].name}`} image={bangalow} available={1000} />
                                            </Grid>
                                            <Grid item xs={12} sm={6} md={3} lg={3}>
                                                <Stays title={'Cottage'}  link={`/search?type=${'cottage'}`} image={condos} available={1000} color="#DF0808" />
                                            </Grid>
                                            <Grid item xs={12} sm={6} md={3} lg={3}>
                                                <Stays title="Wharehouse" link={`/search?type=waraehouse`} image={cottage} available={1000} color="#000000" />
                                            </Grid>
                                        </Slide>
                                    </Grid>
                                    </>
                                }
                            

                            {/* {
                                this.context.state.properties.length > 0 ?
                                    <>
                                        <Typography classes={{ root: classes.title }} variant="h3">Trending Cribs</Typography>
                                        <div style={{ marginBottom: 10 }}>
                                            <Grid container spacing={2}>
                                                {
                                                    this.context.state.properties.map((property, i) => {
                                                        return (
                                                            <Grid item xs={12} sm={6} md={3} lg={3} >
                                                                <Link to={`/crib/${property.id}`}>
                                                                    <Trending favourite={this.state.favourites.includes(property.id)} details={property} name={i === 0 ? 'one' : i === 1 ? 'two' : i === 2 ? 'three' : 'four'} color={i === 0 ? '#00C1C8' : i === 1 ? '#08191A' : i === 2 ? '#EE2B72' : '#C8BB00'} />
                                                                </Link>
                                                            </Grid>
                                                        )
                                                    })
                                                }
                                            </Grid>
                                        </div>
                                        <Link className={classes.link} to={{ pathname: '/more-cribs', search: 'trending' }}>See more</Link>


                                        <div style={{ marginTop: 50 }}>
                                            <Typography variant="h4" classes={{ root: classes.title }}>Best Cribs Recommended For you</Typography>
                                            <Grid style={{ position: 'relative' }} container >
                                                <Slide favourites={this.state.favourites} content={this.context.state.latestProperties} />
                                            </Grid>
                                        </div>
                                        <Link className={classes.link} to={{ pathname: '/more-cribs', search: 'recommended' }}>See more</Link>
                                    </>
                                    : ''
                            } */}
                            <Typography classes={{root:classes.title}} className="head-title" variant="h3">Trending Cribs</Typography>
                            <div style={{marginBottom:10}}>
                                <Grid  container spacing={2}>
                                <Slide
                                    infinite={true}
                                >
                                        
                                        {
                                        trendingCribs.length>0?
                                            trendingCribs.map((property,index)=>{
                                                return (
                                                    <Grid item xs={12} sm={6} md={3} lg={3} >
                                                    <Link to={this.props.user?`/app/crib/${property._id}`:`/crib/${property._id}`} key={index}>
                                                        <Trending favourite={this.state.favourites.includes(property._id)} name={`rating${index}`} details={property} color={index === 0?"#00C1C8":index===1?"#08191A":index===2?"#EE2B72":"#C8BB00"} key={index} />   
                                                    </Link>
                                                    </Grid>
                                                )
                                            })
                                            :
                                            [1,2,3.4,5].map((value,i)=>(
                                                <Grid  key={i}  item xs={12} sm={6} md={3} lg={3} >
                                                        <Skeleton />
                                                </Grid>
                                            ))
                                        }
                                    </Slide>
                                    {/* {
                                        trendingCribs.length>0?
                                        [1,1,1,1].map((property, i)=>{
                                            return(
                                                <Grid item xs={12} sm={6} md={3} lg={3} >
                                                    <Link  to={`/crib/${property._id}`}>
                                                        <Trending favourite={this.state.favourites.includes(property._id)} details={property} name={i===0?'one':i===1?'two':i===2?'three':'four'} color={i===0?'#00C1C8':i===1?'#08191A':i===2?'#EE2B72':'#C8BB00'}/>
                                                    </Link>
                                                </Grid>
                                            )
                                        })
                                        :
                                        [1,2,3.4,5].map((value,i)=>(
                                            <Grid item xs={12} sm={6} md={3} lg={3} >
                                                    <Skeleton key={i} />
                                            </Grid>
                                        ))


                                    } */}
                                </Grid>
                            </div>
                            {
                                trendingCribs.length>0&&
                                <Link className={classes.link} to={{pathname:'/app/more-cribs', search:'trending'}}>See more</Link>
                            }

                        </Grid>
                        <Grid container justify="center">
                            <Grid item xs={11} md={10}>
                                <Typography variant="h4" className="head-title" classes={{root:classes.title}}>Best Cribs Recommended For you</Typography>

                            </Grid>
                        </Grid>
                        <Grid container justify="center" className="best-cribs-section">
                            <Grid item xs={11} md={10}>
                                <div>
                                    <Grid style={{position:'relative'}}  container spacing={2}>
                                        <Slide
                                            infinite={true}
                                        >
                                            
                                            {
                                                
                                            bestCribs.length>0?
                                                bestCribs.map((property,index)=>{
                                                    return (
                                                        <Grid item xs={12} sm={6} md={3} lg={3} >
                                                        <Link to={this.props.user?`/app/crib/${property._id}`:`/crib/${property._id}`} key={index}>
                                                            <Trending favourite={this.state.favourites.includes(property._id)} name={`rating${index}`} details={property} color={index === 0?"#00C1C8":index===1?"#08191A":index===2?"#EE2B72":"#C8BB00"} key={index} />   
                                                        </Link>
                                                        </Grid>
                                                    )
                                                })
                                                :
                                                [1,2,3.4,5].map((value,i)=>(
                                                    <Grid  key={i}  item xs={12} sm={6} md={3} lg={3} >
                                                            <Skeleton />
                                                    </Grid>
                                                ))
                                            }
                                        </Slide>
                                    </Grid>
                                </div>
                                {
                                    bestCribs.length>0&&
                                    <Link className={classes.link} to={{pathname:'/app/more-cribs', search:'recommended'}}>See more</Link>
                                }
                            </Grid>
                        </Grid>
                        <Grid item xs={11} md={10}>
                            <Typography variant="h4" className="reason-title" classes={{ root: classes.title }} style={{ marginTop: 90 }} align="center">Reasons to Explore With Us</Typography>
                            <Container >
                                <Grid container justify="center" >
                                    <Grid item xs={12}>
                                        <Grid className="reasons" container justify="center" spacing={6}>
                                            <Grid item xs={12} sm={4} md={4}>
                                                <IconBox 
                                                content="Pellentesque in ipsum id orci porta
                                                dapibus. Mauris blandit aliquet elit,
                                                eget tincidunt nibh pulvinar a.
                                                Donec rutrum congue leo eget malesuada." 
                                                image={trust} 
                                                name="Reliable" />
                                            </Grid>
                                            <Grid item xs={12} sm={4} md={4}>
                                                <IconBox 
                                                image={focus} 
                                                name="Fast"
                                                content="Pellentesque in ipsum id orci porta
                                                dapibus. Mauris blandit aliquet elit,
                                                eget tincidunt nibh pulvinar a.
                                                Donec rutrum congue leo eget malesuada." 
                                                 />
                                            </Grid>
                                            <Grid item xs={12} sm={4} md={4}>
                                                <IconBox 
                                                image={jigsaw} 
                                                name="Convenient"
                                                content="Pellentesque in ipsum id orci porta
                                                dapibus. Mauris blandit aliquet elit,
                                                eget tincidunt nibh pulvinar a.
                                                Donec rutrum congue leo eget malesuada." 
                                                 />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Container>

                            <Typography variant="h4" classes={{ root: classes.title }}>Explore Cribs by City</Typography>
                            <Grid style={{ position: 'relative' }} container>
                                <Explore 
                                content={[
                                    { 
                                        name: 'Lagos City', 
                                        image: lagos, description: '440+ VERIFIED STAYS Book sunny lofts, beachfront flats, and more', 
                                        link: '/search?city=lagos' 
                                    }, 
                                    { 
                                        name: 'Abuja City', 
                                        image: abuja, description: '440+ VERIFIED STAYS Book sunny lofts, beachfront flats, and more', 
                                        link: '/search?city=abuja' 
                                    }, 
                                    {   
                                        name: 'Kano City', 
                                        image: kano, description: '440+ VERIFIED STAYS Book sunny lofts, beachfront flats, and more', 
                                        link: '/search?city=kano' 
                                    }, 
                                    { 
                                        name: 'Benin City', 
                                        image: benin, description: '440+ VERIFIED STAYS Book sunny lofts, beachfront flats, and more', 
                                        link: '/search?city=benin' 
                                    }
                                    ]}
                                    height={274}
                                 />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </>
        )
    }
}
const mapStateToProps = state => ({
    properties:state.properties,
    user:state.user,
    propertyTypes:state.propertyTypes,
    trendingCribs:state.trendingCribs,
    bestCribs:state.bestCribs
});
const mapDispatchToProps = dispatch => ({
    setTrendingAndBestCribs: (payload) => dispatch(setTrendingAndBestCribs(payload)),
    storeSearchData:(payload)=>dispatch(storeSearchData(payload))
  });
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(Index)));
