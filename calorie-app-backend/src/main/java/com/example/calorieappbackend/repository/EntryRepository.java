package com.example.calorieappbackend.repository;

import com.example.calorieappbackend.entity.Entry;
import com.example.calorieappbackend.entityInterface.EntryAggInterface;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface EntryRepository extends JpaRepository<Entry, Integer>, JpaSpecificationExecutor<Entry> {

    @Query(value = "SELECT " +
            "e.* " +
            "FROM " +
            "entry e " +
            "WHERE " +
            "e.entry_date >= :from AND " +
            "e.entry_date <= :to AND " +
            "e.user_id = :id " +
            "ORDER BY e.id DESC " +
            "LIMIT 500",
            nativeQuery = true)
    List<Entry> findByUserIdAndDates(@Param("id") Integer id, @Param("from") String from,@Param("to") String to);

    @Query(value = "SELECT " +
            "e.entry_date as summary_date, " +
            "ifnull(SUM(e.calorie_value), 0) as total_calorie," +
            "e.user_id as user_id " +
            "FROM " +
            "entry e " +
            "WHERE " +
            "e.user_id = :id " +
            "GROUP BY e.entry_date " +
            "ORDER BY e.id DESC " +
            "LIMIT 500",
            nativeQuery = true)
    List<EntryAggInterface> findByUserIdAgg(int id);
}