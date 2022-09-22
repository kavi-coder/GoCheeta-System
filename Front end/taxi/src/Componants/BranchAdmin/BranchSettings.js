import React, { useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import useFetch from '../includes/useFetch';
import { useState } from 'react';
import CircularUnderLoad from '../includes/CircularUnderLoad';

function BranchSettings() {
  const admin=JSON.parse(localStorage.getItem('admin'));
    const branchAdmin=JSON.parse(localStorage.getItem('branchAdmin'));
    const logged_user=JSON.parse(localStorage.getItem('logged_user'));

    const [branchAdminName, setBranchAdminName] = useState();
    const [password, setPassword] = useState();

    const navigate = useNavigate(); 

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


    const {data: branch}=useFetch('http://localhost:8080/getBranchAdmin/'+branchAdmin.branch_id);

    useEffect(()=>{
      if(branch){
          setBranchAdminName(branch.branch_admin_name);
          setPassword(branch.branch_password);
      }
  },[branch])


    // console.log(branch)
    const handleClick=(e)=>{
        e.preventDefault();
        
        const updated_branch={
            branch_id: branch.branch_id,
            branch_admin_name: branchAdminName,
            branch_name: branch.branch_name,
            branch_email: branch.branch_email,
            branch_password: password
        }
        console.log(updated_branch);

        setTimeout(()=>{
            fetch('http://localhost:8080/updateBranch',{
                method:'PUT',
                headers:{'content-type': 'application/json'},
                body: JSON.stringify(updated_branch),
            })
            .then((response)=>{
                alert("Updated");
                response.json();
                navigate('/branchBookings');
            })

            .then((json)=>{
                
            })
            
        },1000);
    }




    
  return (
    <div className="login">
            <h2>Account Details</h2>

            <form>
            {branch ? (
                    <>
                        <h4>Branch Admin Name</h4>
                        <input placeholder={branch.branch_admin_name} onChange={(e)=>{setBranchAdminName(e.target.value)}}></input>

                        <h4>Branch Name</h4>
                        <p>{branch.branch_name}</p>

                        <h4>Email</h4>
                        <p>{branch.branch_email}</p>

                        <h4>password</h4>
                        <input placeholder={branch.branch_password} onChange={(e)=>{setPassword(e.target.value)}}></input>

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

export default BranchSettings