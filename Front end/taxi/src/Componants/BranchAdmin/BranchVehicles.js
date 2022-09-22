import React, { useEffect } from 'react';
import useFetch from '../includes/useFetch';
import {useNavigate} from 'react-router-dom';
import CircularUnderLoad from '../includes/CircularUnderLoad';
import BranchVehicleRow from './BranchVehicleRow';
import { Link } from 'react-router-dom';

function BranchVehicles() {
  const navigate = useNavigate(); 

  const branchAdmin=JSON.parse(localStorage.getItem('branchAdmin'));

  useEffect(()=>{
      if(!branchAdmin){
          navigate('/branchadminlogin');
      }
  },[branchAdmin])
  
  const {data: branchVehicles}=useFetch('http://localhost:8080/branchVehicles/'+branchAdmin.branch_name);

  return (
    <div className='mybookings'>
        <p><Link to='/addbranchvehicle'>Add Vehicle</Link></p>
        {branchVehicles?(<p>Total Vehicles : {branchVehicles.length}</p>):(<></>)}
        
        
        <h2>Branch Vehicles</h2>
        
        <table id="customers">
            <tr>
                <th>Vehicle ID</th>
                <th>Vehicle Number</th>
                <th>Vehicle Type</th>
                <th>Vehicle Brand</th>
                <th>Vehicle Model</th>
                <th>Vehicle Avalibility</th>
                <th>Delete</th>
            </tr>

            {branchVehicles ? (
                branchVehicles.map((d)=> 
                    <>
                        <BranchVehicleRow {...d}/>
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

export default BranchVehicles