import React from 'react';
import useFetch from '../includes/useFetch';
import CircularUnderLoad from '../includes/CircularUnderLoad';

function AdminBranchesRow({branch_id,branch_admin_name,branch_name,branch_email}) {
    const {data: booked}=useFetch('http://localhost:8080/getBranchAdmin/'+branch_id);
    console.log(booked)


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
        <td>{branch_id}</td>
        <td>{branch_admin_name}</td>
        <td>{branch_name}</td>
        <td>{branch_email}</td>
        <td><button  onClick={(e)=>handleInput(e, branch_id)} >Delete</button></td>                    
    </tr>
  )
}

export default AdminBranchesRow