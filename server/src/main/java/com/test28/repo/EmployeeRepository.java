package com.test28.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    List<Employee> findByLastName(String lastName);

    // JpaRepository already provides findAll() and findById(Long id)
    // Keep any custom queries here if needed

}
