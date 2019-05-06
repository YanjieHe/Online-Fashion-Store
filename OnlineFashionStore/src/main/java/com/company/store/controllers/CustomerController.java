package com.company.store.controllers;

import com.company.store.services.LoginException;
import com.company.store.services.UserManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class CustomerController {
    @Autowired
    UserManagementService userManagementService;

    @RequestMapping(value = "/test", method = RequestMethod.GET)
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Object> getAllCustomers() {
        return new ResponseEntity<>("This is a test.", HttpStatus.OK);
    }


    private static class UserLogin {
        private String email;
        private String password;

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Object> login(@RequestBody UserLogin userLogin) {
        try {
            String key = userManagementService.login(userLogin.email, userLogin.password);
            return new ResponseEntity<>(key, HttpStatus.OK);
        } catch (LoginException ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

}
