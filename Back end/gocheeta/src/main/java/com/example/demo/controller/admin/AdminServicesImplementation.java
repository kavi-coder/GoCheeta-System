package com.example.demo.controller.admin;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.controller.branchAdmin.BranchAdmin;

@Service
public class AdminServicesImplementation implements AdminServices{
	@Autowired
	private Admin_Repository repo;

	@Override
	public Admin adminlogin(String email, String password) {
		List<Admin> all=repo.findAll();
		
		for(Admin a:all) {
			if(a.getAdmin_email().equalsIgnoreCase(email) && a.getAdmin_password().equals(password)) {
				return a;
			}
		}
		return null;
	}

	@Override
	public Admin getadmin(int id) {
		List<Admin> all=repo.findAll();
		
		for(Admin a:all) {
			if(a.getAdmin_id()==id) {
				return a;
			}
		}
		return null;
	}

	@Override
	public String updateadmin(Admin admin) {
		List<Admin> all=repo.findAll();
		
		for(int i=0;i<all.size();i++) {
			if(admin.getAdmin_id()==all.get(i).getAdmin_id()) {
				repo.save(admin);
				return "Admin Updated";
			}
		}
		return "Admin Not Found";
	}

}
