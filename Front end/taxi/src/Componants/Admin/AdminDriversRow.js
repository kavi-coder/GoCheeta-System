import useFetch from '../includes/useFetch';
import CircularUnderLoad from '../includes/CircularUnderLoad';
import React, { useEffect } from 'react';
import {useState} from 'react';

function AdminDriversRow({id,driver_fname,driver_lname,driver_email,driver_avalibility,driver_branch}) {
    const {data: booked}=useFetch('http://localhost:8080/bookingDriverSearch/'+id);
    console.log(booked)

    const [avalible, setAvalible] = useState();

    useEffect(()=>{
        if(driver_avalibility==1){
            setAvalible("Avalible");
        }
        else{
            setAvalible("Not Avalible");
        }
    },[driver_avalibility])

    const handleInput=(e,id)=>{
        e.preventDefault();

        const answer=window.confirm("Are you sure?");
  
        if(answer){
            //checked that driver is avalible or not
           if(booked){
                alert("This Driver is already booked by Customer.");
           }
           else{
                fetch('http://localhost:8080/deleteDriver/'+id, 
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
        <td>{driver_fname}</td>
        <td>{driver_lname}</td>
        <td>{driver_email}</td>
        <td>{avalible}</td>
        <td><button  onClick={(e)=>handleInput(e, id)} >Delete</button></td>                    
    </tr>
  )
}

export default AdminDriversRow