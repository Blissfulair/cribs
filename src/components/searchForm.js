
import React,{useState} from "react";
import {withStyles} from "@material-ui/core/styles"
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Calendar from "@material-ui/icons/Today"
import People from "@material-ui/icons/PeopleOutline"
import {Grid, TextField} from "@material-ui/core"
import { DatePicker } from "@material-ui/pickers";
const styles = theme =>({

    form:{
        display:'flex',
        justifyContent:'space-between',
        alignItems:'center'
    },
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
    }
})
const SearchForm = (props)=>{
    const {classes} = props
    const [locationF, setLocationF]=useState(false)
    const [checkIn, setCheckIn]=useState(false)
    const [selectedDate, handleDateChange] = useState(new Date());
    return(
        <Grid container>
            <Grid item xs={false} md={1}/>
            <Grid item xs={12} md={9}>
                <form className={classes.form} noValidate={false} autoComplete="off">
                    <div className={classes.location} style={{borderColor:locationF?'#00A3C5':'#DCDCDC'}}>
                        <LocationOnIcon htmlColor="#046FA7" fontSize="default"/>
                        <div style={{width:'100%',height:'90%'}}>
                            <label htmlFor="location" style={{height:'20%', marginLeft:'10px'}} >Location</label>
                            <input onFocus={()=>setLocationF(true)} onBlur={()=>setLocationF(false)}  placeholder="Search anyplace of your choice"  style={{width:'100%',height:'60%',border:'none',padding:'5px 10px 10px 10px', borderRadius:'0 10px 10px 0', outline:0}} />
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
                    </div>
                    
                    <div className={classes.row1}>
                        <div className={classes.checkIn}>
                            <label style={{cursor:'pointer',marginRight:10}} htmlFor="end">
                                <Calendar htmlColor="#046FA7" fontSize="default"/>
                            </label>
                            <DatePicker
                            id="end"
                            label="Check In"
                            format="dd/MM/yyyy"
                            value={selectedDate}
                            onChange={handleDateChange}
                            />
                        </div>
                    </div>
                    <div className={classes.row1}>
                        <div className={classes.checkIn}>
                            <People htmlColor="#046FA7" fontSize="default" />
                            <TextField className="single" label="Guest"/>
                        </div>
                    </div>
                    <div className={classes.row2}>
                        <div>
                            <button className={classes.btn}>Search</button>
                        </div>
                    </div>
                </form>
            </Grid>
        </Grid>
    )
}
export default withStyles(styles)(SearchForm);