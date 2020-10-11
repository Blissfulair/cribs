import React, { useState } from 'react';
import Layout from './layout';
import '../../scss/dashboard_calendar.scss';

import { makeStyles } from '@material-ui/core/styles';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { Button } from '@material-ui/core';
import Calendar from 'react-calendar';

import 'react-calendar/dist/Calendar.css';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));


const DashboardCalendar = () => {

    const [property, setProperty] = useState('');

    const [available, setAvailable] = useState(true);

    const [bookingDate, setBookingDate] = useState(new Date());

    const handleChange = (event) => {
        setProperty(event.target.value);
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
                    <label for='property'>Select Property</label>
                    <select name="property" id="property">
                        <option value="Mary's Garden">Mary's Garden</option>
                        <option value="Peter's Garden">Peter's Garden</option>
                        <option value="John's Garden">John's Garden</option>
                        <option value="audi">Audi</option>
                    </select>

                    <div className="availability">

                        <div className="availability__switch">
                            <h3>Availability</h3>
                            <FormControlLabel
                                control={<Switch checked={available} onChange={handleAvailable} />}

                            />
                        </div>

                        <div className="room">
                            <h4>Room</h4>
                            <input type="number" placeholder='0' min='1' step='1' id="" />
                        </div>

                        <div className="guests">
                            <h4>Guests</h4>
                            <input type="number" placeholder='0' min='0' step='1' />
                        </div>

                        <div className="price">
                            <h4>Price</h4>
                            <div className="amount">2000</div>
                            <span>/night</span>
                        </div>
                        <Button className='button__book'>Book</Button>

                    </div>

                </div>

                <div className="actual__calendar">
                    <Calendar
                        onChange={handleCalendar}
                        value={bookingDate}

                    />
                </div>
            </div>

        </Layout>
    );
}

export default DashboardCalendar;
