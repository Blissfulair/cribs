import React, { useState } from 'react';
import Layout from './layout';
import '../../scss/dashboard_calendar.scss';


import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { Button } from '@material-ui/core';
import Calendar from 'react-calendar';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {withRouter} from 'react-router-dom'


import 'react-calendar/dist/Calendar.css';



const DashboardCalendar = ({history}) => {

    const [properties, ] = useState([
        {
            name: "Mary's Garden",
        },
        {
            name: "Peter's Garden",
        },
        {
            name: "John's Garden",
        },
    ]);


    const [available, setAvailable] = useState(true);

    const [bookingDate, setBookingDate] = useState(new Date());
    const bookNow = ()=>{
        history.push('/crib/lsjfsjlks')
    }
    const handlePropertyChange = (event) => {
        console.log(event.target.value)

    };

    const handleAvailable = () => {
        setAvailable(!available);
    }

    const handleCalendar = () => {
        setBookingDate(bookingDate);
    }

    return (
        <Layout>

            <div className="calendar__heading">
                <h1>Calendar</h1>
            </div>

            <div className="calendar__details">
                <div className="select__property">
                    {/* <h3>Select Property</h3>
                     */}
                    <label  for='properties'>
                        <h3 className='title'>Select Property</h3>
                    </label>
                    <FormControl  id="property">
                        <NativeSelect
                        className='input'
                        style={{width:'100%', height:'2rem'}}
                        // value={state.age}
                        onChange={handlePropertyChange}
                        IconComponent={ExpandMoreIcon}
                        inputProps={{
                            name: 'properties'
                        }}
                        >
                            {properties.map((property, index)=>{
                                return <option key={index} value={property.name} >{property.name}</option>
                            })}
                        </NativeSelect>
                    </FormControl>

                    <div className="availability">

                        <div className="availability__switch">
                            <h3 className='title'>Availability</h3>
                            <FormControlLabel
                                control={<Switch checked={available} onChange={handleAvailable} />}

                            />
                        </div>

                        <div className="room">
                            <h4 className='title'>Room</h4>
                            {/* <input type="number" placeholder='0' min='1' step='1' id="" /> */}
                            <FormControl >
                                <NativeSelect
                                className='input'
                                // value={state.age}
                                // onChange={handleChange}
                                style={{height:'1.6rem'}}
                                IconComponent={ExpandMoreIcon}
                                inputProps={{
                                    name: 'room'
                                }}
                                >
                                <option value="0">0</option>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                                </NativeSelect>
                            </FormControl>
                        </div>

                        <div className="guests">
                            <h4 className='title'>Guests</h4>
                            <FormControl >
                                <NativeSelect
                                 style={{height:'1.6rem'}}
                                className='input'
                                // value={state.age}
                                // onChange={handleChange}
                                IconComponent={ExpandMoreIcon}
                                inputProps={{
                                    name: 'guest'
                                }}
                                >
                                <option value="0">0</option>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                                </NativeSelect>
                            </FormControl>
                        </div>

                        <div className="price">
                            <h4 className='title'>Price</h4>
                            <div className="amount">2000</div>
                            <span>/night</span>
                        </div>
                        <Button onClick={bookNow} className='button__book'>Book</Button>

                    </div>

                </div>

                <div className="actual__calendar">
                    <Calendar
                        onChange={handleCalendar}
                        value={[new Date(2020, 9, 11), new Date(2020, 9, 9)]}
                        nextLabel={<ArrowForwardIcon style={{fontSize:15}}/>}
                        prevLabel={<ArrowBackIcon style={{fontSize:15}}/>}
                        defaultValue={[new Date(2020, 9, 11), new Date(2020, 9, 9)]
                        }
                        // activeStartDate={bookingDate}

                    />
                </div>
            </div>

        </Layout>
    );
}

export default withRouter(DashboardCalendar);
