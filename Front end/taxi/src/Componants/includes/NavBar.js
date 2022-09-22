import { Link } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';

function NavBar() {
    const navigate = useNavigate(); 

    const logged_user=JSON.parse(localStorage.getItem('logged_user'));
    const branchAdmin=JSON.parse(localStorage.getItem('branchAdmin'));
    const admin=JSON.parse(localStorage.getItem('admin'));
    const driver=JSON.parse(localStorage.getItem('driver'));

    const handleClickUser=(e)=>{
        e.preventDefault();
        localStorage.setItem('logged_user','');
        localStorage.clear();
        navigate('/login');
    }

    const handleClickAdmin=(e)=>{
        e.preventDefault();
        localStorage.setItem('admin','');
        localStorage.clear();
        navigate('/adminlogin');
    }

    const handleClickBranchAdmin=(e)=>{
        e.preventDefault();
        localStorage.setItem('branchAdmin','');
        localStorage.clear();
        navigate('/branchadminlogin');
    }

    const handleClickDriver=(e)=>{
        e.preventDefault();
        localStorage.setItem('driver','');
        localStorage.clear();
        navigate('/driverlogin');
    }

    


  return (
    <div className='navbar'>
        {logged_user ? (
            <h1><Link to="/">GoCheeta</Link></h1>
        ) : (
            <>
                {admin ? (
                    <h1><Link to="/adminbookings">GoCheeta</Link></h1>
                ) : (
                    <h1><Link to="/">GoCheeta</Link></h1>
                )}
            </>
        )}
        


        <ul>
            {logged_user ? (
                <>
                    <li><p><Link to="/login" onClick={handleClickUser}>Logout</Link></p></li>
                    <li><p><Link to='/account'>Account</Link></p></li>
                    <li><p><Link to='/mybookings'>Bookings</Link></p></li>
                    <li><p><Link to='/booknow'>Book Now</Link></p></li>
                </>
            ):(
                <>
                    {branchAdmin ? (
                        <>
                            <li><p><Link to="/branchadminlogin" onClick={handleClickBranchAdmin}>Logout</Link></p></li>
                            <li><p><Link to='/branchsettings'>Settings</Link></p></li>
                            <li><p><Link to='/branchdrivers'>Drivers</Link></p></li>
                            <li><p><Link to='/branchvehicles'>Vehicles</Link></p></li>
                            <li><p><Link to='/branchBookings'>Bookings</Link></p></li>
                        </>
                    ):(
                        <>
                            {driver ? (
                                <>
                                <li><p><Link to="/driverlogin" onClick={handleClickDriver}>Logout</Link></p></li>
                                <li><p><Link to='/driveraccount'>Account</Link></p></li>
                                <li><p><Link to='/driverbookings'>Bookings</Link></p></li>
                            </>
                            ):(
                                <>
                                    {admin ? (
                                        <>
                                            <li><p><Link to="/adminlogin" onClick={handleClickAdmin}>Logout</Link></p></li>
                                            <li><p><Link to="/adminaccount">Account</Link></p></li>
                                            <li><p><Link to="/adminbranches">Branches</Link></p></li>
                                            <li><p><Link to="/admindrivers">Drivers</Link></p></li>
                                            <li><p><Link to="/adminvehicles">Vehicles</Link></p></li>
                                            <li><p><Link to="/adminbookings">Bookings</Link></p></li>
                                        </>                                        
                                    ):(
                                        <>
                                            <li><p><Link to="/login">User Login</Link></p></li>
                                            <li><p><Link to="/driverlogin">Driver Login</Link></p></li>
                                            <li><p><Link to="/branchadminlogin">Branch Admin Login</Link></p></li>
                                            <li><p><Link to="/adminlogin">Admin Login</Link></p></li>
                                        </>
                                    )}
                                </>
                            )}
                            


                        </>
                    )}
                </>
                
            )}
        </ul>
    </div>
  )
}

export default NavBar