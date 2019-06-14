package com.company.store.services;

import com.company.store.dao.CustomerDao;
import com.company.store.models.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.util.Random;
import java.util.concurrent.TimeUnit;

@Service
public class UserManagementService {
    @Autowired
    private StringRedisTemplate stringRedisTemplate;

    @Autowired
    CustomerDao customerDao;

    public String login(String email, String password) throws LoginException {
        Customer customer = customerDao.login(email, password);
        if (customer == null) {
            throw new LoginException("wrong email or password");
        }
        boolean success = false;
        String key = "";
        while (!success) {
            Random random = new Random(); // not safe
            key = Long.toString(Math.abs(random.nextLong()));
            String id = Integer.toString(customer.getCustomerId());
            success = stringRedisTemplate.opsForValue().setIfAbsent(key, id);
            if (success) {
                stringRedisTemplate.opsForValue().set(key, id, 60 * 10, TimeUnit.SECONDS); // TO DO: inactive duration
            }
            // TO DO: user table
        }
        return key;
    }

    public static class CustomerNotFoundException extends Exception {
        public CustomerNotFoundException(String message) {
            super(message);
        }
    }

    public int getCustomerId(long sessionId) throws CustomerNotFoundException {
        String key = Long.toString(sessionId);
        String customerId = stringRedisTemplate.opsForValue().get(Long.toString(sessionId));
        if (customerId == null) {
            throw new CustomerNotFoundException("cannot find customer id");
        }
        return Integer.parseInt(customerId);
    }

}
