import React from 'react';
import { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { userContext } from '../../App';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { useState } from 'react';
import { Button, Container } from '@material-ui/core';
import Bookings from '../Bookings/Bookings';

const Book = () => {
    const { bedType } = useParams();
    const [loggedInUser, setLoggedInUser] = useContext(userContext);

    const [selectedDate, setSelectedDate] = useState({
        checkIn: new Date(),
        checkOut: new Date()
    });

    const handleCheckInDate = (date) => {
        const newDates = { ...selectedDate }
        newDates.checkIn = date
        setSelectedDate(newDates);
    };
    const handleCheckOutDate = (date) => {
        const newDates = { ...selectedDate }
        newDates.checkOut = date
        setSelectedDate(newDates);
    };
    const handleBooking = () => {
        const newBooking = {...loggedInUser, ...selectedDate}
        fetch('http://localhost:5000/addBooking',{
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(newBooking)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })
        
    }
    return (
        <div style={{ textAlign: 'center' }} className="container">
            <Container maxWidth="sm">
                <h1>Hello, {loggedInUser.name} Let's book a {bedType} Room.</h1>
                <p>Want a <Link to="/home">different room?</Link> </p>


                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justifyContent="space-around">
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="dd/MM/yyyy"
                            margin="normal"
                            id="date-picker-inline"

                            value={selectedDate.checkIn}
                            onChange={handleCheckInDate}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />

                        <KeyboardDatePicker
                            margin="normal"
                            id="date-picker-dialog"

                            format="dd/MM/yyyy"
                            value={selectedDate.checkOut}
                            onChange={handleCheckOutDate}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </Grid>
                    <Button onClick={handleBooking} variant="contained" color="primary">
                        Primary
                    </Button>
                </MuiPickersUtilsProvider>
                <Bookings/>
            </Container>

        </div>
    );
};

export default Book;