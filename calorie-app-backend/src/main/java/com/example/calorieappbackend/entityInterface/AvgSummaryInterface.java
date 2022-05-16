package com.example.calorieappbackend.entityInterface;

import org.springframework.beans.factory.annotation.Value;

public interface AvgSummaryInterface {

    @Value(value = "#{target.avg_calorie}")
    Float getAvgCalorie();

}
