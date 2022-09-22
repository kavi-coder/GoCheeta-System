package com.example.demo.controller.vehicle;

import java.util.List;

public interface VehicleServices {

	List<Vehicle> avalibleVehicles(String branch);

	String updateVehicleAvalibility(int id, int avalibility);

	Vehicle getVehicle(int id);

	List<Vehicle> branchVehicles(String branch);

	String deleteVehicle(Integer id);

	String vehicleAdd(Vehicle vehicle_data);

	List<Vehicle> allvehicles();

}
