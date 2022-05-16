package com.example.calorieappbackend.entityInterface;

import org.springframework.beans.factory.annotation.Value;

public interface ReportSummaryInterface {

    @Value(value = "#{target.num_entries_recent}")
    String getNumEntriesRecent();

    @Value(value = "#{target.num_entries_past}")
    Float getNumEntriesPast();

    @Value(value = "#{target.avg_calories}")
    Integer getAvgCalories();

}
