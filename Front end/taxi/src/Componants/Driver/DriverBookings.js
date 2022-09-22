import React, { useEffect } from 'react';
import useFetch from '../includes/useFetch';
import {useNavigate} from 'react-router-dom';
// import CircularUnderLoad from '../includes/CircularUnderLoad';
import DriverBookingRow from './DriverBookingRow';

function DriverBookings() {
    const navigate = useNavigate(); 

    const driver=JSON.parse(localStorage.getItem('driver'));

    useEffect(()=>{
        if(!driver){
            navigate('/');
        }
    },[driver])

    const {data: bookings}=useFetch('http://localhost:8080/driverbookings/'+driver.id);
    console.log(bookings)

    return (
        <div className='mybookings'>
            <h2>Driver Bookings</h2>
            {/* {bookings?(<p>Total Bookings : {bookings.length}</p>):(<></>)} */}
            
            <table id="customers">
                <tr>
                    <th>Booking ID</th>
                    <th>Customer Name</th>
                    <th>Pick Up</th>
                    <th>Destination</th>
                    <th>Vehicle</th>
                    <th>Vehicle Type</th>
                    <th>Vehicle Number</th>
                    <th>Delete</th>
                </tr>
    
                {bookings ? (
                    bookings.map((d)=> 
                        <>
                            <DriverBookingRow {...d}/>
                        </>
                    )
                    ) : (
                        <>
                            {/* <CircularUnderLoad/> */}
                        </>
                    )
                }
                
            </table>
        </div>
      )
}

export default DriverBookings
