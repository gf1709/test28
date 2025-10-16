package com.test28.controller;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.test28.repo.Employee;
import com.test28.repo.EmployeeRepository;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*") // Commenting out as it already allows all origins
public class WebController {

    private final EmployeeRepository employeeRepository;

    public WebController(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @GetMapping("/hello")
    public Map<String, String> hello() {
        return Map.of("message", "Hello from test28 controller");
    }

    @GetMapping("/employees")
    public List<Employee> getEmployees() {
        return employeeRepository.findAll();
    }

}
