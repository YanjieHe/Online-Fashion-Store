package com.company.store.controllers;

import com.company.store.models.ShoppingCart;
import com.company.store.services.ShoppingCartService;
import com.company.store.services.UserManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
public class ShoppingCartController {
    @Autowired
    ShoppingCartService shoppingCartService;
    @Autowired
    UserManagementService userManagementService;

    public static class CustomerSession {
        private long sessionId;

        public long getSessionId() {
            return sessionId;
        }

        public void setSessionId(long sessionId) {
            this.sessionId = sessionId;
        }
    }

    @RequestMapping(value = "/shopping_cart", method = RequestMethod.POST)
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Object> getAllShoppingItems(@RequestBody CustomerSession customerSession) {
        try {
            int customerId = userManagementService.getCustomerId(customerSession.sessionId);
            ArrayList<ShoppingCart> shoppingCarts = shoppingCartService.getAllShoppingCartItems(customerId);
            return new ResponseEntity<>(shoppingCarts, HttpStatus.OK);
        } catch (Exception ex) {
            ex.printStackTrace();
            return new ResponseEntity<>("fail", HttpStatus.BAD_REQUEST);
        }
    }
}
