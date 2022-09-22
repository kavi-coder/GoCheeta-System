import React, { useEffect } from 'react';
import useFetch from '../includes/useFetch';
import {useNavigate} from 'react-router-dom';
import CircularUnderLoad from '../includes/CircularUnderLoad';
import BranchDriverRow from './BranchDriverRow';
import { Link } from 'react-router-dom';


function BranchDrivers() {
  const navigate = useNavigate(); 

  const branchAdmin=JSON.parse(localStorage.getItem('branchAdmin'));

  useEffect(()=>{
      if(!branchAdmin){
          navigate('/branchadminlogin');
      }
  },[branchAdmin])
  
  const {data: branchDrivers}=useFetch('http://localhost:8080/branchDrivers/'+branchAdmin.branch_name);

  return (
    <div className='mybookings'>
        <p><Link to='/addbranchdriver'>Add Driver</Link></p>
        {branchDrivers?(<p>Total Drivers : {branchDrivers.length}</p>):(<></>)}
        
        
        <h2>Branch Drivers</h2>
        
        <table id="customers">
            <tr>
                <th>Driver ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Driver Avalibility</th>
                <th>Delete</th>
            </tr>

            {branchDrivers ? (
                branchDrivers.map((d)=> 
                    <>
                        <BranchDriverRow {...d}/>
                    </>
                )
                ) : (
                    <>
                        <CircularUnderLoad/>
                    </>
                )
            }
            
        </table>
    </div>
  )
}

export default BranchDrivers