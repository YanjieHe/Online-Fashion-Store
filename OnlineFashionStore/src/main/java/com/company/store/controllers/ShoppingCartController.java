package com.company.store.controllers;

import com.company.store.services.ShoppingCartService;
import com.company.store.services.UserManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;

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
    public ResponseEntity<Object> getAllShoppingItems(@RequestBody CustomerSession customerSession) {
        try {
            int customerId = userManagementService.getCustomerId(customerSession.sessionId);
            ArrayList<ShoppingCartService.ShoppingCartItemInfo> shoppingCarts = shoppingCartService.getAllShoppingCartItems(customerId);
            return new ResponseEntity<>(shoppingCarts, HttpStatus.OK);
        } catch (Exception ex) {
            ex.printStackTrace();
            return new ResponseEntity<>("fail", HttpStatus.BAD_REQUEST);
        }
    }

    public static class AddItem {
        private Long sessionId;
        private Integer inventoryId;
        private Integer quantity;

        public Long getSessionId() {
            return sessionId;
        }

        public void setSessionId(Long sessionId) {
            this.sessionId = sessionId;
        }

        public Integer getInventoryId() {
            return inventoryId;
        }

        public void setInventoryId(Integer inventoryId) {
            this.inventoryId = inventoryId;
        }

        public Integer getQuantity() {
            return quantity;
        }

        public void setQuantity(Integer quantity) {
            this.quantity = quantity;
        }
    }

    @RequestMapping(value = "/add_to_shopping_cart", method = RequestMethod.PUT)
    public ResponseEntity<Object> addToShoppingCart(@RequestBody AddItem addItem) {
        try {
            Integer customerId = userManagementService.getCustomerId(addItem.getSessionId());
            Integer inventoryId = addItem.getInventoryId();
            Integer quantity = addItem.getQuantity();
            Date date = new Date();
            shoppingCartService.createShoppingCartItem(customerId, inventoryId, date, quantity);
            return new ResponseEntity<>("Success", HttpStatus.OK);
        } catch (UserManagementService.CustomerNotFoundException ex) {
            System.out.println(ex.getMessage());
            return new ResponseEntity<>("CustomerNotFoundException", HttpStatus.BAD_REQUEST);
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
            return new ResponseEntity<>("Fail", HttpStatus.BAD_REQUEST);
        }
    }

}
