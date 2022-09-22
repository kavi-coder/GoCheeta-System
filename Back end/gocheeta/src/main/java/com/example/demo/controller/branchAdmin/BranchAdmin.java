package com.example.demo.controller.branchAdmin;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="branchadmin")
public class BranchAdmin {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="branch_id")
	private int branch_id;
	
	@Column(name="branch_admin_name")
	private String branch_admin_name;
	
	@Column(name="branch_name")
	private String branch_name;
	
	@Column(name="branch_email")
	private String branch_email;
	
	@Column(name="branch_password")
	private String branch_password;

	public int getBranch_id() {
		return branch_id;
	}

	public void setBranch_id(int branch_id) {
		this.branch_id = branch_id;
	}

	public String getBranch_admin_name() {
		return branch_admin_name;
	}

	public void setBranch_admin_name(String branch_admin_name) {
		this.branch_admin_name = branch_admin_name;
	}

	public String getBranch_name() {
		return branch_name;
	}

	public void setBranch_name(String branch_name) {
		this.branch_name = branch_name;
	}

	public String getBranch_email() {
		return branch_email;
	}

	public void setBranch_email(String branch_email) {
		this.branch_email = branch_email;
	}

	public String getBranch_password() {
		return branch_password;
	}

	public void setBranch_password(String branch_password) {
		this.branch_password = branch_password;
	}
	
	
	
}
