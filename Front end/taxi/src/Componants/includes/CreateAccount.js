import React, { useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import { useState } from 'react';

function CreateAccount() {
  const [fname, setFname] = useState();
  const [lname, setLname] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const [user, setUser] = useState();

  const navigate = useNavigate(); 


    const logged_user=JSON.parse(localStorage.getItem('logged_user'));

    useEffect(()=>{
        if(logged_user){
            navigate('/');
        }
    },[logged_user])



    const handleClick=(e)=>{
      e.preventDefault();

      if(!fname || !lname || !email || !password){
        setError("All inputs are Required");
      }
      
      else{
        setError();
        fetch('http://localhost:8080/checkemail/'+email)
        .then((response)=>{
            if(!response.ok){
              throw Error('data not found');
            }
            else{
              return response.json();
            }
        })
        .then((data)=>{
            setUser(data);
        })

        console.log("user innawada -> "+user);

        if(user){
            setError("Use another Email");
        }
        else{
          setError();
          const newUser={
            cust_fname: fname,
            cust_lname: lname,
            cust_email: email,
            cust_password: password
          };  

          fetch('http://localhost:8080/customerAdd',{
              method:'POST',
              headers:{'content-type': 'application/json'},
              body: JSON.stringify(newUser),
          })
          .then((response)=>{
              console.log(response);
              response.json()
          })
          .then((json)=>{

              setTimeout(()=>{
                fetch("http://localhost:8080/login/"+email+"/"+password)
                .then((response)=>{
                    if(!response.ok){
                        setError("Invalid email or password");
                        // setUrl(null);
                        throw Error('data not found');
                    }
                    else{
                        return response.json();
                    }
                })
                .then((user)=>{
                    console.log(user);
                    localStorage.setItem('logged_user',JSON.stringify(user));
                    navigate('/');                   
                })
                .catch((err)=>{
                    
                });
                  
              },1000);
          })
        }
      }
   
    }




  return (
    <div className='createacc'>
      <h2>CreateAccount</h2>

      {error ?(
          <p id="errors">{error}</p>
      ) : (
          <></>
      )}

      <form>
        <h4>First Name</h4>
        <input placeholder="Enter First Name" onChange={(e)=>{setFname(e.target.value)}}></input>

        <h4>Last Name</h4>
        <input placeholder="Enter Last Name" onChange={(e)=>{setLname(e.target.value)}}></input>

        <h4>Email</h4>
        <input placeholder="Enter Email" onChange={(e)=>{setEmail(e.target.value)}}></input>

        <h4>password</h4>
        <input placeholder="Enter Password" onChange={(e)=>{setPassword(e.target.value)}}></input>
        <br></br>

        <button onClick={handleClick}>Create Account</button>
      </form>

    </div>
  )
}

export default CreateAccount