import React, { useEffect } from 'react';
import { useState } from 'react';
import useFetch from '../includes/useFetch';
import {useNavigate} from 'react-router-dom';

function AdminBranchAdminAdd() {
    const admin=JSON.parse(localStorage.getItem('admin'));

    const navigate = useNavigate(); 

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [branch, setBranch] = useState();

    const [error, setError] = useState();

    useEffect(()=>{
        if(!admin){
            navigate('/adminlogin');
        }
    },[admin])
    
    const handleClick=(e)=>{
        e.preventDefault();
  
        if(!name || !email || !branch || !password || !branch){
          setError("All inputs are Required");
          console.log(branch)
        }        
        else{
            setError();
            console.log(branch);
                
            const newBranchAdmin={
                branch_admin_name: name,
                branch_email: email,
                branch_name: branch,
                branch_password: password
            };  

            fetch('http://localhost:8080/addbranchadmin',{
                method:'POST',
                headers:{'content-type': 'application/json'},
                body: JSON.stringify(newBranchAdmin),
            })
            .then((response)=>{
                console.log(response);
                response.json()
            })
            .then((json)=>{
                navigate('/adminbranches');            
            })
        }
     
      }



    return (
        <div className='createacc'>
            <h2>Add Branch Admin</h2>

            {error ?(
                <p id="errors">{error}</p>
            ) : (
                <></>
            )}

            <form>
                <h4>Admin Branch</h4>
                <select name="destination" id="destination" onChange={(e) => setBranch(e.target.value)}>
                    <option disabled selected>--------</option>
                    <option value="Galle">Galle</option>
                    <option value="Kandy">Kandy</option>
                    <option value="Nugegoda">Nugegoda</option>
                    <option value="Gampaha">Gampaha</option>
                    <option value="Kurunagala">Kurunagala</option>
                    <option value="Jaffna">Jaffna</option>
                </select>
                

                <h4>Admin Name</h4>
                <input placeholder="Enter Admin Name" onChange={(e)=>{setName(e.target.value)}}></input>

                <h4>Admin Email</h4>
                <input placeholder="EnterAdmin Email" onChange={(e)=>{setEmail(e.target.value)}}></input>

                <h4>Admin Password</h4>
                <input placeholder="Enter Admin Password" onChange={(e)=>{setPassword(e.target.value)}}></input>

                <br></br>

                <button onClick={handleClick}>Add Admin</button>
            </form>

        </div>
    )
}

export default AdminBranchAdminAdd