package com.example.calorieappbackend.service;

import com.example.calorieappbackend.dtoRespond.EntitySummaryDto;
import com.example.calorieappbackend.entity.Entry;
import com.example.calorieappbackend.entityInterface.AvgSummaryInterface;
import com.example.calorieappbackend.entityInterface.EntryAggInterface;
import com.example.calorieappbackend.entityInterface.EntrySummaryInterface;
import com.example.calorieappbackend.repository.EntryRepository;
import com.example.calorieappbackend.utils.MapperUtils;
import com.example.calorieappbackend.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.logging.Level;
import java.util.logging.Logger;

@Service
public class EntryService {

    Logger logger = Logger.getLogger(EntryService.class.getName());

    @Autowired
    private EntryRepository repository;

    public ResponseEntity<Entry> create(Entry item) {
        try {
            Entry savedItem = repository.save(item);
            return new ResponseEntity<>(savedItem, HttpStatus.CREATED);
        } catch (Exception e) {
            logger.log(Level.SEVERE, "Entry create: " + e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.EXPECTATION_FAILED);
        }
    }

    public ResponseEntity<List<Entry>> getAll() {
        try {
            List<Entry> items = new ArrayList<Entry>();
            items.addAll(repository.findAll());
            return new ResponseEntity<>(items, HttpStatus.OK);
        } catch (Exception e) {
            logger.log(Level.SEVERE, "Entry getAll: " + e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<Entry> getById(int id) {
        Optional<Entry> existingItemOptional = repository.findById(id);
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
            logger.log(Level.SEVERE, "Entry deleteById: " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<Entry> update(int id, Entry item) {
        try {
            Optional<Entry> existingItemOptional = repository.findById(id);
            if (existingItemOptional.isPresent()) {
                Entry existingItem = existingItemOptional.get();
                MapperUtils.merge(existingItem, item);
                return new ResponseEntity<>(repository.save(existingItem), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            logger.log(Level.SEVERE, "Entry update: " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
        }
    }

    public ResponseEntity<List<Entry>> getByUserId(int id, String from, String to) {
        if (from == null || to == null) {
            return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
        }

        List<Entry> existingItems = repository.findByUserIdAndDates(id, from, to);
        if (!existingItems.isEmpty()) {
            return new ResponseEntity<>(existingItems, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(Collections.emptyList(), HttpStatus.OK);
        }
    }

    public ResponseEntity<List<EntryAggInterface>> getAggByUserId(int id) {
        List<EntryAggInterface> existingItems = repository.findByUserIdAgg(id);
        if (!existingItems.isEmpty()) {
            return new ResponseEntity<>(existingItems, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(Collections.emptyList(), HttpStatus.OK);
        }
    }

    public ResponseEntity<EntitySummaryDto> getReportSummary() {
        EntitySummaryDto summaryDto = new EntitySummaryDto();

        String today = Utils.getCurrentDate();
        String lastWeek = Utils.getPreviousDate(-7);
        String beforeWeek = Utils.getPreviousDate(-14);

        List<EntrySummaryInterface> existingItems = repository.findCountEntries(today, lastWeek);
        if (!existingItems.isEmpty()) {
            summaryDto.setNumEntriesRecent(existingItems.get(0).getTotalCount());
        } else {
            summaryDto.setNumEntriesRecent(0);
        }

        List<EntrySummaryInterface> existingItems2 = repository.findCountEntries(lastWeek, beforeWeek);
        if (!existingItems2.isEmpty()) {
            summaryDto.setNumEntriesPast(existingItems2.get(0).getTotalCount());
        } else {
            summaryDto.setNumEntriesPast(0);
        }

        List<AvgSummaryInterface> existingItems3 = repository.findAverageCalorie(today, lastWeek);
        if (!existingItems3.isEmpty()) {
            summaryDto.setAvgCalories(existingItems3.get(0).getAvgCalorie());
        } else {
            summaryDto.setAvgCalories(0f);
        }

        return new ResponseEntity<>(summaryDto, HttpStatus.OK);
    }
}
