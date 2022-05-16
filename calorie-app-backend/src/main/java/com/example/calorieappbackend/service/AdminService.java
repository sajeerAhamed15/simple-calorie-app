package com.example.calorieappbackend.service;

import com.example.calorieappbackend.entity.Admin;
import com.example.calorieappbackend.repository.AdminRepository;
import com.example.calorieappbackend.utils.MapperUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.logging.Level;
import java.util.logging.Logger;

@Service
public class AdminService {

    Logger logger = Logger.getLogger(AdminService.class.getName());

    @Autowired
    private AdminRepository repository;

    public ResponseEntity<Admin> create(Admin item) {
        try {
            Admin savedItem = repository.save(item);
            return new ResponseEntity<>(removePassword(savedItem), HttpStatus.CREATED);
        } catch (Exception e) {
            logger.log(Level.SEVERE, "Admin create: " + e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.EXPECTATION_FAILED);
        }
    }

    public ResponseEntity<List<Admin>> getAll() {
        try {
            List<Admin> items = new ArrayList<Admin>();
            items.addAll(repository.findAll());
            return new ResponseEntity<>(removePassword(items), HttpStatus.OK);
        } catch (Exception e) {
            logger.log(Level.SEVERE, "Admin getAll: " + e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<Admin> getById(int id) {
        Optional<Admin> existingItemOptional = repository.findById(id);
        if (existingItemOptional.isPresent()) {
            return new ResponseEntity<>(removePassword(existingItemOptional.get()), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<HttpStatus> deleteById(int id) {
        try {
            repository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            logger.log(Level.SEVERE, "Admin deleteById: " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<Admin> update(int id, Admin item) {
        try {
            Optional<Admin> existingItemOptional = repository.findById(id);
            if (existingItemOptional.isPresent()) {
                Admin existingItem = existingItemOptional.get();
                MapperUtils.merge(existingItem, item);
                return new ResponseEntity<>(repository.save(existingItem), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            logger.log(Level.SEVERE, "Admin update: " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
        }
    }

    private Admin removePassword(Admin obj) {
        obj.setPassword("");
        return obj;
    }

    private List<Admin> removePassword(List<Admin> list) {
        for (Admin obj : list) {
            obj.setPassword("");
        }
        return list;
    }

    public ResponseEntity<Admin> login(Admin item) {
        Optional<Admin> existingItemOptional = repository.findByName(item.getName());
        if (existingItemOptional.isPresent()) {
            return new ResponseEntity<>(existingItemOptional.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
