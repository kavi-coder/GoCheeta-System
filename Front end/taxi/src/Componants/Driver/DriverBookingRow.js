import React from 'react';
import useFetch from '../includes/useFetch';
import CircularUnderLoad from '../includes/CircularUnderLoad';

function DriverBookingRow({id,user_id,pick_up,destination,vehicle_id}) {
    const driver=JSON.parse(localStorage.getItem('driver'));

    const {data: vehicle}=useFetch('http://localhost:8080/getVehicle/'+vehicle_id);
    const {data: user}=useFetch('http://localhost:8080/getUser/'+user_id);

    const handleInput=(e,id,vehicle_id)=>{
        e.preventDefault();
        const delete_user_id=id;
        const delete_vehicle_id=vehicle_id;
        const delete_driver_id=driver.id;

        const answer=window.confirm("Are you sure?");
  
        if(answer){
            fetch('http://localhost:8080/deleteBooking/'+delete_user_id, 
            { 
              method: 'DELETE' 
            })
            .then((response)=>{
                if(!response.ok){
                    throw Error('data not found');
                }
                else{
                    return response.json();
                }
            })
            .then((response)=>{
                console.log(response);
                                
            })
            .catch((err)=>{
                
            });

            //update vehicle details
            fetch('http://localhost:8080/updateVehicleAvalibility/'+delete_vehicle_id+'/'+1,{
                method:'PUT',
                headers:{'content-type': 'application/json'},
            })
            .then((response)=>{
                response.json()
            })

            //update driver details
            fetch('http://localhost:8080/updateDriverAvalibility/'+delete_driver_id+'/'+1,{
                method:'PUT',
                headers:{'content-type': 'application/json'},
            })
            .then((response)=>{
                response.json()
            })

            window.location.reload();
        }
    }

  return (
    <tr>
        <td>{id}</td>
        <td>{user?(<p>{user.cust_fname} {user.cust_lname}</p>):(<CircularUnderLoad/>)}</td>
        <td>{pick_up}</td>
        <td>{destination}</td>
        <td>{vehicle?(<p>{vehicle.brand} {vehicle.model}</p>):(<CircularUnderLoad/>)}</td>
        <td>{vehicle?(<p>{vehicle.type}</p>):(<CircularUnderLoad/>)}</td>
        <td>{vehicle?(<p>{vehicle.number}</p>):(<CircularUnderLoad/>)}</td>
        <td><button  onClick={(e)=>handleInput(e, id, vehicle_id)} >Delete</button></td>                       
    </tr>
  )
}

export default DriverBookingRow