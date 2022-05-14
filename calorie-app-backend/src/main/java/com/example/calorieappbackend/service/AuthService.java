package com.example.calorieappbackend.service;

import com.example.calorieappbackend.repository.AdminRepository;
import com.example.calorieappbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;
import java.util.logging.Level;
import java.util.logging.Logger;

@Service
public class AuthService implements UserDetailsService {

    Logger logger = Logger.getLogger(UserDetailsService.class.getName());

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AdminRepository adminRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<com.example.calorieappbackend.entity.User> existingUser = userRepository.findByName(username);
        if (existingUser.isPresent()) {
            return new User(existingUser.get().getName(), existingUser.get().getPassword(), new ArrayList<>());
        } else {
            Optional<com.example.calorieappbackend.entity.Admin> existingAdmin = adminRepository.findByName(username);
            if (existingAdmin.isPresent()) {
                return new User(existingAdmin.get().getName(), existingAdmin.get().getPassword(), new ArrayList<>());
            } else {
                logger.log(Level.INFO, "No user with this username has been found");
                throw new UsernameNotFoundException("No user with this username has been found");
            }
        }
    }

}