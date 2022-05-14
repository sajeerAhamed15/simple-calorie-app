package com.example.calorieappbackend.controller;

import com.example.calorieappbackend.entity.Food;
import com.example.calorieappbackend.service.FoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/food")
public class FoodController {

    @Autowired
    private FoodService service;

    @GetMapping("/get-all")
    public ResponseEntity<List<Food>> getAll() {
        return service.getAll();
    }

    @GetMapping("/get-by-id/{id}")
    public ResponseEntity<Food> getById(@PathVariable int id) {
        return service.getById(id);
    }

    @PostMapping("/create")
    public ResponseEntity<Food> create(@RequestBody Food item) {
        return service.create(item);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Food> update(@PathVariable Integer id, @RequestBody Food item) {
        return service.update(id, item);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<HttpStatus> deleteById(@PathVariable int id) {
        return service.deleteById(id);
    }

}

