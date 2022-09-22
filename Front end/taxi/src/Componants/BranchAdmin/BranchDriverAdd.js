import React, { useEffect } from 'react';
import { useState } from 'react';
import useFetch from '../includes/useFetch';
import {useNavigate} from 'react-router-dom';
import CircularUnderLoad from '../includes/CircularUnderLoad';
import BranchDriverRow from './BranchDriverRow';
import { Link } from 'react-router-dom';

function BranchDriverAdd() {
    const admin=JSON.parse(localStorage.getItem('admin'));
    const branchAdmin=JSON.parse(localStorage.getItem('branchAdmin'));
    const logged_user=JSON.parse(localStorage.getItem('logged_user'));

    const navigate = useNavigate(); 

    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
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
  
        if(!firstName || !lastName || !email || !password || !branch){
          setError("All inputs are Required");
          console.log(branch)
        }
        
        else{
            setError();
            console.log(branch);
                
            const newDriver={
                driver_fname: firstName,
                driver_lname: lastName,
                driver_email: email,
                driver_password: password,
                driver_branch:branch,
                driver_avalibility:1
            };  

            fetch('http://localhost:8080/driverAdd',{
                method:'POST',
                headers:{'content-type': 'application/json'},
                body: JSON.stringify(newDriver),
            })
            .then((response)=>{
                console.log(response);
                response.json()
            })
            .then((json)=>{
                if(admin){
                    navigate('/admindrivers'); 
                }
                else{
                    navigate('/branchDrivers');  
                }
                                   
            })
        }
     
      }



    return (
        <div className='createacc'>
            <h2>Add Driver</h2>

            {error ?(
                <p id="errors">{error}</p>
            ) : (
                <></>
            )}

            <form>
                {!branchAdmin?(
                    <>
                        <h4>Driver Branch</h4>
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
                

                <h4>Driver First Name</h4>
                <input placeholder="Enter Driver First Name" onChange={(e)=>{setFirstName(e.target.value)}}></input>

                <h4>Driver LastName</h4>
                <input placeholder="Enter Driver LastName" onChange={(e)=>{setLastName(e.target.value)}}></input>

                <h4>Driver Email</h4>
                <input placeholder="Enter Driver Email" onChange={(e)=>{setEmail(e.target.value)}}></input>

                <h4>Driver Password</h4>
                <input placeholder="Enter Driver Password" onChange={(e)=>{setPassword(e.target.value)}}></input>

                <br></br>

                <button onClick={handleClick}>Add Driver</button>
            </form>

        </div>
    )
}

export default BranchDriverAdd