import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles"
import {
    Grid,
    Button,
    Typography,
    Paper,
    Tabs,
    Tab,
    TextField,
    Divider,
    Avatar,
    Box,
    LinearProgress,
    NativeSelect,
} from '@material-ui/core';
import DetailSlide from "../components/detailSlide";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import OpenInBrowserSharpIcon from '@material-ui/icons/OpenInBrowserSharp';
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
import BusinessIcon from '@material-ui/icons/Business';
import KingBedIcon from '@material-ui/icons/KingBedOutlined';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import BathtubIcon from '@material-ui/icons/BathtubOutlined';
import KitchenIcon from '@material-ui/icons/Kitchen';
import LocalParkingIcon from '@material-ui/icons/LocalParking';
import TvIcon from '@material-ui/icons/Tv';
import WifiIcon from '@material-ui/icons/Wifi';
import Rating from '@material-ui/lab/Rating';
import Calendar from "@material-ui/icons/Today"
import SmokeFreeIcon from '@material-ui/icons/SmokeFree';
import { DatePicker } from "@material-ui/pickers";
import MapContainer from "../components/map";
import Review from "../components/review"
import { withRouter } from "react-router-dom"
import './../scss/single.scss'
import AppContext from "../state/context";
import Splash from "../components/splash";
import PopUP from "../components/popup";
import { getDates, getFav } from "../helpers/helpers";
import CancelIcon from '@material-ui/icons/CancelOutlined';
import Share from "../components/share";
import HostPopUp from "../components/hostPopUp";
import BookingCalendar from "../react-calender/src/BookingCalendar";
import FavoriteIcon from '@material-ui/icons/Favorite';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { connect } from "react-redux";
import { setCrib } from "../state/actions";
import { getCribById } from "../apis/server";
import AppHeader from "../components/header";
const styles = theme => ({
    container: {
        paddingTop: 140,

    },
    formControl: {
        minWidth: 120,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    input: {
        paddingTop: 0,
        marginLeft: 10
    },
    text: {
        color: '#070000'
    },
    title: {
        margin: '40px 0 20px 0',
        fontSize: '28px'
    },
    background: {
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative'
    },
    overlay: {
        backgroundColor: '#C8BB00',
        opacity: 0.35,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
    },
    overlay1: {
        backgroundColor: '#000000',
        opacity: 0.41,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 3
    },
    root: {
        flexGrow: 1,
        borderRadius: 0,
        marginTop: 30
    },
    payment: {
        minHeight: 500,
        borderRadius: 0,
        backgroundColor: '#F8F8F8'
    },
    checkIn: {
        height: '50px',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#fff',
        border: '1px solid #DCDCDC',
        padding: '0px 16px'
    },
    guest: {
        marginTop: 17,
        marginBottom: 17
    },
    position: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: 25
    },
    textTitle: {
        marginLeft: 10,
    },
    subTitle: {
        color: '#000000',
        fontWeight: 'bold',
        margin: '23px 0'
    },
    progressBarTitle: {
        color: '#00B2CE',
        marginTop: 20,
        fontSize: 13,
        marginBottom: 2
    }
})
const BorderLinearProgress = withStyles((theme) => ({
    root: {
        height: 15,
        borderRadius: 8,
    },
    colorPrimary: {
        backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 0 : 700],
    },
    bar: {
        borderRadius: 8,
        backgroundColor: '#00B2CE',
    },
}))(LinearProgress);

class Single extends Component {
    static contextType = AppContext
    constructor(props) {
        super(props)
        this.state = {
            value: 0,
            price: 0,
            change: false,
            clear: true,
            selected: [],
            values: '1000',
            rooms: null,
            room: [],
            property: null,
            checkIn: null,
            checkOut: null,
            days: 1,
            open: false,
            triger: false,
            hostTriger: false,
            guest: 1,
            favourite: false,
            loading: true,
            labels: {
                1: 'Mediocre',
                2: 'Okay',
                3: 'Good',
                4: 'Excellent',
                5: 'Excellent'
            },
        }
        this.propert = null
    }

    handleChange = (event, newValue) => {
        this.setState({ value: newValue });
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };
    shareOpen = () => {
        this.setState({ triger: true });
    };
    hostOpen = () => {
        this.setState({ hostTriger: true });
    };
    shareClose = () => {
        this.setState({ triger: false });
    };
    hostClose = () => {
        this.setState({ hostTriger: false });
    };
    setDays = () => {
        const dates = getDates(this.state.checkIn, this.state.checkOut)
        this.setState({ days: dates.length })
    }
    onFavourite = () => {
        let favourites = []
        let item = this.props.user?this.props.user.id:'fi'
        let favourite = JSON.parse(window.localStorage.getItem(`@${item}`))
        if (favourite !== null) {
            favourites = [this.state.property._id.replace('/', ''), ...favourite]
        }
        else
            favourites.push(this.state.property._id.replace('/', ''))
        try {
            window.localStorage.setItem(`@${item}`, JSON.stringify(favourites))
            this.setState({ favourite: true })
        }
        catch (e) { }
    }
    onDeleteFavourite = () => {
        try {
            let item = this.props.user?this.props.user.id:'fi'
            let favourites = JSON.parse(window.localStorage.getItem(`@${item}`))
            if (favourites !== null) {
                const newFavourites = favourites.filter(data => data !== this.state.property._id)
                window.localStorage.setItem(`@${item}`, JSON.stringify([...newFavourites]))
            }
            this.setState({ favourite: false })
        }
        catch (e) { }


    }
    componentDidMount() {
        const id = this.props.location.pathname.split('crib')[1].replace('/', '')
        getCribById(id)
            .then(crib => {
                this.props.setCrib(crib)
                const checkIn = new Date()
                const checkOut = new Date()
                const dates = getDates(checkIn, checkOut);
                this.setState({ loading: false, days: dates.length, price: crib.amount, property: crib })
            })
        // this.context.getPropertyById(id)
        // .then((property)=>{
        //     const checkOut = this.context.state.searchQuery?new Date(this.context.state.searchQuery.checkOut):new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
        //     const checkIn = this.context.state.searchQuery?new Date(this.context.state.searchQuery.checkIn):new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
        //     const dates = getDates(checkIn,checkOut);
        //     this.context.storeActivity(property)
        // this.setState({loading:false, days:dates.length, price:property.amount, property:property})
        // })
        const favourite = getFav(id, this.props.user)
        this.setState({
            favourite: favourite,
            property: this.props.crib,
            guest: 1,//this.context.state.searchQuery?this.context.state.searchQuery.guest:1,
            checkIn: new Date(),//this.context.state.searchQuery?new Date(this.context.state.searchQuery.checkIn):new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
            checkOut: new Date()//this.context.state.searchQuery?new Date(this.context.state.searchQuery.checkOut):new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())
        })
    }
    // useEffect(()=>{
    // const id = location.pathname.split('crib')[1]
    // getPropertyById(id)
    // setProperty(state.property)
    // }, [getPropertyById,location.pathname,state.property])
    componentWillUnmount() {
        this.propert = null
    }

    onReserved = (para) => {
        window.sessionStorage.setItem('?' + para.id, JSON.stringify(para))
        this.props.history.push({
            pathname: '/app/payment',
            search: para.id,
            state: para
        })
    }
    onDelete = (id) => {
        let rooms = null
        let amount = 0
        const books = []
        let value = null
        this.state.room.splice(id, 1)
        this.state.room.forEach(room => {
            amount += Number(room.price)
            books.push(...room.bookedDates)
        })
        rooms = {
            price: amount,
            bookedDates: books
        }
        this.state.selected.splice(this.state.selected.indexOf(this.state.property.rooms[id].room), 1)

        if (id >= 1) {
            value = id - 1
        }
        else
            value = id + 1
        if (this.state.room.length < 1) {
            value = '1000'
            this.state.property.rooms.forEach(room => {
                amount += Number(room.price)
                books.push(...room.bookedDates)
            })
            rooms = {
                price: amount,
                bookedDates: books
            }
        }
        this.setState({ room: this.state.room, rooms: rooms, price: amount, values: value })
    }

    onChangeRoom = (item) => {
        let amount = 0
        let books = []
        let rooms = null
        let room = []
        let value = null
        let selected = ''
        // if(item.target.value === '1000'){
        //     this.state.property.rooms.forEach(room=>{
        //         amount += Number(room.price)
        //         books.push(...room.bookedDates)
        //     })
        //     rooms = {
        //         price:amount,
        //         bookedDates:books
        //     }
        //     room.push(...this.context.state.property.rooms)
        // }
        // else{
        // amount = this.context.state.property.rooms[item.target.value].price
        // rooms = this.context.state.property.rooms[item.target.value]
        //     room.push(this.context.state.property.rooms[item.target.value])
        // }

        // this.setState({price:amount, rooms:rooms, room:room, change:true})
        if (item.target.value === '1000') {
            this.state.property.rooms.forEach(room => {
                amount += Number(room.price)
                books.push(...room.bookedDates)
            })
            value = item.target.value
            room.push(...this.props.crib.rooms)

        }
        else {
            this.state.room.forEach(room => {
                amount += Number(room.price)
                books.push(...room.bookedDates)
            })
            amount += this.state.property.rooms[item.target.value].price
            books.push(...this.state.property.rooms[item.target.value].bookedDates)
            room.push(this.state.property.rooms[item.target.value])
            value = item.target.value
            selected = this.state.property.rooms[item.target.value].room

        }
        rooms = {
            price: amount,
            bookedDates: books
        }
        this.setState({ change: true, room: [...this.state.room, ...room], rooms: rooms, price: amount, values: value, selected: [...this.state.selected, selected] })

    }
    render() {
        const { classes } = this.props
        this.propert = this.state.property
        const property = this.propert
        if (property)
            property.amount = this.state.price
        const summary = {
            checkIn: this.state.checkIn,
            checkOut: this.state.checkOut,
            nights: this.state.days,
            guest: this.state.guest,
            amount: property ? Number(property.amount) : 0,
            id: property ? property._id : '',
            name: property ? property.name : '',
            rooms: this.state.room.length < 1 ? property ? property.rooms : [] : this.state.room,
            state: property ? property.state : '',
            city: property ? property.city : '',
            image: property ? property.featuredImage : '',
            firstname: property ? property.host.firstname : '',
            lastname: property ? property.host.lastname : '',
            phone: property ? property.host.phone : '',
            hostEmail: property ? property.host.email : '',
            photoURL: null,
            address: property ? property.address : '',
            hostId: property ? property.hostId : '',
        }
        let checkOut = []
        let checkIn = []
        let dates = []
        if (property) {
            let books = []
            property.rooms.forEach((room) => {
                room.bookedDates.forEach(dates=>{
                    books.push(...dates.dates)
                })
            })

            checkOut = books.filter(item => new Date(item).toDateString() === new Date(this.state.checkOut).toDateString())
            checkIn = books.filter(item => new Date(item).toDateString() === new Date(this.state.checkIn).toDateString())
            books.forEach(date => dates.push(new Date(date)))
            dates.sort((a, b) => new Date(b) - new Date(a))
        }
        if (this.state.rooms && this.state.change) {

            checkOut = this.state.rooms.bookedDates.filter(item => new Date(item).toDateString() === new Date(this.state.checkOut).toDateString())
            checkIn = this.state.rooms.bookedDates.filter(item => new Date(item).toDateString() === new Date(this.state.checkIn).toDateString())

            this.state.rooms.bookedDates.forEach(date => dates.push(new Date(date)))
            dates.sort((a, b) => new Date(b) - new Date(a))
        }

        if (this.state.loading)
            return <Splash />
        return (
            <>
                <AppHeader />
                <Grid container justify="center">
                    <Grid item xs={11} md={10} >
                        {
                            property &&
                            <div id="singlepage" className={classes.container}>
                                <Grid container justify="flex-start" style={{ position: 'relative' }} spacing={3}>
                                    <Grid item xs={12} md={8} sm={12}>
                                        <Grid container>
                                            <Grid item xs={4}>
                                                <div className={classes.background} id="slideTop" style={{ backgroundImage: `url(${process.env.REACT_APP_BACKEND_URL}/${property.featuredImage})` }}>
                                                    <div className={classes.overlay}></div>
                                                </div>
                                                <div className={classes.background} id="slideBottom" style={{ backgroundImage: `url(${process.env.REACT_APP_BACKEND_URL}/${property.images[0]})` }}></div>
                                            </Grid>
                                            <Grid item xs={8}>
                                                <div className={classes.background} id="slide-cover">
                                                    <div className={classes.overlay1}></div>
                                                    <DetailSlide content={[property.featuredImage, ...property.images]} />
                                                </div>
                                            </Grid>
                                        </Grid>
                                        <Paper elevation={0} className={classes.root}>
                                            <Tabs
                                                value={this.state.value}
                                                onChange={this.handleChange}

                                                centered
                                            >
                                                <a href="#overview">
                                                    <Tab label="Overview" />
                                                </a>
                                                <a href="#amenities">
                                                    <Tab label="Amenities" />
                                                </a>
                                                <a href="#reviews">
                                                    <Tab label="Reviews" />
                                                </a>
                                                <a href="#location">
                                                    <Tab label="Location" />
                                                </a>
                                            </Tabs>
                                            <Box p={3}>
                                                <Typography style={{ marginBottom: 30 }} variant="h4" id="overview">{property.name}</Typography>
                                                <Grid>

                                                    <div >
                                                        <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr', columnGap: '1rem' }} >
                                                            <div className={classes.position} >
                                                                <BusinessIcon htmlColor="#00A8C8" fontSize="large" />
                                                                <Typography className={classes.textTitle} style={{textTransform:'capitalize'}} variant="subtitle1" component="p">{property.type}</Typography>
                                                            </div>
                                                            <div className={classes.position}>
                                                                <KingBedIcon htmlColor="#00A8C8" fontSize="large" />
                                                                <Typography className={classes.textTitle} variant="subtitle1" component="p">{property.bedroom} Bedrooms</Typography>
                                                            </div>
                                                        </div>

                                                        <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr', columnGap: '1rem' }}>
                                                            <div className={classes.position}>
                                                                <PeopleOutlineIcon htmlColor="#00A8C8" fontSize="large" />
                                                                <Typography className={classes.textTitle} variant="subtitle1" component="p">{property.guest} Guests</Typography>
                                                            </div>
                                                            <div className={classes.position}>
                                                                <BathtubIcon htmlColor="#00A8C8" fontSize="large" />
                                                                <Typography className={classes.textTitle} variant="subtitle1" component="p">{property.bathroom} Bathroms</Typography>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* <Grid container xs={5}>
                                            <Grid item sm={6}>
                                                <div className={classes.position} > 
                                                <BusinessIcon htmlColor="#00A8C8" fontSize="large"/>
                                                <Typography className={classes.textTitle}  variant="subtitle1" component="p">{property.type}</Typography>
                                                </div>
                                            </Grid>
                                        
                                            <Grid item  sm={12}>
                                                <div className={classes.position}>
                                                    <KingBedIcon htmlColor="#00A8C8" fontSize="large"/> 
                                                    <Typography className={classes.textTitle} variant="subtitle1" component="p">{property.bedroom} Bedrooms</Typography>
                                                </div>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={7}>
                                            <Grid item sm={6}>
                                                <div className={classes.position}>
                                                    <PeopleOutlineIcon htmlColor="#00A8C8" fontSize="large"/> 
                                                    <Typography className={classes.textTitle} variant="subtitle1" component="p">{property.guest} Guests</Typography>
                                                </div>
                                            </Grid>

                                            <Grid item sm={6}>
                                                <div className={classes.position}>
                                                    <BathtubIcon htmlColor="#00A8C8" fontSize="large"/> 
                                                    <Typography className={classes.textTitle} variant="subtitle1" component="p">{property.bathroom} Bathroms</Typography>
                                                </div>
                                            </Grid>
                                        </Grid> */}
                                                </Grid>
                                                <Divider />
                                                <Typography variant="subtitle1" component="p" style={{ margin: '15px 0', fontSize: 15, wordWrap: 'break-word' }}>
                                                    {
                                                        property.description
                                                    }
                                                </Typography>

                                                <Typography className={classes.subTitle} id="amenities">
                                                    Amenities
                                    </Typography>
                                                <Grid>
                                                    <div >
                                                        <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr', columnGap: '1rem' }}>
                                                            <div className={classes.position} style={{ textDecoration: property.kitchen ? 'none' : 'line-through' }} >
                                                                <KitchenIcon htmlColor="#00A8C8" fontSize="large" />
                                                                <Typography className={classes.textTitle} variant="subtitle1" component="p">Kitchen</Typography>
                                                            </div>
                                                            <div className={classes.position} style={{ textDecoration: property.parking ? 'none' : 'line-through' }}>
                                                                <LocalParkingIcon htmlColor="#00A8C8" fontSize="large" />
                                                                <Typography className={classes.textTitle} variant="subtitle1" component="p">Free parking on premises</Typography>
                                                            </div>
                                                        </div>
                                                        <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr', columnGap: '1rem' }}>
                                                            <div className={classes.position} style={{ textDecoration: property.wifi ? 'none' : 'line-through' }}>
                                                                <WifiIcon htmlColor="#00A8C8" fontSize="large" />
                                                                <Typography className={classes.textTitle} variant="subtitle1" component="p">WiFi</Typography>
                                                            </div>
                                                            <div className={classes.position} style={{ textDecoration: property.cable ? 'none' : 'line-through' }}>
                                                                <TvIcon htmlColor="#00A8C8" fontSize="large" />
                                                                <Typography className={classes.textTitle} variant="subtitle1" component="p">Cable TV</Typography>
                                                            </div>
                                                        </div>
                                                        <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr', columnGap: '1rem' }} >
                                                            <div className={classes.position} style={{ textDecoration: property.smoke ? 'none' : 'line-through' }}>
                                                                <SmokeFreeIcon htmlColor="#00A8C8" fontSize="large" />
                                                                <Typography className={classes.textTitle} variant="subtitle1" component="p">Smoke Alarm</Typography>
                                                            </div>
                                                            <div className={classes.position} style={{ textDecoration: property.smoke ? 'none' : 'line-through' }}>
                                                                <SmokeFreeIcon htmlColor="#00A8C8" fontSize="large" />
                                                                <Typography className={classes.textTitle} variant="subtitle1" component="p">Carbon Monoxide alarm</Typography>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* <Grid item xs={5}>
                                            <div className={classes.position} style={{textDecoration:property.kitchen?'none':'line-through'}} > 
                                            <KitchenIcon htmlColor="#00A8C8" fontSize="large"/>
                                            <Typography className={classes.textTitle}  variant="subtitle1" component="p">Kitchen</Typography>
                                            </div>
                                            <div className={classes.position} style={{textDecoration:property.wifi?'none':'line-through'}}>
                                                <WifiIcon htmlColor="#00A8C8" fontSize="large"/> 
                                                <Typography className={classes.textTitle} variant="subtitle1" component="p">WiFi</Typography>
                                            </div>
                                            <div className={classes.position} style={{textDecoration:property.smoke?'none':'line-through'}}>
                                                <SmokeFreeIcon htmlColor="#00A8C8" fontSize="large"/> 
                                                <Typography className={classes.textTitle} variant="subtitle1" component="p">Smoke Alarm</Typography>
                                            </div>
                                        </Grid>
                                        <Grid style={{backgroundColor:"#000"}} item xs={7}>
                                            <div className={classes.position} style={{textDecoration:property.parking?'none':'line-through'}}>
                                                <LocalParkingIcon htmlColor="#00A8C8" fontSize="large"/> 
                                                <Typography className={classes.textTitle} variant="subtitle1" component="p">Free parking on premises</Typography>
                                            </div>
                                            <div className={classes.position} style={{textDecoration:property.cable?'none':'line-through'}}>
                                                <TvIcon htmlColor="#00A8C8" fontSize="large"/> 
                                                <Typography className={classes.textTitle} variant="subtitle1" component="p">Cable TV</Typography>
                                            </div>
                                            <div className={classes.position} style={{textDecoration:property.smoke?'none':'line-through'}}>
                                                <SmokeFreeIcon htmlColor="#00A8C8" fontSize="large"/> 
                                                <Typography className={classes.textTitle} variant="subtitle1" component="p">Carbon Monoxide alarm</Typography>
                                            </div>
                                        </Grid> */}
                                                </Grid>
                                                <Divider />
                                                <Typography className={classes.subTitle}>Bedrooms</Typography>
                                                <Grid id='bedrooms'>
                                                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr', columnGap: '1rem' }}>
                                                        {
                                                            property.rooms.map((room, i) => (
                                                                <div key={i}>
                                                                    <div className={classes.position} style={{ marginBottom: 5 }}>
                                                                        <KingBedIcon htmlColor="#00A8C8" fontSize="large" />
                                                                        <Typography style={{textTransform:'capitalize'}} className={classes.textTitle} variant="subtitle1" component="p">{room.room}</Typography>
                                                                    </div>
                                                                    <Typography style={{ marginLeft: 32 }} variant="caption" component="p">{room.bed ? (room.bed === 1 ? '1 Bed' : room.bed + ' Beds') : 'No Bed'}</Typography>
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                </Grid>

                                                <Typography className={classes.subTitle}>Bathroom</Typography>
                                                <Grid id="bathroom">
                                                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr', columnGap: '1rem' }}>
                                                        {
                                                            property.rooms.map((room, i) => (
                                                                <>
                                                                    {
                                                                        room.bathroom > 0 ?
                                                                            <div key={i} className={classes.position} style={{ marginBottom: 5 }}>
                                                                                <BathtubIcon htmlColor="#00A8C8" fontSize="large" />
                                                                                <Typography className={classes.textTitle} style={{textTransform:'capitalize'}} variant="subtitle1" component="p">{room.room}</Typography>
                                                                            </div>
                                                                            : null
                                                                    }
                                                                </>
                                                            ))
                                                        }
                                                    </div>
                                                </Grid>
                                                <Divider style={{ marginTop: 20 }} />

                                                <Typography className={classes.subTitle}>Accessibility</Typography>
                                                <Grid id="accessibility">
                                                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr', columnGap: '1rem', paddingBottom: '1rem' }}>
                                                        <Typography className={classes.textTitle} style={{ marginLeft: 0 }} variant="subtitle1" component="p">GETTING INSIDE</Typography>
                                                        <Typography className={classes.textTitle} style={{ marginLeft: 0 }} variant="subtitle1" component="p">MOVING AROUND THE SPACE</Typography>

                                                    </div>

                                                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr', columnGap: '1rem' }}>
                                                        <Typography variant="caption" component="p">{property.inside}</Typography>
                                                        <Typography variant="caption" component="p">{property.around}</Typography>
                                                    </div>
                                                    {/* <Grid item xs={5}>
                                            <Typography className={classes.textTitle} style={{marginLeft:0}} variant="subtitle1" component="p">GETTING INSIDE</Typography>  
                                            <Typography variant="caption" component="p">Well-lit path to entrance Step-free path to entrance</Typography>                                    
                                        </Grid>
                                        <Grid item xs={5}>
                                            <Typography className={classes.textTitle} style={{marginLeft:0}} variant="subtitle1" component="p">MOVING AROUND THE SPACE</Typography>
                                            <Typography variant="caption" component="p">No stairs or steps to enter Wide hallways</Typography>
                                        </Grid> */}
                                                </Grid>

                                                <Grid container id="availability">
                                                    <Grid item>
                                                        <Typography className={classes.subTitle}>Availability</Typography>
                                                        <Typography>Enter your trip dates for accurate pricing and availability</Typography>
                                                        <BookingCalendar on bookings={dates} />
                                                    </Grid>
                                                </Grid>
                                            </Box>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <Paper className={classes.payment}>
                                            <Grid container justify="center">
                                                <Grid item xs={11}>
                                                    <Grid style={{ marginTop: 10 }} container>
                                                        <Grid item xs={9}>
                                                            <div>
                                                                <Typography style={{ color: '#00A8C8', fontWeight: 'bold', display: 'inline-flex' }} variant="h5">‎₦{property.amount}</Typography> avg/night
                                                    </div>
                                                            <Typography variant="subtitle2" style={{ fontSize: 12, marginTop: 15 }} component="p">
                                                                {property.guest} Guests | {property.bedroom} Bedrooms | {property.bedroom} beds | {property.bathroom} Baths
                                                    </Typography>
                                                            <Typography style={{ fontSize: 12 }} variant="subtitle2" component="p">
                                                                Excellent 4.7/5 Good for families
                                                    </Typography>
                                                            <Rating
                                                                disabled
                                                                name='kls'
                                                                defaultValue={property.rateValue / property.totalReviewer}
                                                                emptyIcon={<StarBorderIcon htmlColor="#fff" fontSize="small" />}
                                                                style={{ fontSize: 15, color: '#000000', margin: '15px 0' }}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={3}>
                                                            <Grid container spacing={1} alignItems="center">
                                                                <Grid item xs={6}>
                                                                    {
                                                                        !this.state.favourite ?
                                                                            <button style={{ background: 'transparent', border: 'none', cursor: 'pointer' }} onClick={this.onFavourite}>
                                                                                <FavoriteBorderIcon style={{ fontSize: 32 }} htmlColor="#000000" />
                                                                            </button>
                                                                            :
                                                                            <button style={{ background: 'transparent', border: 'none', cursor: 'pointer' }} onClick={this.onDeleteFavourite}>
                                                                                <FavoriteIcon style={{ fontSize: 32 }} htmlColor="#EB4F1E" />
                                                                            </button>
                                                                    }

                                                                </Grid>
                                                                <Grid item xs={6}>
                                                                    <Typography>Save</Typography>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid container spacing={1} alignItems="center">
                                                                <Grid item xs={6}>
                                                                    <button style={{ background: 'transparent', border: 'none' }} onClick={this.shareOpen}>
                                                                        <OpenInBrowserSharpIcon style={{ fontSize: 32 }} htmlColor="#000000" />
                                                                    </button>
                                                                </Grid>
                                                                <Grid item xs={6}>
                                                                    <Typography >Share</Typography>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    {
                                                        (checkIn.length < 1 && checkOut.length < 1) ?
                                                            <Typography style={{ display: 'flex', marginBottom: 6, color: '#4caf50' }} variant="subtitle2" component="p" >Dates Are Available to be Reserved &nbsp;<CheckCircleOutlinedIcon fontSize="small" htmlColor="#0BA4E0" /></Typography>
                                                            :
                                                            <Typography style={{ display: 'flex', marginBottom: 6, color: '#f44336' }} variant="subtitle2" component="p" >Dates Are Already Reserved, Try Other Dates &nbsp;<CancelIcon fontSize="small" htmlColor="#f44336" /></Typography>
                                                    }
                                                    <form autoComplete="off">
                                                        <Grid container spacing={1}>
                                                            <Grid item xs={6}>
                                                                <div className={classes.checkIn}>
                                                                    <label htmlFor="check-in">
                                                                        <Calendar htmlColor="#00A8C8" fontSize="small" />
                                                                    </label>
                                                                    <DatePicker
                                                                        className="single"
                                                                        id="check-in"
                                                                        label="Check-In"
                                                                        format="dd/MM/yyyy"
                                                                        value={this.state.checkIn}
                                                                        onChange={(e) => {
                                                                            if (Date.parse(e) > Date.parse(this.state.checkOut))
                                                                                this.setState({ checkIn: e, checkOut: e }, () => { this.setDays() })
                                                                            else
                                                                                this.setState({ checkIn: e }, () => { this.setDays() })
                                                                        }
                                                                        }
                                                                    />
                                                                </div>
                                                            </Grid>
                                                            <Grid item xs={6}>
                                                                <div className={classes.checkIn}>
                                                                    <label htmlFor="check-out">
                                                                        <Calendar htmlColor="#00A8C8" fontSize="small" />
                                                                    </label>
                                                                    <DatePicker
                                                                        className="single"
                                                                        id="check-out"
                                                                        label="Check-Out"
                                                                        format="dd/MM/yyyy"
                                                                        value={this.state.checkOut}
                                                                        onChange={(e) => { this.setState({ checkOut: e }, () => { this.setDays() }) }}
                                                                    />
                                                                </div>
                                                            </Grid>
                                                        </Grid>
                                                        <div className={classes.guest}>
                                                            <div className={classes.checkIn}>
                                                                <label htmlFor="check-out">
                                                                    <Calendar htmlColor="#00A8C8"  fontSize="small" />
                                                                </label>
                                                                <TextField defaultValue={property.guest} onChange={(e) => this.setState({ guest: e.target.value })} className="single" id="guest" label="Guests" variant="outlined" />
                                                            </div>
                                                        </div>
                                                        {
                                                            property.rooms !== undefined &&
                                                            property.rooms.length > 1 &&
                                                            <div className={classes.guest}>
                                                                <div className={classes.checkIn}>
                                                                    <label htmlFor="check-out">
                                                                        <KingBedIcon htmlColor="#00A8C8" fontSize="small" />
                                                                    </label>
                                                                    <NativeSelect disabled={this.state.room.length===property.rooms.length?true:false} multiple={true} style={{ width: '90%', marginLeft: '10%' }} onChange={this.onChangeRoom} value={this.state.values}>
                                                                        {
                                                                        this.state.room.length<property.rooms.length?
                                                                        <option value={1000}>All</option>
                                                                        :
                                                                        <option value={1000}>Selected all rooms</option>
                                                                        } 
                                                                        {

                                                                            property.rooms.map((room, i) => {
                                                                                if (!this.state.selected.includes(room.room)) {
                                                                                    return (
                                                                                        <option value={i}>{room.room}</option>
                                                                                    )
                                                                                }
                                                                                else
                                                                                    return null
                                                                            })

                                                                        }

                                                                    </NativeSelect>
                                                                </div>
                                                                {
                                                                    this.state.room.length > 0 &&
                                                                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: 10 }}>
                                                                        {
                                                                            this.state.room.map((room, i) => {
                                                                                return <button onClick={() => this.onDelete(i)} className="cancelBtn" type="button" style={{ border: 'none', borderRadius: 20, color: '#fff', margin: 5 }} key={i}>{room.room}</button>
                                                                            })
                                                                        }
                                                                    </div>
                                                                }
                                                            </div>
                                                        }
                                                        <Grid container spacing={1}>
                                                            <Grid item xs={8}>
                                                                <Typography variant="h5">Total</Typography>
                                                                <Typography variant="caption" component="p">Includes taxes and fees</Typography>
                                                            </Grid>
                                                            <Grid item xs={4}>
                                                                <Typography variant="h5" style={{ color: '#FF9C07', textAlign: 'right', fontWeight: 'bold' }}>₦{property.amount * this.state.days}</Typography>
                                                                {
                                                                    (checkIn.length < 1 && checkOut.length < 1) &&
                                                                    <Typography variant="caption" style={{ cursor: 'pointer' }} component="p" onClick={this.handleClickOpen}>view details</Typography>
                                                                }
                                                                <PopUP onReserved={this.onReserved} summary={summary} open={this.state.open} handleClose={this.handleClose} />
                                                                <Share text={property.name + '-' + property.description} url={'http://localhost:3000/crib/' + property._id.replace('/', '')} triger={this.state.triger} close={this.shareClose} />
                                                                <HostPopUp host={property.host} triger={this.state.hostTriger} close={this.hostClose} />
                                                            </Grid>
                                                        </Grid>
                                                        {
                                                            (checkIn.length < 1 && checkOut.length < 1) ?
                                                                <Button onClick={this.handleClickOpen} style={{ textTransform: 'capitalize', backgroundColor: '#00A8C8', width: '100%', borderRadius: 44, color: '#fff', padding: '10px 0', fontSize: 18, marginTop: 15 }} variant="contained" disableElevation>
                                                                    Reserve Now
                                                    </Button>
                                                                :
                                                                <Button style={{ textTransform: 'capitalize', backgroundColor: '#DEDEDE', width: '100%', borderRadius: 44, color: '#707070', padding: '10px 0', fontSize: 18, marginTop: 15 }} variant="disabled" disableElevation>
                                                                    Unavailable
                                                    </Button>
                                                        }

                                                        <Divider style={{ marginTop: 15, height: 3, backgroundColor: '#DCDCDC' }} />
                                                        <Typography variant="h6" style={{ textAlign: 'center', color: '#000000', paddingTop: '1rem' }} >Speak to the Host</Typography>
                                                        <Grid container style={{ marginTop: 10, marginBottom: 5 }}>
                                                            <Grid item xs={3}>
                                                                <Avatar alt={property.host.firstname} style={{ width: 50, height: 50 }} src={property.host.image} />
                                                            </Grid>
                                                            <Grid item xs={9}>
                                                                <Typography variant="subtitle1" component="p">{property.host.firstname + ' ' + property.host.lastname}</Typography>
                                                                <button type="button" style={{ background: 'transparent', border: 'none' }} onClick={this.hostOpen}>
                                                                    <Typography style={{ paddingBottom: '1rem' }} variant="caption" component="p">Contact host</Typography>
                                                                </button>
                                                            </Grid>
                                                        </Grid>
                                                    </form>
                                                </Grid>
                                            </Grid>
                                        </Paper>
                                    </Grid>
                                    <Grid container id="location" justify="flex-end">
                                        <Grid item xs={12} md={10}>
                                            <Paper elevation={0} style={{ borderRadius: 0, backgroundColor: "#ECECEC", position: 'relative', minHeight: 1000 }}>
                                                <div className="single-map">
                                                    <MapContainer />
                                                </div>
                                                <Grid container spacing={3} justify="center">

                                                    <Grid item xs={5}>
                                                        {
                                                            property.reviews.length > 0 &&
                                                            <>
                                                                <div style={{ marginTop: 570, marginBottom: 26 }}>
                                                                    <Typography className={classes.progressBarTitle}>{this.state.labels[Math.ceil(property.rateValue / property.totalReviewer)]}</Typography>
                                                                    <BorderLinearProgress variant="determinate" value={(property.rateValue / 5) * 100} />
                                                                    {/* <Typography className={classes.progressBarTitle}>Good</Typography>
                                                    <BorderLinearProgress variant="determinate" value={50}/>
                                                    <Typography className={classes.progressBarTitle}>Okay</Typography>
                                                    <BorderLinearProgress variant="determinate" value={15}/>
                                                    <Typography className={classes.progressBarTitle}>Mediocre</Typography>
                                                    <BorderLinearProgress variant="determinate" value={7}/> */}
                                                                </div>
                                                                <Grid container >
                                                                    <Grid item md={5}>
                                                                        <Typography variant="h5" style={{ fontWeight: 'bold' }}>{(property.rateValue / property.totalReviewer).toFixed(1)}</Typography>
                                                                        <Typography style={{ fontSize: 12, fontWeight: 500, marginBottom: 17 }} variant="subtitle1" component="p">Overall Rating</Typography>
                                                                        {/* <Typography variant="h5" style={{fontWeight:'bold'}}>4.3</Typography>
                                                        <Typography style={{fontSize:12,fontWeight:500, marginBottom:17}} variant="subtitle1" component="p">Amenities</Typography> */}
                                                                    </Grid>
                                                                    {/* <Grid item md={7}>
                                                        <Typography variant="h5" style={{fontWeight:'bold'}}>4.1</Typography>
                                                        <Typography style={{fontSize:12,fontWeight:500, marginBottom:17}} variant="subtitle1" component="p">Customer Service</Typography>
                                                        <Typography variant="h5" style={{fontWeight:'bold'}}>3.6</Typography>
                                                        <Typography style={{fontSize:12,fontWeight:500, marginBottom:17}} variant="subtitle1" component="p">Property Condition</Typography>
                                                    </Grid> */}
                                                                </Grid>
                                                            </>
                                                        }
                                                    </Grid>

                                                    <Grid item xs={6}>
                                                        <Grid container style={{ marginTop: 80 }}>
                                                            <Grid item md={10}>
                                                                {
                                                                    property.reviews.length > 0 ?
                                                                        property.reviews.map((item, i) => {
                                                                            return <Review number={i} property={property} data={item} key={i} />
                                                                        })
                                                                        :
                                                                        <Typography>No review for this crib yet!</Typography>
                                                                }
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Paper>

                                        </Grid>
                                    </Grid>
                                </Grid>
                            </div>
                        }
                    </Grid>
                </Grid>
            </>

        )
    }
}
const mapStateToProps = state => ({
    crib: state.crib,
    user: state.user
})
const mapDispatchToProps = dispatch => ({
    setCrib: (payload) => dispatch(setCrib(payload))
});
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(Single)));