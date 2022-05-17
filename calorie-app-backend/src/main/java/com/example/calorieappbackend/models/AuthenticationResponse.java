package com.example.calorieappbackend.models;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.io.Serializable;
import java.util.List;

@AllArgsConstructor
@Data
public class AuthenticationResponse implements Serializable {

    private final String jwt;

}
