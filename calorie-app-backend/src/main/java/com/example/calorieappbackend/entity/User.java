package com.example.calorieappbackend.entity;

import lombok.Data;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@DynamicInsert
@DynamicUpdate
@Table(name = "user")
@Data
public class User implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "name", nullable = false, columnDefinition = "varchar(100) UNIQUE")
    private String name;

    @Column(name = "password", nullable = false, columnDefinition = "varchar(100)")
    private String password;

    @Column(name = "daily_calorie_limit", columnDefinition = "float default 2100 NOT NULL")
    private Float dailyCalorieLimit;
}
