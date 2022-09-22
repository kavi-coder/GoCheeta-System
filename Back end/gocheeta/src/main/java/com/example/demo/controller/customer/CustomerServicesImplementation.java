package com.example.demo.controller.customer;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomerServicesImplementation implements CustomerServices{
	
	@Autowired
	private Customer_Repository repo;

	@Override
	public List<Customer> findAllCustomers() {
		return repo.findAll();
	}

	@Override
	public String addCustomer(Customer customer_data) {
		List<Customer> all=repo.findAll();
		
		for(int i=0;i<all.size();i++) {
			if(all.get(i).getCust_email().equalsIgnoreCase(customer_data.getCust_email())) {
				return "Use Another Email";
			}
		}
		repo.save(customer_data);
		return "Customer Added";
	}

	@Override
	public Customer login(String email, String password) {
		List<Customer> all=repo.findAll();
		
		for(int i=0;i<all.size();i++) {
			if(all.get(i).getCust_email().equalsIgnoreCase(email) && all.get(i).getCust_password().equals(password)) {
				return all.get(i);
			}
		}
		return null;
	}

	@Override
	public String updateUser(Customer userData) {
		List<Customer> all=repo.findAll();
		
		for(int i=0;i<all.size();i++) {
			if(userData.getId()==all.get(i).getId()) {
				repo.save(userData);
				return "Updated";
			}
		}
		return "User Not Found";
	}

	@Override
	public String delete(Integer id) {
		List<Customer> all=repo.findAll();
		
		for(int i=0;i<all.size();i++) {
			if(id==all.get(i).getId()) {
				repo.delete(all.get(i));
				return "Deleted";
			}
		}
		return "User Not Found";
	}

	@Override
	public Customer getUser(int id) {
		List<Customer> all=repo.findAll();
		
		for(int i=0;i<all.size();i++) {
			if(all.get(i).getId()==id) {
				return all.get(i);
			}
		}
		return null;
	}

	@Override
	public Customer checkemail(String email) {
		List<Customer> all=repo.findAll();
		
		for(int i=0;i<all.size();i++) {
			if(all.get(i).getCust_email().equalsIgnoreCase(email)) {
				return all.get(i);
			}
		}
		return null;
	}

}
