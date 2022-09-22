import React, { useEffect } from 'react';
import useFetch from '../includes/useFetch';
import { useState } from 'react';

function AdminVehiclesRow({id,number,type,brand,model,branch,avalibility}) {
    const {data: booked}=useFetch('http://localhost:8080/bookingVehicleSearch/'+id);

    const [avalible, setAvalible] = useState();

    useEffect(()=>{
        if(avalibility==1){
            setAvalible("Avalible");
        }
        else{
            setAvalible("Not Avalible");
        }
    },[avalibility])

    const handleInput=(e,id)=>{
        e.preventDefault();

        const answer=window.confirm("Are you sure?");
  
        if(answer){
            //checked that vehicle is already booked or not
           if(booked){
                alert("This Vehicle is already booked by Customer.");
           }
           else{
                fetch('http://localhost:8080/deleteVehicle/'+id, 
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

                window.location.reload();
           }
        }
    }


  return (
    <tr>
        <td>{id}</td>
        <td>{number}</td>
        <td>{branch}</td>
        <td>{type}</td>
        <td>{brand}</td>
        <td>{model}</td>
        <td>{avalible}</td>
        <td><button  onClick={(e)=>handleInput(e, id)} >Delete</button></td>
        
                               
    </tr>
  )
}

export default AdminVehiclesRow