import React, { useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import useFetch from '../includes/useFetch';
import { useState } from 'react';
import CircularUnderLoad from '../includes/CircularUnderLoad';

function DriverAccount() {
    const [fname, setFname] = useState();
    const [lname, setLname] = useState();
    const [password, setPassword] = useState();

    const navigate = useNavigate(); 


    const driver=JSON.parse(localStorage.getItem('driver'));

    useEffect(()=>{
        if(!driver){
            navigate('/');
        }
    },[driver])

    const {data: user}=useFetch('http://localhost:8080/getDriver/'+driver.id);

    useEffect(()=>{
        if(user){
            setFname(user.driver_fname);
            setLname(user.driver_lname);
            setPassword(user.driver_password);
        }
    },[user])

    console.log(user)
    const handleClick=(e)=>{
        e.preventDefault();
        
        const updated_user={
            id: user.id,
            driver_fname: fname,
            driver_lname: lname,
            driver_email: user.driver_email,
            driver_branch: user.driver_branch,
            driver_avalibility: user.driver_avalibility,
            driver_password: password
        }
        console.log(updated_user);

        setTimeout(()=>{
            fetch('http://localhost:8080/updatedriver',{
                method:'PUT',
                headers:{'content-type': 'application/json'},
                body: JSON.stringify(updated_user),
            })
            .then((response)=>{
                alert("Updated");
                response.json();
                navigate('/driverbookings');
            })

            .then((json)=>{
                
            })
            
        },1000);
    }



  return (
    <div className="login">
            <h2>Driver Details</h2>

            <form>
            {user ? (
                    <>
                        <h4>First Name</h4>
                        <input placeholder={user.driver_fname} onChange={(e)=>{setFname(e.target.value)}}></input>

                        <h4>Last Name</h4>
                        <input placeholder={user.driver_lname} onChange={(e)=>{setLname(e.target.value)}}></input>

                        <h4>Email</h4>
                        <p>{user.driver_email}</p>

                        <h4>Branch</h4>
                        <p>{user.driver_branch}</p>

                        <h4>password</h4>
                        <input placeholder={user.driver_password} onChange={(e)=>{setPassword(e.target.value)}}></input>

                        <button onClick={handleClick}>Update</button>
                    </>
                ) : (
                    <>
                        <CircularUnderLoad/>
                    </>
                )
            }
            </form>

        </div>
  )
}

export default DriverAccount