package com.example.calorieappbackend.entity;

import lombok.Data;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@DynamicInsert
@DynamicUpdate
@Table(name = "entry")
@Data
public class Entry implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "user_id", nullable = false)
    private Integer userId;

    @Column(name = "user_name", nullable = false, columnDefinition = "varchar(100)")
    private String userName;

    @Column(name = "food_name", nullable = false, columnDefinition = "varchar(100)")
    private String foodName;

    @Column(name = "entry_date", nullable = false, columnDefinition = "varchar(100)")
    private String entryDate;

    @Column(name = "entry_time", nullable = false, columnDefinition = "varchar(100)")
    private String entryTime;

    @Column(name = "calorie_value", columnDefinition = "float default 0 NOT NULL")
    private Float calorieValue;
}
