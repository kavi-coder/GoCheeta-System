import React, { useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import useFetch from '../includes/useFetch';
import { useState } from 'react';
import CircularUnderLoad from '../includes/CircularUnderLoad';



function Account() {
    const [fname, setFname] = useState();
    const [lname, setLname] = useState();
    const [password, setPassword] = useState();

    const navigate = useNavigate(); 


    const logged_user=JSON.parse(localStorage.getItem('logged_user'));

    useEffect(()=>{
        if(!logged_user){
            navigate('/');
        }
    },[logged_user])


    const {data: user}=useFetch('http://localhost:8080/getUser/'+logged_user.id);


    useEffect(()=>{
        if(user){
            setFname(user.cust_fname);
            setLname(user.cust_lname);
            setPassword(user.cust_password);
        }
    },[user])

    console.log(user)
    const handleClick=(e)=>{
        e.preventDefault();
        
        const updated_user={
            id: user.id,
            cust_fname: fname,
            cust_lname: lname,
            cust_email: user.cust_email,
            cust_password: password
        }
        console.log(updated_user);

        setTimeout(()=>{
            fetch('http://localhost:8080/update',{
                method:'PUT',
                headers:{'content-type': 'application/json'},
                body: JSON.stringify(updated_user),
            })
            .then((response)=>{
                alert("Updated");
                response.json();
                navigate('/');
            })

            .then((json)=>{
                
            })
            
        },1000);
    }




    const handleInput=(e)=>{
        e.preventDefault();
        const delete_user_id=e.target.value;
        console.log(delete_user_id);
        const answer=window.confirm("Are you sure?");
  
        if(answer){
            fetch('http://localhost:8080/delete/'+delete_user_id, 
            { 
              method: 'DELETE' 
            })
            .then((response)=>{
              // console.log(response);
                if(!response.ok){
                    // setUrl(null);
                    throw Error('data not found');
                }
                else{
                    return response.json();
                    // window.location.reload();
                }
            })
            .then((response)=>{
                console.log(response);
                                
            })
            .catch((err)=>{
                
            });

        localStorage.setItem('logged_user','');
        localStorage.clear();
        navigate('/');
        }
    }
    

    return (
        <div className="login">
            <h2>Account Details</h2>

            <form>
            {user ? (
                    <>
                        <h4>First Name</h4>
                        <input placeholder={user.cust_fname} onChange={(e)=>{setFname(e.target.value)}}></input>

                        <h4>Last Name</h4>
                        <input placeholder={user.cust_lname} onChange={(e)=>{setLname(e.target.value)}}></input>

                        <h4>Email</h4>
                        <p>{user.cust_email}</p>

                        <h4>password</h4>
                        <input placeholder={user.cust_password} onChange={(e)=>{setPassword(e.target.value)}}></input>

                        <button onClick={handleClick}>Update</button>

                        <button value={user.id}  onClick={(e)=>handleInput(e, "value")} >Delete</button>
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

export default Account