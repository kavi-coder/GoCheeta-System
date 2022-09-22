import React, { useEffect } from 'react';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';

function DriverLogin() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();
    const navigate = useNavigate(); 
    const [url, setUrl] = useState();

    const admin=JSON.parse(localStorage.getItem('admin'));

    useEffect(()=>{
        if(admin){
            navigate('/admindashboard');
        }
    },[admin])


    useEffect(()=>{
        setUrl("http://localhost:8080/driverlogin/"+email+"/"+password);
    },[email,password])

    const handleClick=(e)=>{
        e.preventDefault();
        if(!email || !password){
            setError("All inputs are Required");
        }
        else{
            setError();
            // setUrl("http://localhost:8080/admin/login/"+email+"/"+password);
            // console.log(url);
            setTimeout(()=>{
                fetch("http://localhost:8080/driverlogin/"+email+"/"+password)
                .then((response)=>{
                    if(!response.ok){
                        setError("Invalid email or password");
                        setUrl(null);
                        throw Error('data not found');
                    }
                    else{
                        return response.json();
                    }
                })
                .then((user)=>{
                    console.log(user);
                    localStorage.clear();
                    localStorage.setItem('driver',JSON.stringify(user));
                    navigate('/driverbookings');                   
                })
                .catch((err)=>{
                    
                });
                
            },1000);
        }
    }



  return (
    <div className="login">
        <form>
            <h1>Driver Login</h1>

            {error ?(
                <p id="errors">{error}</p>
            ) : (
                <></>
            )}

            <label>Email</label>     
            <input type="text" placeholder='Enter Email' onChange={(e)=>{setEmail(e.target.value)}}></input>  

            <label>Password</label>     
            <input type="text" placeholder='Enter Password' onChange={(e)=>{setPassword(e.target.value)}}></input>  

            <button onClick={handleClick}>Login</button>    

            
        </form>
    </div>
  )
}

export default DriverLogin