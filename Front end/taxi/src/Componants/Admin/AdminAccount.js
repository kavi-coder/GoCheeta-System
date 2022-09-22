import React, { useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import useFetch from '../includes/useFetch';
import { useState } from 'react';
import CircularUnderLoad from '../includes/CircularUnderLoad';

function AdminAccount() {
    const [name, setName] = useState();
    const [password, setPassword] = useState();

    const navigate = useNavigate(); 


    const admin=JSON.parse(localStorage.getItem('admin'));

    useEffect(()=>{
        if(!admin){
            navigate('/adminlogin');
        }
    },[admin])


    const {data: user}=useFetch('http://localhost:8080/getadmin/'+admin.admin_id);


    useEffect(()=>{
        if(user){
            setName(user.admin_name);
            setPassword(user.admin_password);
        }
    },[user])

    console.log(user)
    const handleClick=(e)=>{
        e.preventDefault();
        
        const updated_admin={
            admin_id: user.admin_id,
            admin_name: name,
            admin_email: user.admin_email,
            admin_password: password
        }
        console.log(updated_admin);

        setTimeout(()=>{
            fetch('http://localhost:8080/updateadmin',{
                method:'PUT',
                headers:{'content-type': 'application/json'},
                body: JSON.stringify(updated_admin),
            })
            .then((response)=>{
                alert("Updated");
                response.json();
                window.location.reload();
            })

            .then((json)=>{
                
            })
            
        },1000);
    }


    return (
        <div className="login">
            <h2>Account Details</h2>

            <form>
            {user ? (
                    <>
                        <h4>Admin Name</h4>
                        <input placeholder={user.admin_name} onChange={(e)=>{setName(e.target.value)}}></input>

                        <h4>Admin Email</h4>
                        <p>{user.admin_email}</p>

                        <h4>password</h4>
                        <input placeholder={user.admin_password} onChange={(e)=>{setPassword(e.target.value)}}></input>

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

export default AdminAccount