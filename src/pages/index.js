import React, { Component } from "react";
import '../scss/index.scss';
import styled from "styled-components";
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
// import {
//   DatePicker,
//   MuiPickersUtilsProvider,
// } from '@material-ui/pickers';
import NavButton from "../components/Button/NavButton";
import { withStyles } from "@material-ui/core/styles"
import bg from "../images/login_bg.png"
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography"
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Calendar from "@material-ui/icons/Today"
import People from "@material-ui/icons/PeopleOutline"
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
import { DatePicker } from "@material-ui/pickers";
import AppContext from "../state/context";
import { Button, TextField } from "@material-ui/core";
import house from "../images/house.png"
import bangalow from "../images/bangalow.png"
import condos from "../images/condos.png"
import benin from "../images/benin.jpeg"
import abuja from "../images/abuja.jpg"
import lagos from "../images/lagos.jpg"
import kano from "../images/kano.jpeg"
import cottage from "../images/cottage.png"
import ShowcaseImage from "../images/showcase.png"
import cribs from "../images/cribs.svg"
import SearchIcon from "../images/searchicon.svg"
import CancelIcon from "../images/cancelicon.svg"
import Splash from "../components/splash";
import { getFavs, getDates } from "../helpers/helpers";


const styles = theme => ({
    loginContainer: {
        backgroundImage: `url(${bg})`,
        height: '100vh',
        width: '100%',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'bottom',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    formContainer: {
        width: '100%',
        height: '350px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    form: {
        width: '80%',
        height: '60%',
        margin: '0 auto'
    },
    location: {
        height: '50px',
        width: '100%',
        display: 'flex',
        backgroundColor: '#fff',
        border: '1px solid #00A3C5',
        boxShadow: '0px 3px 6px #00000029',
        borderRadius: '10px',
        alignItems: 'center',
        paddingLeft: '10px'
    },
    row1: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '20px'
    },
    checkIn: {
        width: '45%',
        height: '50px',
        display: 'flex',
        backgroundColor: '#fff',
        alignItems: 'center',
        border: '1px solid #00A3C5',
        boxShadow: '0px 3px 6px #00000029',
        borderRadius: '10px',
        paddingLeft: '10px'
    },

    btn: {
        backgroundColor: '#00A8C8',
        color: '#fff',
        border: '1px solid #00A3C5',
        width: '100%',
        height: '50px',
        display: 'flex',
        borderRadius: '25px',
        justifyContent: 'center',
        outline: 0,
        textTransform: 'capitalize'
    },
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








const ShowcaseBottom = styled.div`
    position: relative;
    z-index: 999;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-top: 80px;
`

const ShowcaseHeading = styled.img`
    width: min(80%, 506px);
    margin-left: auto;
    margin-right: auto;
`

const ShowcaseBottomWrapper = styled.div`
    width: min(90%, 986px);
    // width: 70%;
    margin: auto;
    margin-top: 1rem;
    height: 100px;
    background: rgba(255, 255, 255, 0.5);
    box-shadow: 0px 4px 4px rgba(157, 157, 157, 0.1);
    backdrop-filter: blur(11px);
    border-radius: 51.5px;
`

const Form = styled.form`
    display: flex;
    // justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-top: 1rem;
    // border: solid green;
`

const LocationInput = styled.div`
    width: 270px;
    height: 70px;
    position: relative;
    background: #FCFCFC;
    border-radius: 42.5px;
    display: flex;
    // flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin-left: 1rem;
    // border: solid red;
`

const Label = styled.label`
    position: absolute;
    top: 5px;
	left: 20px;
	font-size: 16px;
	color: #fff;	
    pointer-event: none;
    transition: all 0.5s ease-in-out;
    font-family: Poppins;
    font-weight: 500;
    font-size: 14px;
    line-height: 21px;
    color: #000000;
`

const Input = styled.input`
    border: 0; 
    background: transparent;
    width: 80%;
    padding: 8px 0 5px 0;
    font-size: 16px;
    color: #8F8F8F;
    margin-left: 20px;
    // border: solid blue;

    &:focus{
        outline: none;

    }
`

const CheckIn = styled.div`
    width: 160px;
    height: 70px;
    background: #FFFFFF;
    border-radius: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left:10px;
`

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
const GuestsHeading = styled.h2`
    font-family: Poppins;
    font-weight: 500;
    font-size: 14px;
    line-height: 21px;
    color: #000;
`
const GuestsText = styled.p`
    font-family: Poppins;
    font-weight: 500;
    font-size: 14px;
    line-height: 21px;
`

class Index extends Component {
    static contextType = AppContext
    constructor(props) {
        super(props)
        this.state = {
            location: '',
            checkIn: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
            checkOut: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
            guest: 0,
            loading: false,
            favourites: [],
            days: 1,
        }
    }
    // useEffect(()=>{
    //     context.getProperties()
    //     this.setStat       location:context.state.searchQuery?context.state.searchQuery.location:'',
    //         checkIn:context.state.searchQuery?context.state.searchQuery.checkIn:new Date(),
    //         checkOut:context.state.searchQuery?context.state.searchQuery.checkOut:new Date()
    //     })
    // },[context])
    componentDidMount() {
        const favourites = getFavs()
        this.setState({
            favourites: favourites,
            location: this.context.state.searchQuery ? this.context.state.searchQuery.location : '',
            checkIn: this.context.state.searchQuery ? this.context.state.searchQuery.checkIn : new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
            checkOut: this.context.state.searchQuery ? this.context.state.searchQuery.checkOut : new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())
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
    onSubmit = (e) => {
        e.preventDefault();
        this.setState({ loading: true })
        this.context.setSearch(this.state);
        this.context.searchProperties(this.state.location, this.state.checkIn, this.state.checkOut, this.state.guest)
            .then(() => {
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
        const { classes } = this.props
        return (
            <>


                <Grid className="home" container justify="center">
                    {
                        this.state.loading &&
                        <Splash />
                    }

                    <section class="showcase">
                        <div className="showcase__header">
                            <div className="showcase__logo">
                                <a href="/">Cribs NG</a>
                            </div>
                            <nav className="showcase__nav">
                                <NavButton
                                    color='#fff'
                                    border
                                    borderColor='#fff'
                                    borderRadius={27}
                                    height='44'
                                    width='180'
                                    borderWidth={2}
                                    marginRight='3rem'
                                >
                                    Host Accomodation
                                </NavButton>
                                <NavButton
                                    color='#fff'
                                    backgroundColor='#046FA7'
                                    border
                                    borderRadius={27}
                                    height='44'
                                    width='106'
                                >
                                    Sign in
                                </NavButton>
                            </nav>

                        </div>


                        <ShowcaseBottom>
                            <ShowcaseHeading src={cribs} alt="" />
                            <ShowcaseBottomWrapper>
                                <Form action="" >
                                    <LocationInput>
                                        <Input type="text" name="" id="" placeholder="Where do you want to lodge?" />
                                        <img
                                            src={CancelIcon}
                                            alt=""
                                            style={{
                                                marginLeft: '5px',
                                            }} />
                                        <Label htmlFor="">Location</Label>
                                    </LocationInput>

                                    <CheckIn>
                                        <DatePicker
                                            label="Check In"
                                            format="dd/MM/yyyy"
                                            value={this.state.checkIn}
                                            onChange={(e) => {
                                                if (Date.parse(e) > Date.parse(this.state.checkOut))
                                                    this.setState({ checkIn: e, checkOut: e }, () => { this.setDays() })
                                                else
                                                    this.setState({ checkIn: e }, () => { this.setDays() })
                                            }}
                                            style={{
                                                color: 'red',
                                                width: '70%',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}
                                        />
                                    </CheckIn>

                                    <CheckIn>
                                        <DatePicker
                                            label="Check Out"
                                            format="dd/MM/yyyy"
                                            value={this.state.checkOut}
                                            onChange={(e) => { this.setState({ checkOut: e }) }}
                                            style={{
                                                color: 'red',
                                                width: '70%',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}
                                        />
                                    </CheckIn>

                                    <Guests>
                                        <div>
                                            <GuestsHeading>Guests</GuestsHeading>
                                            <GuestsText>Select Guests</GuestsText>
                                        </div>
                                    </Guests>
                                    <SearchButton type="submit" >
                                        <img src={SearchIcon} alt="" />
                                        <SearchButtonText>Search</SearchButtonText>
                                    </SearchButton>
                                </Form>
                            </ShowcaseBottomWrapper>
                        </ShowcaseBottom>
                    </section>



                    {/* <Grid item className={classes.loginContainer} >
                <Grid container justify="center">
                    <Grid item xs={10} md={5}>
                        <Paper style={{backgroundColor:'#14adc5a8',minHeight:'350px', width:'100%'}}>
                        <div className={classes.formContainer}>
                            <form onSubmit={this.onSubmit} className={classes.form} noValidate autoComplete="off">
                                <div className={classes.location}>
                                    <LocationOnIcon htmlColor="#046FA7" fontSize="default"/>
                                    <div style={{width:'100%',height:'90%'}}>
                                    <TextField className="home-location single" name="location" classes={{root:{width:'100%'}}} label="Location" value={this.state.location} onChange={this.changeHandler} placeholder="Search anyplace e.g Lagos"/> */}

                    {/* <label htmlFor="location" style={{height:'20%', marginLeft:'10px'}} >Location</label>
                                        <input value={this.state.location} onChange={this.changeHandler} name="location" placeholder="Search anyplace e.g Lagos"  style={{width:'100%',height:'60%',border:'none',padding:'5px 10px 10px 10px', borderRadius:'0 10px 10px 0', outline:0}} /> */}
                    {/* </div>
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
                                        name="checkIn"
                                        value={this.state.checkIn}
                                        onChange={(e)=>{
                                            if(Date.parse(e)>Date.parse(this.state.checkOut))
                                            this.setState({checkIn:e,checkOut:e},()=>{this.setDays()})
                                            else
                                            this.setState({checkIn:e},()=>{this.setDays()})
                                        }
                                        }
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
                                        name="checkOut"
                                        value={this.state.checkOut}
                                        onChange={(e)=>{this.setState({checkOut:e})}}
                                        />
                                    </div>
                                </div>
                                
                                <div className={classes.row1}>
                                    <div className={classes.checkIn}>
                                        <People htmlColor="#046FA7" fontSize="default" />
                                        <TextField onChange={this.changeHandler} name="guest" className="home-guest single" label="Guest"/>
                                    </div>
                                    <div style={{width:'45%'}}>
                                        <Button type="submit" className={classes.btn}>Search</Button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid> */}
                    <Grid container justify="center" >
                        <Grid item xs={11} md={10} >
                            <Typography classes={{ root: classes.title }} variant="h3">Where would you like to stay?</Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6} md={3} lg={3} >
                                    <Stays title="House" link={`/search?type=house`} image={house} available={1000} color={'#DF6C08'} />
                                </Grid>
                                <Grid item xs={12} sm={6} md={3} lg={3}>
                                    <Stays title="Bungalows" link={`/search?type=bungalow`} image={bangalow} available={1000} />
                                </Grid>
                                <Grid item xs={12} sm={6} md={3} lg={3}>
                                    <Stays title="Hotels" link={`/search?type=hotel`} image={condos} available={1000} color="#DF0808" />
                                </Grid>
                                <Grid item xs={12} sm={6} md={3} lg={3}>
                                    <Stays title="Duplex" link={`/search?type=duplex`} image={cottage} available={1000} color="#000000" />
                                </Grid>
                            </Grid>

                            {
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
                            }

                            <Typography variant="h4" classes={{ root: classes.title }} style={{ marginTop: 90 }} align="center">Reasons to Explore With Us</Typography>
                            <Container >
                                <Grid container justify="center" >
                                    <Grid item xs={12} sm={10} md={10}>
                                        <Grid container justify="center" spacing={8}>
                                            <Grid item xs={12} sm={4} md={4}>
                                                <IconBox image={trust} name="Reliable" />
                                            </Grid>
                                            <Grid item xs={12} sm={4} md={4}>
                                                <IconBox image={focus} name="Fast" />
                                            </Grid>
                                            <Grid item xs={12} sm={4} md={4}>
                                                <IconBox image={jigsaw} name="Convenient" />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Container>

                            <Typography variant="h4" classes={{ root: classes.title }}>Explore Cribs by City</Typography>
                            <Grid style={{ position: 'relative' }} container>
                                <Explore content={[{ name: 'Lagos City', image: lagos, description: '440+ VERIFIED STAYS Book sunny lofts, beachfront flats, and more', link: '/search?city=lagos' }, { name: 'Abuja City', image: abuja, description: '440+ VERIFIED STAYS Book sunny lofts, beachfront flats, and more', link: '/search?city=abuja' }, { name: 'Kano City', image: kano, description: '440+ VERIFIED STAYS Book sunny lofts, beachfront flats, and more', link: '/search?city=kano' }, { name: 'Benin City', image: benin, description: '440+ VERIFIED STAYS Book sunny lofts, beachfront flats, and more', link: '/search?city=benin' }]} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </>
        )
    }
}
export default withRouter(withStyles(styles)(Index));
