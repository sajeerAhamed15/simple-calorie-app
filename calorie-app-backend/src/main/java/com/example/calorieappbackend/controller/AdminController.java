package com.example.calorieappbackend.controller;

import com.example.calorieappbackend.entity.Admin;
import com.example.calorieappbackend.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminService service;

    @GetMapping("/get-all")
    public ResponseEntity<List<Admin>> getAll() {
        return service.getAll();
    }

    @GetMapping("/get-by-id/{id}")
    public ResponseEntity<Admin> getById(@PathVariable int id) {
        return service.getById(id);
    }

    @PostMapping("/create")
    public ResponseEntity<Admin> create(@RequestBody Admin item) {
        return service.create(item);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Admin> update(@PathVariable Integer id, @RequestBody Admin item) {
        return service.update(id, item);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<HttpStatus> deleteById(@PathVariable int id) {
        return service.deleteById(id);
    }

    @PostMapping("/logged-in-user")
    public ResponseEntity<Admin> login(@RequestBody Admin item) {
        return service.login(item);
    }
}

