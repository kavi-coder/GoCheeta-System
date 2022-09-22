import React, { useEffect } from 'react';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';

function Home() {
  const [branch, setBranch] = useState();
  const [error, setError] = useState();
  const navigate = useNavigate(); 

  const logged_user=JSON.parse(localStorage.getItem('logged_user'));
  const branchAdmin=JSON.parse(localStorage.getItem('branchAdmin'));
  const admin=JSON.parse(localStorage.getItem('admin'));

  console.log(logged_user);

  useEffect(()=>{
    if(branchAdmin){
      navigate('/branchAdmindashboard');
    }
    else if(admin){
      navigate('/admindashboard');
    }
    else{
      navigate('/');
    }
},[branchAdmin,admin])




  

  return (
    <div className='home'>

      <h1>Welcome to Go Cheeta Cab Service</h1>
      <h2>"ANYWHERE…I DON'T CARE. AS LONG AS IT'S NOT FAR."</h2>
      <h2>"LET'S GRAB A CAB. WE CAN'T WALK IN THIS."</h2>

    </div>
  )
}

export default Home