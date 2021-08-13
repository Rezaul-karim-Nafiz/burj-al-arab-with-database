import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { userContext } from '../../App';

const Bookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    useEffect(() => {
        fetch('http://localhost:5000/booking?email=' + loggedInUser.email)
        .then(res => res.json())
        .then(data => setBookings(data))
    },[loggedInUser.email])
    return (
        <div>
            <h3>You Have: {bookings.length} Bookings</h3>
            {
                bookings.map(book => <li>{book.name} from: {(new Date(book.checkIn).toDateString('dd/mm/yy'))} to: {(new Date(book.checkOut).toDateString('dd/mm/yy'))}</li>)
            }
        </div>
    );
};

export default Bookings;