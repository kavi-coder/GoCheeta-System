import React, { useEffect } from 'react';
import { useState } from 'react';
import useFetch from '../includes/useFetch';
import {useNavigate} from 'react-router-dom';
import CircularUnderLoad from '../includes/CircularUnderLoad';
import BranchVehicleRow from './BranchVehicleRow';
import { Link } from 'react-router-dom';

function BranchVehicleAdd() {
    const admin=JSON.parse(localStorage.getItem('admin'));
    const branchAdmin=JSON.parse(localStorage.getItem('branchAdmin'));
    const logged_user=JSON.parse(localStorage.getItem('logged_user'));

    const navigate = useNavigate(); 

    const [number, setNumber] = useState();
    const [type, setType] = useState();
    const [brand, setBrand] = useState();
    const [model, setModel] = useState();
    const [branch, setBranch] = useState();

    const [error, setError] = useState();

    useEffect(()=>{
        if(logged_user){
            navigate('/mybookings');
        }
        else if(!branchAdmin && !admin){
            if(!branchAdmin){
                navigate('/branchadminlogin');
            }
            else{
                navigate('/adminlogin');
            }
            
        }
    },[branchAdmin,admin,logged_user])

    useEffect(()=>{
        if(branchAdmin){
            setBranch(branchAdmin.branch_name)
        }
    },[branchAdmin])

    // console.log(branch)
    const handleClick=(e)=>{
        e.preventDefault();
  
        if(!number || !type || !brand || !model || !branch){
          setError("All inputs are Required");
          console.log(branch)
        }
        
        else{
            setError();
            console.log(branch);
                
            const newVehicle={
                number: number,
                type: type,
                brand: brand,
                model: model,
                branch:branch,
                avalibility:1
            };  

            fetch('http://localhost:8080/vehicleAdd',{
                method:'POST',
                headers:{'content-type': 'application/json'},
                body: JSON.stringify(newVehicle),
            })
            .then((response)=>{
                console.log(response);
                response.json()
            })
            .then((json)=>{

                if(admin){
                    navigate('/adminvehicles'); 
                }
                else{
                    navigate('/branchvehicles');  
                }
                                 
            })
        }
     
      }



    return (
        <div className='createacc'>
            <h2>Add Vehicle</h2>

            {error ?(
                <p id="errors">{error}</p>
            ) : (
                <></>
            )}

            <form>
                {!branchAdmin?(
                    <>
                        <h4>Vehicle Branch</h4>
                        <select name="destination" id="destination" onChange={(e) => setBranch(e.target.value)}>
                            <option disabled selected>--------</option>
                            <option value="Galle">Galle</option>
                            <option value="Kandy">Kandy</option>
                            <option value="Nugegoda">Nugegoda</option>
                            <option value="Gampaha">Gampaha</option>
                            <option value="Kurunagala">Kurunagala</option>
                            <option value="Jaffna">Jaffna</option>
                        </select>
                    </>
                ):(<></>)}
                

                <h4>Vehicle Number</h4>
                <input placeholder="Enter Vehicle Number" onChange={(e)=>{setNumber(e.target.value)}}></input>

                <h4>Vehicle Type</h4>
                <input placeholder="Enter Vehicle Type" onChange={(e)=>{setType(e.target.value)}}></input>

                <h4>Vehicle Brand</h4>
                <input placeholder="Enter Vehicle Brand" onChange={(e)=>{setBrand(e.target.value)}}></input>

                <h4>Vehicle Model</h4>
                <input placeholder="Enter Vehicle Model" onChange={(e)=>{setModel(e.target.value)}}></input>

                <br></br>

                <button onClick={handleClick}>Add Vehicle</button>
            </form>

        </div>
    )
}

export default BranchVehicleAdd