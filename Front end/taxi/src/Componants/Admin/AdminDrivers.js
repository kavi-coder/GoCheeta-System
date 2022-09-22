import React, { useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import {useState} from 'react'
import AdminDriversRow from './AdminDriversRow';
import CircularUnderLoad from '../includes/CircularUnderLoad';
import { Link } from 'react-router-dom';

function AdminDrivers() {
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
            setUrl('http://localhost:8080/alldrivers');
        }
        else{
            setUrl('http://localhost:8080/branchDrivers/'+branch);
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
                setBookings(data);
            })
            .catch((err)=>console.log(err.message));
        },1000);

    },[url]);
    
    // const {data: bookings}=useFetch('http://localhost:8080/findAllBookings');

    

    return (
        <div className='mybookings'>
            <h2>Drivers</h2>
            <p><Link to='/addbranchdriver'>Add Driver</Link></p>

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
                    <th>Driver ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Driver Avalibility</th>
                    <th>Delete</th>
                </tr>

                {bookings ? (
                    bookings.map((d)=> 
                        <>
                            <AdminDriversRow {...d}/>
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

export default AdminDrivers