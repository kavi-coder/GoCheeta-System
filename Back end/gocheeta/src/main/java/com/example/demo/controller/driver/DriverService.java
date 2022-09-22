package com.example.demo.controller.driver;

import java.util.List;


public interface DriverService{

	List<Driver> avalibleVehicles(String branch);

	String updateDriverAvalibility(int id, int avalibility);

	Driver getDriver(int id);

	List<Driver> branchDrivers(String branch);

	String deleteDriver(Integer id);

	String driverAdd(Driver driver_data);

	Driver driverlogin(String email, String password);

	List<Driver> alldrivers();

	String updateDriver(Driver driverData);

}
