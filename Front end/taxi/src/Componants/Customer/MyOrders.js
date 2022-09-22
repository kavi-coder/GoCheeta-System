import React, { useEffect } from 'react';
import useFetch from '../includes/useFetch';
import {useNavigate} from 'react-router-dom';
import CircularUnderLoad from '../includes/CircularUnderLoad';
import MyBookingrow from '../includes/MyBookingrow';

function Mybookings() {
    const navigate = useNavigate(); 

    const logged_user=JSON.parse(localStorage.getItem('logged_user'));

    useEffect(()=>{
        if(!logged_user){
            navigate('/login');
        }
    },[logged_user])
    
    const {data: bookings}=useFetch('http://localhost:8080/findBookings/'+logged_user.id);


    



  return (
    <div className='mybookings'>
        <h2>My Bookings</h2>
        
        <table id="customers">
            <tr>
                <th>Booking ID</th>
                <th>Pick Up</th>
                <th>Destination</th>
                <th>Vehicle</th>
                <th>Vehicle Type</th>
                <th>Vehicle Number</th>
                <th>Driver Name</th>
                {/* <th>Delete</th> */}
            </tr>

            {bookings ? (
                bookings.map((d)=> 
                    <>
                        <MyBookingrow {...d}/>
                    </>
                )
                ) : (
                    <>
                        <CircularUnderLoad/>
                    </>
                )
            }
            
        </table>
    </div>
  )
}

export default Mybookings