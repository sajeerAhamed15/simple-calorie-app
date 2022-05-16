package com.example.calorieappbackend.entityInterface;

import org.springframework.beans.factory.annotation.Value;

public interface EntrySummaryInterface {

    @Value(value = "#{target.total_count}")
    Integer getTotalCount();

}
