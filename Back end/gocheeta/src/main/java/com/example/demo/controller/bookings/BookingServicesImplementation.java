package com.example.demo.controller.bookings;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class BookingServicesImplementation implements BookingServices {
	@Autowired
	private Booking_Repository repo;
	
	@Override
	public String addBooking(Booking booking_data) {
		repo.save(booking_data);
		return "Booking Added";
	}

	@Override
	public List<Booking> findAllBookings() {
		return repo.findAll();
	}

	@Override
	public List<Booking> findBookings(int id) {
		List<Booking> all=repo.findAll();
		List<Booking> filter=new ArrayList<Booking>();
		
		for(Booking b:all) {
			if(id==b.getUser_id()) {
				filter.add(b);
			}
		}
		return filter;
	}

	@Override
	public String deleteBooking(int id) {
		List<Booking> all=repo.findAll();
		
		for(Booking b:all) {
			if(id==b.getId()) {
				repo.delete(b);
				return "Deleted";
			}
		}
		return "Booking Not Found";
	}

	@Override
	public List<Booking> findBranchBookings(String branch) {
		List<Booking> all=repo.findAll();
		List<Booking> filter=new ArrayList<Booking>();
		
		for(Booking b:all) {
			if(branch.equals(b.getPick_up())) {
				filter.add(b);
			}
		}
		return filter;
	}

	@Override
	public boolean bookingVehicleSearch(int vehicle_id) {
		List<Booking> all=repo.findAll();
		
		for(Booking b:all) {
			if(b.getVehicle_id()==vehicle_id) {
				return true;
			}
		}
		
		return false;
	}

	@Override
	public boolean bookingDriverSearch(int driver_id) {
		List<Booking> all=repo.findAll();
		
		for(Booking b:all) {
			if(b.getDriver_id()==driver_id) {
				return true;
			}
		}
		return false;
	}

	@Override
	public List<Booking> driverbookings(int driver_id) {
		List<Booking> all=repo.findAll();
		List<Booking> filter=new ArrayList<Booking>();
		
		for(Booking b:all) {
			if(b.getDriver_id()==driver_id) {
				filter.add(b);
			}
		}
		return filter;
	}

}
