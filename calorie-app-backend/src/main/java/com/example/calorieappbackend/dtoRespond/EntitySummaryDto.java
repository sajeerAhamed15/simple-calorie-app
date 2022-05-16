package com.example.calorieappbackend.dtoRespond;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EntitySummaryDto {
    private Integer numEntriesRecent;
    private Integer numEntriesPast;
    private Float avgCalories;
}
