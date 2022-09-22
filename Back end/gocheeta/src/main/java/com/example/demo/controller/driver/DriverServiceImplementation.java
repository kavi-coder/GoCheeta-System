package com.example.demo.controller.driver;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DriverServiceImplementation implements DriverService {
	
	@Autowired
	private Driver_Repository repo;

	@Override
	public List<Driver> avalibleVehicles(String branch) {
		List<Driver> all=repo.findAll();
		List<Driver> filter=new ArrayList<Driver>();
		
		for(int i=0;i<all.size();i++) {
			if(all.get(i).getDriver_avalibility()==1 && all.get(i).getDriver_branch().equalsIgnoreCase(branch)) {
				filter.add(all.get(i));
			}
		}
		
		if(filter.size()==0) {
			return null;
		}
		
		return filter;
	}

	//get vehicle details
	@Override
	public Driver getDriver(int id) {
		List<Driver> all=repo.findAll();
		
		for(int i=0;i<all.size();i++) {
			if(id==all.get(i).getId()) {
				return all.get(i);
			}
		}
		return null;
	}
	
	@Override
	public String updateDriverAvalibility(int id, int avalibility) {
		Driver vehicle=getDriver(id);
		
		if(vehicle != null) {
			vehicle.setDriver_avalibility(avalibility);
			repo.save(vehicle);
			return "Vehicle Detail Updated";
		}
		else {
			return "Vehicle Not Found";
		}
	}

	@Override
	public List<Driver> branchDrivers(String branch) {
		List<Driver> all=repo.findAll();
		List<Driver> filter=new ArrayList<Driver>();
		
		for(int i=0;i<all.size();i++) {
			if(all.get(i).getDriver_branch().equalsIgnoreCase(branch)) {
				filter.add(all.get(i));
			}
		}
		
		return filter;
	}

	@Override
	public String deleteDriver(Integer id) {
		List<Driver> all=repo.findAll();
		
		for(Driver b:all) {
			if(id==b.getId()) {
				repo.delete(b);
				return "Deleted";
			}
		}
		return "Driver Not Found";
	}

	@Override
	public String driverAdd(Driver driver_data) {
		List<Driver> all=repo.findAll();
		
		for(int i=0;i<all.size();i++) {
			if(all.get(i).getDriver_email().equalsIgnoreCase(driver_data.getDriver_email())) {
				return "Use Another Email";
			}
		}
		repo.save(driver_data);
		return "Driver Added";
	}

	@Override
	public Driver driverlogin(String email, String password) {
		List<Driver> all=repo.findAll();
		
		for(Driver b:all) {
			if(email.equalsIgnoreCase(b.getDriver_email()) && password.equals(b.getDriver_password())) {
				return b;
			}
		}
		return null;
	}

	@Override
	public List<Driver> alldrivers() {
		return repo.findAll();
	}

	@Override
	public String updateDriver(Driver driverData) {
		List<Driver> all=repo.findAll();
		
		for(Driver b:all) {
			if(driverData.getId()==b.getId()) {
				repo.save(driverData);
				return "Updated";
			}
		}
		return "User Not Found";
	}


}
