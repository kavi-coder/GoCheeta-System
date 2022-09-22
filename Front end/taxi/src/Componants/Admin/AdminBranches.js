import React, { useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import CircularUnderLoad from '../includes/CircularUnderLoad';
import {useState} from 'react'
import AdminVehiclesRow from './AdminVehiclesRow';
import { Link } from 'react-router-dom';
import AdminBranchesRow from './AdminBranchesRow';

function AdminBranches() {
    const navigate = useNavigate(); 

    const [admins,setAdmins] = useState();
    const [url,setUrl] = useState();
    const [branch, setBranch] = useState("");

    const admin=JSON.parse(localStorage.getItem('admin'));

    useEffect(()=>{
        if(!admin){
            navigate('/login');
        }
    },[admin])

    useEffect(()=>{
        if(branch==""){
            setUrl('http://localhost:8080/allbranchadmins');
        }
        else{
            setUrl('http://localhost:8080/branchadmins/'+branch);
        }
    },[branch])

    useEffect(()=>{
        setTimeout(()=>{
            fetch(url)
            .then((response)=>{
                if(!response.ok){
                throw Error('data not found');
                }
                else{
                return response.json();
                }
            })
            .then((data)=>{
                setAdmins(data);
            })
            .catch((err)=>console.log(err.message));
        },1000);

    },[url]);
    
  return (
    <div className='mybookings'>
            <h2>Branch Admin Details</h2>
            <p><Link to='/addbranchadmin'>Add Branch Admin</Link></p>

            <div>
                <select name="pickup" id="pickup" onChange={(e) => setBranch(e.target.value)}>
                    <option value="" selected>All Branches</option>
                    <option value="Galle">Galle</option>
                    <option value="Kandy">Kandy</option>
                    <option value="Nugegoda">Nugegoda</option>
                    <option value="Gampaha">Gampaha</option>
                    <option value="Kurunagala">Kurunagala</option>
                    <option value="Jaffna">Jaffna</option>
                </select>
            </div>
            
            <table id="customers">
                <tr>
                    <th>Admin ID</th>
                    <th>Admin Name</th>
                    <th>Admin Branch</th>
                    <th>Admin Email</th>
                    <th>Delete</th>
                </tr>

                {admins ? (
                    admins.map((d)=> 
                        <>
                            <AdminBranchesRow {...d}/>
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

export default AdminBranches