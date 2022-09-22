import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
// import './App.css';
import './css/style.css'
import Home from './Componants/includes/Home';
import NavBar from './Componants/includes/NavBar';
import AdminLogin from './Componants/Admin/AdminLogin';
import BranchAdminLogin from './Componants/BranchAdmin/BranchAdminLogin';
import CreateAccount from './Componants/includes/CreateAccount';
import Login from './Componants/Customer/Login';
import Dashboard from './Componants/includes/Dashboard';
import Account from './Componants/Customer/Account';
import MyOrders from './Componants/Customer/MyOrders';
import OrderNow from './Componants/Customer/OrderNow';
import BranchBookings from './Componants/BranchAdmin/BranchBookings';
import BranchSettings from './Componants/BranchAdmin/BranchSettings';
import BranchDrivers from './Componants/BranchAdmin/BranchDrivers';
import BranchVehicles from './Componants/BranchAdmin/BranchVehicles';
import BranchVehicleAdd from './Componants/BranchAdmin/BranchVehicleAdd';
import BranchDriverAdd from './Componants/BranchAdmin/BranchDriverAdd';
import DriverLogin from './Componants/Driver/DriverLogin';
import DriverBookings from './Componants/Driver/DriverBookings';
import AdminBookings from './Componants/Admin/AdminBookings';
import AdminVehicles from './Componants/Admin/AdminVehicles';
import AdminDrivers from './Componants/Admin/AdminDrivers';
import AdminBranches from './Componants/Admin/AdminBranches';
import AdminBranchAdminAdd from './Componants/Admin/AdminBranchAdminAdd';
import AdminAccount from './Componants/Admin/AdminAccount';
import DriverAccount from './Componants/Driver/DriverAccount';

function App() {
  return (
    <div className="App">
    <Router>
      <NavBar/>
          <Routes>
            <Route exact path="/" caseSensitive={false} element={<Home/>} />
            <Route path="/createAcc" caseSensitive={false} element={<CreateAccount/>} />

            <Route path="/login" caseSensitive={false} element={<Login/>} />
            <Route path="/driverlogin" caseSensitive={false} element={<DriverLogin/>} />
            <Route path="/adminlogin" caseSensitive={false} element={<AdminLogin/>} />
            <Route path="/branchadminlogin" caseSensitive={false} element={<BranchAdminLogin/>} />            

            <Route path="/dashboard/:choosen_branch" caseSensitive={false} element={<Dashboard/>} />
            <Route path="/account" caseSensitive={false} element={<Account/>} />
            <Route path="/mybookings" caseSensitive={false} element={<MyOrders/>} />
            <Route path="/booknow" caseSensitive={false} element={<OrderNow/>} />

            <Route path="/branchBookings" caseSensitive={false} element={<BranchBookings/>} />
            <Route path="/branchsettings" caseSensitive={false} element={<BranchSettings/>} />
            <Route path="/branchdrivers" caseSensitive={false} element={<BranchDrivers/>} />
            <Route path="/branchvehicles" caseSensitive={false} element={<BranchVehicles/>} />
            <Route path="/addbranchvehicle" caseSensitive={false} element={<BranchVehicleAdd/>} />
            <Route path="/addbranchdriver" caseSensitive={false} element={<BranchDriverAdd/>} />

            <Route path="/driverbookings" caseSensitive={false} element={<DriverBookings/>} />
            <Route path="/driveraccount" caseSensitive={false} element={<DriverAccount/>} />

            <Route path="/adminbookings" caseSensitive={false} element={<AdminBookings/>} />
            <Route path="/adminvehicles" caseSensitive={false} element={<AdminVehicles/>} />
            <Route path="/admindrivers" caseSensitive={false} element={<AdminDrivers/>} />
            <Route path="/adminbranches" caseSensitive={false} element={<AdminBranches/>} />
            <Route path="/addbranchadmin" caseSensitive={false} element={<AdminBranchAdminAdd/>} />
            <Route path="/adminaccount" caseSensitive={false} element={<AdminAccount/>} />
        </Routes>
    </Router>
    
  </div>
  );
}

export default App;
