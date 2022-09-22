import React, { useEffect } from 'react';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';

function BranchbranchAdminLogin() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();
    const navigate = useNavigate(); 
    const [url, setUrl] = useState();

    const branchAdmin=JSON.parse(localStorage.getItem('branchAdmin'));

    useEffect(()=>{
        if(branchAdmin){
            navigate('/branchBookings');
        }
    },[branchAdmin])


    useEffect(()=>{
        setUrl("http://localhost:8080/branchadminlogin/"+email+"/"+password);
    },[email,password])

    const handleClick=(e)=>{
        e.preventDefault();
        if(!email || !password){
            setError("All inputs are Required");
        }
        else{
            setError();
            console.log(url);
            setTimeout(()=>{
                fetch(url)
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
                    localStorage.setItem('branchAdmin',JSON.stringify(user));
                    navigate('/branchBookings');                   
                })
                .catch((err)=>{
                    
                });
                
            },1000);
        }
    }



  return (
    <div className="login">
        <form>
            <h1> Branch Admin Login</h1>

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

export default BranchbranchAdminLogin