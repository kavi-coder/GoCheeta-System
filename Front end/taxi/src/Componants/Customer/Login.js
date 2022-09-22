import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';


function Login() {
    
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();
    const navigate = useNavigate(); 
    const [url, setUrl] = useState();

    const logged_user=JSON.parse(localStorage.getItem('logged_user'));

    useEffect(()=>{
        if(logged_user){
            navigate('/');
        }
    },[logged_user])

    useEffect(()=>{
        setUrl("http://localhost:8080/login/"+email+"/"+password);
    },[email,password])
    

    const handleClick=(e)=>{
        e.preventDefault();
        if(!email || !password){
            setError("All inputs are Required");
        }
        else{
            setError();
            // setUrl("http://localhost:8080/login/"+email+"/"+password);
            // console.log(url);
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
                    // console.log(user);
                    localStorage.clear();
                    localStorage.setItem('logged_user',JSON.stringify(user));
                    navigate('/');                   
                })
                .catch((err)=>{
                    
                });
                
            },1000);
        }
    }

    return ( 
        <div className="login">
            <form>
                <h1>Login</h1>

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

                <p>Didn't have an account? <Link to="/createAcc">Create Account</Link></p>
                
            </form>
        </div>
    )
}

export default Login;