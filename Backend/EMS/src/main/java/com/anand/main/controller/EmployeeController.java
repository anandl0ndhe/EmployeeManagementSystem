package com.anand.main.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.anand.main.entity.Employee;
import com.anand.main.service.EmployeeService;

import jakarta.persistence.EntityNotFoundException;


@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class EmployeeController {
	@Autowired
	private EmployeeService service;
	
	@PostMapping("/employee")
	public Employee postEmployee(@RequestBody Employee emp) {
		return service.postEmployee(emp);
	}
	@GetMapping("/employees")
	public List<Employee> getAllEmployee(){
		return service.getAllEmployee();
	}
	
	@DeleteMapping("/employee/{id}")
	public ResponseEntity<?> deleteEmployee(@PathVariable("id") Long id) {
		
		try {
			service.deleteEmployee(id);
			return new ResponseEntity<>("Employee With ID "+id+" Deleted Succesfully", HttpStatus.OK);
		}catch(EntityNotFoundException e) {
			return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);
		}
	}
	@GetMapping("/employee/{id}")
	public ResponseEntity<?> getEmployeeById(@PathVariable("id") Long id){
		Employee employee = service.getEmployeeById(id);
		if(employee == null) return  ResponseEntity.notFound().build();
		return ResponseEntity.ok(employee);
	}
	@PatchMapping("/employee/{id}")
	public ResponseEntity<?> updateEmployee(@PathVariable("id") Long id,@RequestBody Employee employee){
		Employee updatedEmployee = service.updateEmployee(id, employee);
		
		if(updatedEmployee == null) return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		return ResponseEntity.ok(updatedEmployee);
			
	}
}
