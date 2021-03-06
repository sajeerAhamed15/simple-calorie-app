package com.example.calorieappbackend.service;

import com.example.calorieappbackend.entity.Food;
import com.example.calorieappbackend.repository.FoodRepository;
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
public class FoodService {

    Logger logger = Logger.getLogger(FoodService.class.getName());

    @Autowired
    private FoodRepository repository;

    public ResponseEntity<Food> create(Food item) {
        try {
            Food savedItem = repository.save(item);
            return new ResponseEntity<>(savedItem, HttpStatus.CREATED);
        } catch (Exception e) {
            logger.log(Level.SEVERE, "Food create: " + e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.EXPECTATION_FAILED);
        }
    }

    public ResponseEntity<List<Food>> getAll() {
        try {
            List<Food> items = new ArrayList<Food>();
            items.addAll(repository.findAll());
            return new ResponseEntity<>(items, HttpStatus.OK);
        } catch (Exception e) {
            logger.log(Level.SEVERE, "Food getAll: " + e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<Food> getById(int id) {
        Optional<Food> existingItemOptional = repository.findById(id);
        if (existingItemOptional.isPresent()) {
            return new ResponseEntity<>(existingItemOptional.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<HttpStatus> deleteById(int id) {
        try {
            repository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            logger.log(Level.SEVERE, "Food deleteById: " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<Food> update(int id, Food item) {
        try {
            Optional<Food> existingItemOptional = repository.findById(id);
            if (existingItemOptional.isPresent()) {
                Food existingItem = existingItemOptional.get();
                MapperUtils.merge(existingItem, item);
                return new ResponseEntity<>(repository.save(existingItem), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            logger.log(Level.SEVERE, "Food update: " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
        }
    }
}
