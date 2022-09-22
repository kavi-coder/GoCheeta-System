package com.example.demo.controller.driver;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="driver")
public class Driver {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="id")
	private int id;
	
	@Column(name="driver_fname")
	private String driver_fname;
	
	@Column(name="driver_lname")
	private String driver_lname;
	
	@Column(name="driver_email")
	private String driver_email;
	
	@Column(name="driver_password")
	private String driver_password;
	
	@Column(name="driver_branch")
	private String driver_branch;
	
	@Column(name="driver_avalibility")
	private int driver_avalibility;

	
	//getters setters
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getDriver_fname() {
		return driver_fname;
	}

	public void setDriver_fname(String driver_fname) {
		this.driver_fname = driver_fname;
	}

	public String getDriver_lname() {
		return driver_lname;
	}

	public void setDriver_lname(String driver_lname) {
		this.driver_lname = driver_lname;
	}

	public String getDriver_email() {
		return driver_email;
	}

	public void setDriver_email(String driver_email) {
		this.driver_email = driver_email;
	}

	public String getDriver_password() {
		return driver_password;
	}

	public void setDriver_password(String driver_password) {
		this.driver_password = driver_password;
	}

	public String getDriver_branch() {
		return driver_branch;
	}

	public void setDriver_branch(String driver_branch) {
		this.driver_branch = driver_branch;
	}

	public int getDriver_avalibility() {
		return driver_avalibility;
	}

	public void setDriver_avalibility(int driver_avalibility) {
		this.driver_avalibility = driver_avalibility;
	}
	
	
}
