import React, { useEffect } from 'react';
import useFetch from '../includes/useFetch';
import {useNavigate} from 'react-router-dom';
import CircularUnderLoad from '../includes/CircularUnderLoad';
import BranchBookingRow from './BranchBookingRow';

function BranchBookings() {
    const navigate = useNavigate(); 

    const branchAdmin=JSON.parse(localStorage.getItem('branchAdmin'));

    useEffect(()=>{
        if(!branchAdmin){
            navigate('/');
        }
    },[branchAdmin])
    
    const {data: bookings}=useFetch('http://localhost:8080/findBranchBookings/'+branchAdmin.branch_name);


  return (
    <div className='mybookings'>
        <h2>Branch Bookings</h2>
        {bookings?(<p>Total Bookings : {bookings.length}</p>):(<></>)}
        
        <table id="customers">
            <tr>
                <th>Booking ID</th>
                <th>Customer Name</th>
                <th>Pick Up</th>
                <th>Destination</th>
                <th>Vehicle</th>
                <th>Vehicle Type</th>
                <th>Vehicle Number</th>
                <th>Driver Name</th>
                <th>Delete</th>
            </tr>

            {bookings ? (
                bookings.map((d)=> 
                    <>
                        <BranchBookingRow {...d}/>
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

export default BranchBookings