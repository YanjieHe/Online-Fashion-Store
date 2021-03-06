package com.company.store.controllers;

import com.company.store.models.Customer;
import com.company.store.services.CustomerService;
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

    @Autowired
    CustomerService customerService;

    @RequestMapping(value = "/test", method = RequestMethod.GET)
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
    public ResponseEntity<Object> login(@RequestBody UserLogin userLogin) {
        try {
            String key = userManagementService.login(userLogin.email, userLogin.password);
            return new ResponseEntity<>(key, HttpStatus.OK);
        } catch (LoginException ex) {
            ex.printStackTrace();
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "/customer/{sessionId}", method = RequestMethod.GET)
    public ResponseEntity<Object> customer(@PathVariable("sessionId") long sessionId) {
        try {
            int customerId = userManagementService.getCustomerId(sessionId);
            Customer customer = customerService.fetchCustomerById(customerId);
            customer.setPassword("");
            return new ResponseEntity<>(customer, HttpStatus.OK);
        } catch (UserManagementService.CustomerNotFoundException e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>("CustomerNotFoundException", HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("", HttpStatus.BAD_REQUEST);
        }
    }
}
