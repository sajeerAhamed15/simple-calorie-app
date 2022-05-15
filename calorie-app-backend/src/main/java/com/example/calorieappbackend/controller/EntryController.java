package com.example.calorieappbackend.controller;

import com.example.calorieappbackend.entity.Entry;
import com.example.calorieappbackend.entityInterface.EntryAggInterface;
import com.example.calorieappbackend.service.EntryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/entry")
public class EntryController {

    @Autowired
    private EntryService service;

    @GetMapping("/get-all")
    public ResponseEntity<List<Entry>> getAll() {
        return service.getAll();
    }

    @GetMapping("/get-by-id/{id}")
    public ResponseEntity<Entry> getById(@PathVariable int id) {
        return service.getById(id);
    }

    @GetMapping("/get-by-user-id/{id}")
    public ResponseEntity<List<Entry>> getByUserId(@PathVariable int id, @RequestParam String from, @RequestParam String to) {
        return service.getByUserId(id, from, to);
    }

    @GetMapping("/get-agg-entries/{id}")
    public ResponseEntity<List<EntryAggInterface>> getAggByUserId(@PathVariable int id) {
        return service.getAggByUserId(id);
    }

    @PostMapping("/create")
    public ResponseEntity<Entry> create(@RequestBody Entry item) {
        return service.create(item);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Entry> update(@PathVariable Integer id, @RequestBody Entry item) {
        return service.update(id, item);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<HttpStatus> deleteById(@PathVariable int id) {
        return service.deleteById(id);
    }

}

