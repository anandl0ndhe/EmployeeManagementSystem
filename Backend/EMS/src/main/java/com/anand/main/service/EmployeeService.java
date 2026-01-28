package com.anand.main.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.anand.main.entity.Employee;
import com.anand.main.repository.EmployeeRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmployeeService {
	@Autowired
	private EmployeeRepository repo;

	public Employee postEmployee(Employee emp) {
		return repo.save(emp);
		
	}
	public List<Employee> getAllEmployee(){
		return repo.findAll();
	}
	public void deleteEmployee(Long id) {
		if(!repo.existsById(id)) {
			throw new EntityNotFoundException("Employee With ID "+id+" Not Found");
		}
		repo.deleteById(id);
	}
	public Employee getEmployeeById(Long id) {
		return repo.findById(id).orElse(null);
	}
	public Employee updateEmployee(Long id,Employee employee) {
		Optional<Employee> optionalEmployee = repo.findById(id);
		if(optionalEmployee.isPresent()) {
			Employee existingEmployee = optionalEmployee.get();
			
			existingEmployee.setName(employee.getName());
			existingEmployee.setEmail(employee.getEmail());
			existingEmployee.setPhone(employee.getPhone());
			existingEmployee.setDepartment(employee.getDepartment());
			
			return repo.save(existingEmployee);
		}return null;
	}
	
}
