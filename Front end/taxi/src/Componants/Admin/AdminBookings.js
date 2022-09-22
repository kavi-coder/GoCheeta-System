import React, { useEffect } from 'react';
import useFetch from '../includes/useFetch';
import {useNavigate} from 'react-router-dom';
import CircularUnderLoad from '../includes/CircularUnderLoad';
import AdminBookingsRow from './AdminBookingsRow';
import {useState} from 'react'

function AdminBookings() {
    const navigate = useNavigate(); 

    const [bookings,setBookings] = useState();
    const [url,setUrl] = useState();
    const [branch, setBranch] = useState("");

    const admin=JSON.parse(localStorage.getItem('admin'));

    useEffect(()=>{
        if(!admin){
            navigate('/login');
        }
    },[admin])

    useEffect(()=>{
        if(branch==""){
            setUrl('http://localhost:8080/findAllBookings');
        }
        else{
            setUrl('http://localhost:8080/findBranchBookings/'+branch);
        }
    },[branch])

    useEffect(()=>{
        setTimeout(()=>{
            fetch(url)
            .then((response)=>{
                if(!response.ok){
                throw Error('data not found');
                }
                else{
                return response.json();
                }
            })
            .then((data)=>{
                setBookings(data)
            })
            .catch((err)=>console.log(err.message));
        },1000);

    },[url]);

    console.log(bookings);
    
    // const {data: bookings}=useFetch('http://localhost:8080/findAllBookings');

    

    return (
        <div className='mybookings'>
            <h2>Bookings</h2>

            <div>
                <select name="pickup" id="pickup" onChange={(e) => setBranch(e.target.value)}>
                    <option value="" selected>All Branches</option>
                    <option value="Galle">Galle</option>
                    <option value="Kandy">Kandy</option>
                    <option value="Nugegoda">Nugegoda</option>
                    <option value="Gampaha">Gampaha</option>
                    <option value="Kurunagala">Kurunagala</option>
                    <option value="Jaffna">Jaffna</option>
                </select>
            </div>
            
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
                            <AdminBookingsRow {...d}/>
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

export default AdminBookings