package com.example.calorieappbackend.entityInterface;

import org.springframework.beans.factory.annotation.Value;

public interface EntryAggInterface {

    @Value(value = "#{target.summary_date}")
    String getSummaryDate();

    @Value(value = "#{target.total_calorie}")
    Float getTotalCalorie();

    @Value(value = "#{target.user_id}")
    Integer getUserId();

}
