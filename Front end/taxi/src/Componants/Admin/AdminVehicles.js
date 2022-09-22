import React, { useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import CircularUnderLoad from '../includes/CircularUnderLoad';
import {useState} from 'react'
import AdminVehiclesRow from './AdminVehiclesRow';
import { Link } from 'react-router-dom';

function AdminVehicles() {
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
            setUrl('http://localhost:8080/allvehicles');
        }
        else{
            setUrl('http://localhost:8080/branchVehicles/'+branch);
        }
    },[branch])

    useEffect(()=>{
        setTimeout(()=>{
            fetch(url)
            .then((response)=>{
                if(!response.ok){
                    console.log("!response.ok");
                    throw Error('data not found');
                }
                else{
                    console.log("response.ok")
                    return response.json();
                }
            })
            .then((data)=>{
                setBookings(data);
                console.log(data);
            })
            .catch((err)=>{
                // setBookings('');
                console.log(err);
            });
        },1000);

    },[url]);

    console.log(url);

    return (
        <div className='mybookings'>
            <h2>Vehicles</h2>
            <p><Link to='/addbranchvehicle'>Add Vehicle</Link></p>

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
                    <th>Vehicle ID</th>
                    <th>Vehicle Number</th>
                    <th>Vehicle Branch</th>
                    <th>Vehicle Type</th>
                    <th>Vehicle Brand</th>
                    <th>Vehicle Model</th>
                    <th>Vehicle Avalibility</th>
                    <th>Delete</th>
                </tr>

                {bookings ? (
                    bookings.map((d)=> 
                        <>
                            <AdminVehiclesRow {...d}/>
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

export default AdminVehicles