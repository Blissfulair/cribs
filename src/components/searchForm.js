
import React,{useState,useContext} from "react";
import {withStyles} from "@material-ui/core/styles"
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Calendar from "@material-ui/icons/Today"
import People from "@material-ui/icons/PeopleOutline"
import {Grid, TextField, Button} from "@material-ui/core"
import { DatePicker } from "@material-ui/pickers";
import "../scss/header.scss"
import {withRouter} from "react-router-dom"
import AppContext from "../state/context";
const styles = theme =>({

    location:{
        height:'50px',
        width:'25%',
        display:'flex',
        backgroundColor:'#fff',
        border:'1px solid #DCDCDC',
        boxShadow:'0px 3px 6px #00000029',
        borderRadius:'10px',
        alignItems:'center',
        paddingLeft:'10px'
    },
    row1:{
       
        width:'15%',
        display:'flex',
        height:'50px',
        justifyContent:'space-between',
        backgroundColor:'#fff',
        alignItems:'center',
        border:'1px solid #DCDCDC',
        boxShadow:'0px 3px 6px #00000029',
        borderRadius:'10px',
        paddingLeft:'10px'

    },
    row2:{
       
        width:'15%',
        display:'flex',
        height:'50px',
        justifyContent:'center',
        backgroundColor:'#00A8C8',
        alignItems:'center',
        border:'1px solid #00A3C5',
        boxShadow:'0px 3px 6px #00000029',
        borderRadius:'10px'

    },
    checkIn:{
        height:'50px',
        display:'flex',
        alignItems:'center',
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
        outline:0,
        textTransform:'capitalize'
    },
    title:{
        margin:'40px 0 20px 0',
        fontSize:'28px'
    },
    stays:{
        display:'grid',

        gridTemplateColumns:'repeat(4, 24%)',
        gridColumnGap:'1.333%'
    }
})
const SearchForm = (props)=>{
    const {classes} = props
    const [locationF, setLocationF]=useState(false)
    const [data, setData]=useState({
        location:'',
        checkIn:new Date(),
        checkOut:new Date(),
        guest:''
    })
    const {searchProperties,setSearch}=useContext(AppContext)
    // const [checkIn, setCheckIn]=useState(false)
    const onSubmit =(e)=>{
        e.preventDefault()
        setSearch(data);
        searchProperties(data.location, '','',3,props.history)
    }
    return(
        <Grid container>
            <Grid item xs={false} md={1}/>
            <Grid item xs={12} md={9}>
                <form onSubmit={onSubmit} className='search-forms' autoComplete="off">
                    <div className={classes.location} style={{borderColor:locationF?'#00A3C5':'#DCDCDC'}}>
                        <LocationOnIcon htmlColor="#046FA7" fontSize="default"/>
                        <div style={{width:'100%',height:'90%'}}>
                            <label htmlFor="location" style={{height:'20%', marginLeft:'10px'}} >Location</label>
                            <input onFocus={()=>setLocationF(true)} onChange={(e)=>setData({...data, location:e.target.value})} onBlur={()=>setLocationF(false)}  placeholder="Search anyplace of your choice"  style={{width:'100%',height:'60%',border:'none',padding:'5px 10px 10px 10px', borderRadius:'0 10px 10px 0', outline:0}} />
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
                            value={data.checkIn}
                            onChange={(e)=>setData({...data, checkIn:e})}
                            />
                        </div>
                    </div>
                    
                    <div className={classes.row1}>
                        <div className={classes.checkIn}>
                            <label style={{cursor:'pointer',marginRight:10}} htmlFor="end">
                                <Calendar htmlColor="#046FA7" fontSize="default"/>
                            </label>
                            <DatePicker
                            id="end"
                            label="Check Out"
                            format="dd/MM/yyyy"
                            value={data.checkOut}
                            onChange={(e)=>setData({...data, checkOut:e})}
                            />
                        </div>
                    </div>
                    <div className={classes.row1}>
                        <div className={classes.checkIn}>
                            <People htmlColor="#046FA7" fontSize="default" />
                            <TextField onChange={(e)=>setData({...data, guest:e.target.value})} className="single" label="Guest"/>
                        </div>
                    </div>
                    <div className={classes.row2}>
                        <div>
                            <Button type="submit" className={classes.btn}>Search</Button>
                        </div>
                    </div>
                </form>
            </Grid>
        </Grid>
    )
}
export default withRouter(withStyles(styles)(SearchForm));