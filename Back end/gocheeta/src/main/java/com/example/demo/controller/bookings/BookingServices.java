package com.example.demo.controller.bookings;

import java.util.List;


public interface BookingServices {

	String addBooking(Booking booking_data);

	List<Booking> findAllBookings();

	List<Booking> findBookings(int id);

	String deleteBooking(int id);

	List<Booking> findBranchBookings(String branch);

	boolean bookingVehicleSearch(int vehicle_id);

	boolean bookingDriverSearch(int driver_id);

	List<Booking> driverbookings(int driver_id);

}
