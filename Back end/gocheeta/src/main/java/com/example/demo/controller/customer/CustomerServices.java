package com.example.demo.controller.customer;

import java.util.List;

public interface CustomerServices {

	String addCustomer(Customer customer_data);

	Customer login(String email, String password);

	String updateUser(Customer userData);

	String delete(Integer id);

	List<Customer> findAllCustomers();

	Customer getUser(int id);

	Customer checkemail(String email);

}
