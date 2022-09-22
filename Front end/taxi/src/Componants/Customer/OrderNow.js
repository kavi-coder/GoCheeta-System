import React, { useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import CircularUnderLoad from '../includes/CircularUnderLoad';

function OrderNow() {
    const [error, setError] = useState();

    const [vehiclelist, setVehiclelist] = useState();
    const [driverlist, setDriverlist] = useState();

    const [pickup, setPickup] = useState();
    const [destination, setDestination] = useState();
    const [vehicle, setVehicle] = useState();
    const [driver, setDriver] = useState();
    const navigate = useNavigate(); 


    const logged_user=JSON.parse(localStorage.getItem('logged_user'));
    // console.log(logged_user);
    // setUser(logged_user);

    useEffect(()=>{
        if(!logged_user){
            navigate('/login');
        }
    },[logged_user])

    //load branch vehicles
    useEffect(()=>{
        setVehiclelist();
        setTimeout(()=>{
            fetch('http://localhost:8080/avalibleVehicles/'+pickup)
            .then((response)=>{
                if(!response.ok){
                    throw Error('data not found');
                }
                else{
                    return response.json();
                }
            })
            .then((data)=>{
                setVehiclelist(data);
            })
            .catch((err)=>console.log(err.message));
        },1000);

    },[pickup]);

    //load avalible driver
    useEffect(()=>{
        setDriverlist();
        setTimeout(()=>{
            fetch('http://localhost:8080/avalibleDrivers/'+pickup)
            .then((response)=>{
                if(!response.ok){
                    throw Error('data not found');
                }
                else{
                    return response.json();
                }
            })
            .then((data)=>{
                setDriverlist(data);
            })
            .catch((err)=>console.log(err.message));
        },1000);

    },[pickup]);


    const handleClick=(e)=>{
        e.preventDefault();

        if(!pickup || !destination || !vehicle || !driver){
            setError("All inputs are Required");
        }
        else{
            setError();
            if(pickup===destination){
                setError("check Pickup location and Destination location");
            }
            else{
                setError();

                    const newBooking={
                        user_id: logged_user.id,
                        pick_up: pickup,
                        destination: destination,
                        vehicle_id: vehicle,
                        driver_id:driver
                    };
                    console.log(newBooking);
    
    
                    //adding order
                    fetch('http://localhost:8080/addBooking',{
                        method:'POST',
                        headers:{'content-type': 'application/json'},
                        body: JSON.stringify(newBooking),
                    })
                    .then((response)=>{
                        alert("Booking Confirmed");
                        console.log(response);
                        response.json()
                    })
                    .then((json)=>{
                        console.log(json);
                    })

                    //update vehicle details
                    fetch('http://localhost:8080/updateVehicleAvalibility/'+vehicle+'/'+0,{
                        method:'PUT',
                        headers:{'content-type': 'application/json'},
                    })
                    .then((response)=>{
                        response.json()
                    })

                    //update driver details
                    fetch('http://localhost:8080/updateDriverAvalibility/'+driver+'/'+0,{
                        method:'PUT',
                        headers:{'content-type': 'application/json'},
                    })
                    .then((response)=>{
                        response.json()
                    })

                    navigate('/mybookings');
            }
        }
    }

    

  return (
    <div className='ordernow'>
        <h2>Book Now Page</h2>
       
        {error ?(
            <p id="errors">{error}</p>
        ) : (
            <></>
        )}
        
        <table>
            <td>
                <th>Pick up location</th>
                <select name="pickup" id="pickup" onChange={(e) => setPickup(e.target.value)}>
                    <option disabled selected>--------</option>
                    <option value="Galle">Galle</option>
                    <option value="Kandy">Kandy</option>
                    <option value="Nugegoda">Nugegoda</option>
                    <option value="Gampaha">Gampaha</option>
                    <option value="Kurunagala">Kurunagala</option>
                    <option value="Jaffna">Jaffna</option>
                </select>
            </td>

            <td>
                <th>Destination</th>
                <select name="destination" id="destination" onChange={(e) => setDestination(e.target.value)}>
                    <option disabled selected>--------</option>
                    <option value="Galle">Galle</option>
                    <option value="Kandy">Kandy</option>
                    <option value="Nugegoda">Nugegoda</option>
                    <option value="Gampaha">Gampaha</option>
                    <option value="Kurunagala">Kurunagala</option>
                    <option value="Jaffna">Jaffna</option>
                </select>
            </td>


            <td>
                <th>Vehicle</th>
                {vehiclelist ? (
                    <>
                        <select name="vehicle" id="vehicle" onChange={(e) => setVehicle(e.target.value)}>
                            <option disabled selected>--------</option>
                            {vehiclelist.map((d)=> 
                                <option value={d.id}>{d.number} - {d.type} - {d.brand} - {d.model}</option>  
                            )}
                        </select>
                    </>
                    ) : (
                        <>
                            <CircularUnderLoad/>
                        </>
                    )
                }                
            </td>

            <td>
                <th>Driver</th>
                {driverlist ? (
                    <>
                        <select name="drivers" id="drivers" onChange={(e) => setDriver(e.target.value)}>
                            <option disabled selected>--------</option>
                            {driverlist.map((p)=> 
                                <option value={p.id}>{p.driver_fname} {p.driver_lname}</option>  
                            )}
                        </select>
                    </>
                    ) : (
                        <>
                            <CircularUnderLoad/>
                        </>
                    )
                }     
            </td>


            <td>
                {vehiclelist && driverlist? (
                        <button onClick={handleClick}>Book Now</button>
                    ) : (
                        <></>
                    )
                }  
            </td>
        </table>
    </div>
  )
}

export default OrderNow